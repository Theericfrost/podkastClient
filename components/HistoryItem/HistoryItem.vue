<template>
  <transition name="history__unit">
    <div class="audio__unit">
      <div
        class="img__block"
        @mouseenter="mouseEnterHandler"
        @mouseleave="mouseLeaveHandler"
      >
        <transition name="play">
          <i
            class="fas fa-pause-circle play__icon"
            @click="pauseListener"
            v-if="pauseIcon"
          />
          <i
            class="fas fa-play-circle play__icon"
            @click="playListener"
            v-if="active"
          />
        </transition>
        <img :src="audio.pathImg" :alt="audio.title" />
      </div>
      <div class="title__text">{{ audio.title }}</div>
      <div class="trash">
        <i class="far fa-trash" @click="removeFromQueue(audio)" />
      </div>
      <div class="time">{{ fromSecToMin(audio.time) }}</div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { utc } from "moment";
export default {
  props: {
    audio: Object,
  },
  data() {
    return {
      active: false,
    };
  },
  methods: {
    ...mapMutations({
      setAudio: "store/setAudioPath",
      setAudioPlay: "store/setAudioPlay",
      removeFromQueue: "queue/removeFromQueue",
    }),
    fromSecToMin(val) {
      return utc(val * 1000).format("HH:mm:ss");
    },
    mouseEnterHandler() {
      this.active = !this.active;
    },
    mouseLeaveHandler() {
      this.active = !this.active;
    },
    playListener() {
      this.setAudio({
        title: this.audio.title,
        path: this.audio.pathAudio,
        play: true,
      });
    },
    pauseListener() {
      this.setAudioPlay(false);
    },
  },
  computed: {
    ...mapGetters({
      getAudio: "store/getAudioPath",
    }),
    pauseIcon() {
      return (
        this.getAudio.play === true && this.getAudio.title === this.audio.title
      );
    },
  },
};
</script>

<style lang="scss">
@import "./HistoryItem.scss";
</style>
