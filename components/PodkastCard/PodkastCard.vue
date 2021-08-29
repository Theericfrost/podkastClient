<template>
  <div class="PodkastCard">
    <v-card class="inner">
      <div class="img__block">
        <img :src="podkast.pathImg" :alt="podkast.title" />
        <div class="play__block">
          <div class="buttons__block">
            <i
              class="fal fa-pause-circle play__block"
              @click="pauseListener"
              v-if="pauseIcon"
            />
            <i
              v-else
              class="fal fa-play-circle play__block"
              @click="
                setAudio({
                  title: podkast.title,
                  path: podkast.pathAudio,
                  play: true,
                })
              "
            ></i>
          </div>
        </div>
      </div>
      <div class="text__block">
        <div class="name">{{ podkast.title }}</div>
        <div class="text">{{ podkast.text }}</div>
      </div>
      <div class="link">
        <NuxtLink :to="`/podkast/${podkast['_id']}`">
          Слушать <i class="fal fa-chevron-right" />
        </NuxtLink>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data: () => ({}),
  props: {
    podkast: Object,
  },
  methods: {
    ...mapMutations({
      setAudio: "store/setAudioPath",
      setAudioPlay: "store/setAudioPlay",
    }),
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
        this.getAudio.play === true &&
        this.getAudio.title === this.podkast.title
      );
    },
  },
};
</script>

<style lang="scss">
@import "./PodkastCard.scss";
</style>