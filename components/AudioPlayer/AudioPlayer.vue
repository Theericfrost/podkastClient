<template>
  <div class="audio-player" ref="audioPlayer" v-show="link.path" :style="showCookie ? {bottom: '60px'}: {}">
    <div class="timeline" ref="timeLine" @click="timeLineSkip">
      <div class="progress" ref="progress"></div>
    </div>
    <div class="controls">
      <div class="time">
        <div class="current" ref="current">0:00</div>
        <div class="divider">/</div>
        <div class="length"></div>
      </div>
      <div class="play-container">
        <i class="fal fa-play" ref="playBtn" @click="playHandler" />
      </div>
      <div class="name">{{ link.title }}</div>
      <div class="volume-container">
        <div class="volume-button" ref="volumeButton">
          <i class="far fa-volume" ref="volume" @click="muteHandler" />
        </div>
        <div
          class="volume-slider"
          ref="volumeSlider"
          @click="volumeSliderChange"
        >
          <div class="volume-percentage" ref="volumePercentage"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      audio: null,
    };
  },
  computed: {
    ...mapGetters({
      link: "store/getAudioPath",
      showCookie: "store/getShowCookie",
    }),
  },
  methods: {
    getTimeCodeFromNum(num) {
      let seconds = parseInt(num);
      let minutes = parseInt(seconds / 60);
      seconds -= minutes * 60;
      const hours = parseInt(minutes / 60);
      minutes -= hours * 60;

      if (hours === 0)
        return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
      return `${String(hours).padStart(2, 0)}:${minutes}:${String(
        seconds % 60
      ).padStart(2, 0)}`;
    },
    timeLineSkip(e) {
      const timeline = this.$refs.timeLine;
      const timelineWidth = window.getComputedStyle(timeline).width;
      const timeToSeek =
        (e.offsetX / parseInt(timelineWidth)) * this.audio.duration;
      this.audio.currentTime = timeToSeek;
    },
    volumeSliderChange(e) {
      const volumeSlider = this.$refs.volumeSlider;
      const volumePercentage = this.$refs.volumePercentage;
      const sliderWidth = window.getComputedStyle(volumeSlider).width;
      const newVolume = e.offsetX / parseInt(sliderWidth);
      this.audio.volume = newVolume;
      volumePercentage.style.width = newVolume * 100 + "%";
    },
    playHandler() {
      const playBtn = this.$refs.playBtn;
      if (this.audio.paused) {
        if (playBtn.classList.contains("fa-redo-alt")) {
          playBtn.classList.remove("fa-redo-alt");
          playBtn.classList.add("fa-pause");
        } else {
          playBtn.classList.remove("fa-play");
          playBtn.classList.add("fa-pause");
        }
        this.audio.play();
      } else {
        playBtn.classList.remove("fa-pause");
        playBtn.classList.add("fa-play");
        this.audio.pause();
      }
    },
    muteHandler() {
      const volume = this.$refs.volume;
      this.audio.muted = !this.audio.muted;
      if (this.audio.muted) {
        volume.classList.remove("fa-volume");
        volume.classList.add("fa-volume-slash");
      } else {
        volume.classList.add("fa-volume");
        volume.classList.remove("fa-volume-slash");
      }
    },
  },
  mounted() {
    const progressBar = this.$refs.progress;
    const playeer = this.$refs.audioPlayer;
    const current = this.$refs.current;
    const playBtn = this.$refs.playBtn;
    this.audio = new Audio(this.link.path);
    this.audio.preload = "auto";
    this.audio.addEventListener(
      "loadeddata",
      () => {
        playeer.querySelector(".time .length").textContent =
          this.getTimeCodeFromNum(this.audio.duration);
        this.audio.volume = 0.75;
      },
      false
    );
    this.audio.addEventListener("ended", () => {
      playBtn.classList.add("fa-redo-alt");
      playBtn.classList.remove("fa-pause");
    });
    setInterval(() => {
      progressBar.style.width =
        (this.audio.currentTime / this.audio.duration) * 100 + "%";
      current.textContent = this.getTimeCodeFromNum(this.audio.currentTime);
    }, 500);
  },
  watch: {
    link: {
      handler(newValue, prevalue) {
        if (prevalue.path !== newValue.path) {
          this.audio.src = newValue.path;
        }
        if (newValue.play) {
          const playBtn = this.$refs.playBtn;
          if (playBtn.classList.contains("fa-play")) {
            playBtn.classList.remove("fa-play");
          }
          if (playBtn.classList.contains("fa-redo-alt")) {
            playBtn.classList.remove("fa-redo-alt");
          }
          playBtn.classList.add("fa-pause");
          this.audio.play();
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
@import "./AudioPlayer.scss";
</style>