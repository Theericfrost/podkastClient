<template>
  <div class="PodkastCard" v-bind:class="{ slider: mode === 'slider' }">
    <v-card elevation="5" outlined class="inner">
      <img src="~assets/img/AboutUs/AboutUsBg.jpeg" alt="podkast logo" />
      <div class="text__block">
        <div class="title">{{ podkast.title }}</div>
        <div class="text">{{ podkast.text }}</div>
      </div>
      <div class="link">
        <v-btn elevation="2">Слушать</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  props: {
    podkast: Object,
    mode: String,
  },
};
</script>

<style lang="scss">
@import "./PodkastCard.scss";
</style>