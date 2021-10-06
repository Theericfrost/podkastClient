<template>
  <div class="article">
    <div class="article__header">
      <v-container>
        <h1>{{ article && article.title }}</h1>
      </v-container>
    </div>
    <div class="article__block pt-4 pb-16 bg-gray-200">
      <v-container>
        <div class="time">
          <i class="far fa-clock" />
          {{dateOfCreation }}
        </div>
        <div class="text" v-html="article && article.body"/>
      </v-container>
    </div>
  </div>
</template>

<script>
import { get } from "axios";
import Typer from "~components/Typer/Typer";
import moment from "moment";

export default {
  components: {
    "my-typer": Typer
  },
  data() {
    return {
      article: null
    };
  },
  created() {
    get(`${process.env.BACKEND}/articles/${this.$route.params.article}`).then(
      response => {
        if (response && response.data && response.data.data) {
          this.article = response.data.data;
        }
      }
    );
  },
  computed: {
    dateOfCreation() {
      if (this.article) {
        return moment(this.article.createdAt).locale('ru').format("DD MMMM YYYY");
      }
    }
  }
};
</script>

<style lang="scss">
@import "./article.scss";
</style>
