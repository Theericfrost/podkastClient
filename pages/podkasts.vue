<template>
  <div class="podkasts">
    <div class="podkasts__header">
      <v-container>
        <h1>Подкасты</h1>
        <my-typer
          :text="'Cамые интересные события в мире и в it'"
          :eternal="true"
          :speed="150"
          :colorObj="[
            { 'Cамые интересные события': 'crimson' },
            { it: '#28BCE5' },
          ]"
          :className="'main__typer'"
          :lines="2"
        />
      </v-container>
    </div>
    <v-container class="podkasts__container">
      <div class="podkasts__block">
        <my-podkast
          v-for="podkast in podkasts"
          :key="podkast['_id']"
          :podkast="podkast"
        />
      </div>
      <div class="advertising">
        <NuxtLink to="/about-us">
          <v-card elevation="2" outlined class="advertising__block">
            <div class="title">Узнать больше об авторе</div>
          </v-card>
        </NuxtLink>
      </div>
    </v-container>
    <div class="pagination">
      <v-container>
        <v-pagination
          v-model="page"
          :length="paginationAmout"
          v-if="total > limit"
        ></v-pagination>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
import PodkastCard from "~/components/PodkastCard/PodkastCard";
import Typer from "~components/Typer/Typer";

export default {
  components: {
    "my-podkast": PodkastCard,
    "my-typer": Typer,
  },
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