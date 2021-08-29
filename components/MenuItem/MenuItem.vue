<template>
  <div class="menu__item" @mouseenter="mouseOver" @mouseleave="mouseLeave">
    <div class="num__play" v-if="!active">
      {{ order }}
    </div>
    <div class="num__play" v-else-if="pauseIcon">
      <i class="fal fa-pause-circle" @click="pauseListener" />
    </div>
    <div class="num__play" v-else>
      <i class="fal fa-play-circle" @click="playListener" />
    </div>
    <div class="title__block">
      <div class="text">{{ podkast.title }}</div>
      <div class="time">{{ fromSecToMin(podkast.time) }}</div>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <i
            v-on="on"
            class="far fa-ellipsis-h menu__sub"
            @click="openSubmenu = !openSubmenu"
          />
        </template>
        <v-list class="menu__list">
          <v-list-item @click="addToQueueAudio">
            <v-list-item-title>Добавить в очередь</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { utc } from "moment";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default {
  props: {
    podkast: Object,
    order: Number,
  },
  data() {
    return {
      active: false,
      openSubmenu: false,
    };
  },
  methods: {
    ...mapMutations({
      setAudio: "store/setAudioPath",
      setAudioPlay: "store/setAudioPlay",
      addToQueue: "queue/addToQueue",
      setSnack: "store/setSnack",
    }),
    mouseOver() {
      this.active = !this.active;
    },
    mouseLeave() {
      this.active = !this.active;
    },
    fromSecToMin(val) {
      return utc(val * 1000).format("HH:mm:ss");
    },
    playListener() {
      this.setAudio({
        title: this.podkast.title,
        path: this.podkast.pathAudio,
        play: true,
      });
    },
    pauseListener() {
      this.setAudioPlay(false);
    },
    addToQueueAudio() {
      const alreadyInQueue = this.getQueue.find(
        (el) => el.title === this.podkast.title
      );
      const queueCookie = cookies.get('queue');
      if (alreadyInQueue) {
        this.setSnack({ text: "Аудио уже находится в очереди" });
      } else {
        this.addToQueue(this.podkast);
        if(queueCookie){
          cookies.set('queue', [...queueCookie, {...this.podkast}], {path: '/'})
        } else {
          cookies.set('queue', [{...this.podkast}], {path: '/'})
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      getAudio: "store/getAudioPath",
      getQueue: "queue/getQueue",
    }),
    pauseIcon() {
      return (
        this.getAudio.play === true &&
        this.getAudio.title === this.podkast.title
      );
    },
  },
};
</script>

<style lang="scss">
@import "./MenuItem.scss";
</style>
