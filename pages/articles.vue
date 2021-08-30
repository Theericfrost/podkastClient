<template>
  <div class="articles">
    <v-container>
      <h1>Статьи</h1>
      <v-tabs v-model="tab">
        <v-tab>Новости</v-tab>
        <v-tab>Статьи</v-tab>
      </v-tabs>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 0
    };
  },
};
</script>

<style lang="scss">
@import "./articles/articles.scss";
</style>