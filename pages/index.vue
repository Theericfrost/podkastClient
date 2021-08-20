<template>
  <div class="main">
    <div class="main__header">
      <v-container>
        <h1>Привет</h1>
        <h2>Это подкаст <span>Frost Cast</span></h2>
        <!-- <Typer text="Я буду рассказывать вам самые интересные события в мире и в
        it" eternal={true} speed={150} colorObj={[ { "самые интересные события":
        "crimson" }, { it: "#28BCE5" }, ]} class="main__typer" lines={2} /> -->
      </v-container>
    </div>
    <div class="podkasts">
      <v-container class="podkasts__slider">
        <v-carousel hide-delimiters>
          <v-carousel-item
            v-for="podkastUnit in podkasts"
            :key="podkastUnit.title"
          >
            <v-sheet height="100%" tile>
              <v-row class="fill-height" align="center" justify="center">
                <my-podkast :podkast="podkastUnit" mode="slider" />
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-container>
      <v-container class="podkasts__container">
        <my-podkast
          v-for="podkastUnit in podkasts"
          :podkast="podkastUnit"
          :key="podkastUnit.title"
        />
      </v-container>
      <div class="link__all">
        <NuxtLink to="/podkasts">
          <v-btn elevation="2">Все подкасты</v-btn>
        </NuxtLink>
      </div>
    </div>
    <my-thank-you />
    <my-subscribe />
  </div>
</template>

<script>
import SubscibeBlock from "~components/Subscribe/Subscribe";
import ThankYou from "~components/ThankYou/ThankYou";
import PodkastCard from "~components/PodkastCard/PodkastCard";
export default {
  components: {
    "my-subscribe": SubscibeBlock,
    "my-thank-you": ThankYou,
    "my-podkast": PodkastCard,
  },
  data() {
    return {
      podkasts: [
        {
          title: "Выпуск 1",
          text: "Новая серия урааааа",
        },
        {
          title: "Выпуск 2",
          text: "Новая серия 2 урааааа",
        },
        {
          title: "Выпуск 3",
          text: "Новая серия 2 урааааа",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "./index/index.scss";
</style>