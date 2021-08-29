<template>
  <div
    class="audio-player"
    ref="audioPlayer"
    v-show="link.path"
    :style="showCookie ? { bottom: '60px' } : {}"
  >
    <div class="timeline" ref="timeLine" @click="timeLineSkip">
      <div class="progress" ref="progress"></div>
    </div>
    <div class="controls">
      <div class="time">
        <div class="current" ref="current">0:00</div>
        <div class="divider">/</div>
        <div class="length"></div>
      </div>
      <div class="prev">
        <i
          class="fal fa-chevron-double-left"
          v-if="getQueue.length >= 2"
          @click="prevHandler"
        />
      </div>
      <div class="play-container">
        <i :class="['fal', playClass]" ref="playBtn" @click="playHandler" />
      </div>
      <div class="next">
        <i
          class="fal fa-chevron-double-right"
          v-if="getQueue.length >= 2"
          @click="nextHandler"
        />
      </div>
      <div class="name">{{ link.title }}</div>
      <div class="queue">
        <i class="far fa-ellipsis-h" @click="setShowHistory(true)" />
      </div>
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
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      audio: null,
      playClass: "fa-play",
    };
  },
  computed: {
    ...mapGetters({
      link: "store/getAudioPath",
      showCookie: "store/getShowCookie",
      getAudioPlay: "store/getAudioPlay",
      getQueue: "queue/getQueue",
    }),
  },
  methods: {
    ...mapMutations({
      setAudioPlay: "store/setAudioPlay",
      setShowHistory: "store/setShowHistory",
      setAudio: "store/setAudioPath",
    }),
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
        this.setAudioPlay(true);
        if (playBtn.classList.contains("fa-redo-alt")) {
          this.playClass = "fa-pause";
        } else {
          this.playClass = "fa-pause";
        }
        this.audio.play();
      } else {
        this.setAudioPlay(false);
        this.playClass = "fa-play";
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
    prevHandler() {
      const index = this.getQueue
        .map((el) => el.title)
        .indexOf(this.link.title);
      if (index === -1) {
        this.setAudio({
          title: this.getQueue[0].title,
          path: this.getQueue[0].pathAudio,
          play: true,
        });
      } else if (index === 0) {
        this.setAudio({
          title: this.getQueue[this.getQueue.length - 1].title,
          path: this.getQueue[this.getQueue.length - 1].pathAudio,
          play: true,
        });
      } else {
        this.setAudio({
          title: this.getQueue[index - 1].title,
          path: this.getQueue[index - 1].pathAudio,
          play: true,
        });
      }
    },
    nextHandler() {
      const index = this.getQueue
        .map((el) => el.title)
        .indexOf(this.link.title);
       if (index === -1) {
        this.setAudio({
          title: this.getQueue[0].title,
          path: this.getQueue[0].pathAudio,
          play: true,
        });
      } else if (index === this.getQueue.length - 1) {
        this.setAudio({
          title: this.getQueue[0].title,
          path: this.getQueue[0].pathAudio,
          play: true,
        });
      } else {
        this.setAudio({
          title: this.getQueue[index + 1].title,
          path: this.getQueue[index + 1].pathAudio,
          play: true,
        });
      }
    },
  },
  mounted() {
    const progressBar = this.$refs.progress;
    const playeer = this.$refs.audioPlayer;
    const current = this.$refs.current;
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
      this.playClass = "fa-redo-alt";
    });
    setInterval(() => {
      progressBar.style.width =
        (this.audio.currentTime / this.audio.duration) * 100 + "%";
      current.textContent = this.getTimeCodeFromNum(this.audio.currentTime);
    }, 200);
  },
  watch: {
    link: {
      handler(newValue, prevalue) {
        if (prevalue.path !== newValue.path) {
          this.audio.src = newValue.path;
        }
        if (newValue.play) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      },
      deep: true,
    },
    getAudioPlay(value, oldValue) {
      const playBtn = this.$refs.playBtn;
      if (value === true) {
        if (playBtn.classList.contains("fa-redo-alt")) {
          this.playClass = "fa-pause";
        } else {
          this.playClass = "fa-pause";
        }
      } else {
        this.playClass = "fa-play";
      }
    },
  },
};
</script>

<style lang="scss">
@import "./AudioPlayer.scss";
</style>