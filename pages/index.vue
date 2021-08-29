<template>
  <div class="main">
    <div class="main__header">
      <v-container>
        <h1>Привет</h1>
        <h2>Это подкаст <span>Frost Cast</span></h2>
        <!-- <vue-typer class="typer" text='Я буду рассказывать вам самые интересные события в мире и в it' erase-style='clear'></vue-typer> -->
        <my-typer
          :text="'Я буду рассказывать вам самые интересные события в мире и в it'"
          :eternal="true"
          :speed="150"
          :colorObj="[ { 'самые интересные события': 'crimson' }, { it: '#28BCE5' }, ]"
          :className="'main__typer'"
          :lines="2"
        />
      </v-container>
    </div>
    <div class="podkasts">
      <v-container class="podkasts__slider">
        <div class="text">
          <div class="title">Подкасты</div>
          <div class="sub__block">
            <div class="sub__title">Самые новые выпуски</div>
            <div class="link__all">
              <NuxtLink to="/podkasts">
                Все подкасты <i class="fal fa-chevron-right" />
              </NuxtLink>
            </div>
          </div>
        </div>
        <v-carousel hide-delimiters class="carousel" v-model="slide">
          <v-carousel-item v-for="(slide, n) in slidesNow" :key="n">
            <v-sheet height="100%">
              <v-row class="fill-height" align="center" justify="center">
                <div class="inner__slider">
                  <my-podkast
                    v-for="podkast in slide"
                    :key="podkast.title"
                    :podkast="podkast"
                  />
                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-container>
    </div>
    <my-thank-you />
    <my-subscribe />
  </div>
</template>

<script>
import SubscibeBlock from "~components/Subscribe/Subscribe";
import ThankYou from "~components/ThankYou/ThankYou";
import PodkastCard from "~components/PodkastCard/PodkastCard";
import Typer from "~components/Typer/Typer";
import { get } from "axios";
export default {
  components: {
    "my-subscribe": SubscibeBlock,
    "my-thank-you": ThankYou,
    "my-podkast": PodkastCard,
    "my-typer": Typer,
  },
  data() {
    return {
      podkasts: [],
      slide: 0,
    };
  },
  methods: {
    getPodkasts() {
      get(`${process.env.BACKEND}/podkasts/pagination?limit=9&page=0`).then(
        (response) => {
          if (response && response.data && response.data.data) {
            this.podkasts = response.data.data;
          }
        }
      );
    },
  },
  created() {
    this.getPodkasts();
  },
  computed: {
    slidesNow() {
      let size = 3;
      let subarray = [];
      for (let i = 0; i < Math.ceil(this.podkasts.length / size); i++) {
        subarray[i] = this.podkasts.slice(i * size, i * size + size);
      }
      return subarray;
    },
  }
};
</script>

<style lang="scss">
@import "./index/index.scss";
</style>