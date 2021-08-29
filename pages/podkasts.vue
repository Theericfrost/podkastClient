<template>
  <div class="podkasts">
    <div class="podkasts__header">
      <v-container>
        <h1>Подкасты</h1>
        <h2>Это подкаст <span>Frost Cast</span></h2>
        <!-- <Typer text="Я буду рассказывать вам самые интересные события в мире и в
        it" eternal={true} speed={150} colorObj={[ { "самые интересные события":
        "crimson" }, { it: "#28BCE5" }, ]} class="main__typer" lines={2} /> -->
      </v-container>
    </div>
    <div class="podkast__block">
      <v-container>
        <v-card
          elevation="2"
          v-for="podkast in podkasts"
          :key="podkast['_id']"
          class="card"
        >
          <div class="img__block">
            <img :src="podkast.pathImg" :alt="podkast.title" />
            <div class="play__block">
              <div class="buttons__block">
                <i class="far fa-play-circle" @click="setAudio({title: podkast.title, path: podkast.pathAudio, play: true})"></i>
              </div>
            </div>
          </div>
          <div class="text__block">
            <div class="title">{{ podkast.title }}</div>
            <div class="text">{{ podkast.text }}</div>
          </div>
          <div class="link">
            <NuxtLink :to="`/podkast/${podkast['_id']}`"> Подробнее </NuxtLink>
          </div>
        </v-card>
      </v-container>
    </div>
    <div class="pagination" >
      <v-container>
        <v-pagination v-model="page" :length="paginationAmout" v-if="total > limit"></v-pagination>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      podkasts: [],
      page: 1,
      limit: 6,
      total: 0,
    };
  },
  methods: {
    ...mapMutations({
      setAudio: "store/setAudioPath",
    }),
    getPodkasts() {
      axios
        .get(
          `${process.env.BACKEND}/podkasts/pagination?limit=${
            this.limit
          }&page=${this.page - 1}`
        )
        .then((response) => {
          if (response && response.data && response.data.data) {
            this.podkasts = response.data.data;
            this.total = response.data.total;
          }
        });
    },
  },
  created() {
    this.getPodkasts();
  },
  computed: {
    paginationAmout() {
      return Math.ceil(this.total / this.limit);
    },
  },
  watch: {
    page() {
      this.getPodkasts();
    },
  },
};
</script>

<style lang="scss">
@import "./podkasts/podkasts.scss";
</style>