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
    <my-thank-you />
    <my-subscribe />
  </div>
</template>

<script>
import SubscibeBlock from "~components/Subscribe/Subscribe";
import ThankYou from "~components/ThankYou/ThankYou";
export default {
  components: {
    "my-subscribe": SubscibeBlock,
    "my-thank-you": ThankYou,
  },
};
</script>

<style lang="scss">
@import "./index/index.scss";
</style>