<template>
  <div class="articles">
    <div class="articles__header">
      <v-container>
        <h1>Статьи</h1>
        <my-typer
          :text="'Мои мысли и взгляды на все о чем я узнаю'"
          :eternal="true"
          :speed="150"
          :colorObj="[{ все: 'crimson' }, { узнаю: '#28BCE5' }]"
          :className="'main__typer'"
          :lines="2"
        />
      </v-container>
    </div>
    <div class="articles__block pt-16 pb-16 bg-gray-200">
      <v-container>
        <div v-for="tag in titles" :key="tag" class="tab__block">
          <h2 class="article__title">{{ tag }}</h2>
          <div class="links__container">
            <NuxtLink
              :to="`/article/${article._id}`"
              class="link__block"
              v-for="article in getAllArticlesByTag(tag)"
              :key="article.title"
            >
              <h3>{{ article.title }}</h3>
              <div class="text" v-html="article.body" />
              <div class="time">
                <i class="far fa-clock" />
                {{ dateHandler(article.createdAt) }}
              </div>
            </NuxtLink>
          </div>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import Typer from "~components/Typer/Typer";
import { get } from "axios";
import moment from "moment";

export default {
  components: {
    "my-typer": Typer
  },
  data() {
    return {
      data: []
    };
  },
  created() {
    get(`${process.env.BACKEND}/articles`).then(response => {
      if (response && response.data && response.data.data) {
        this.data = response.data.data;
      }
    });
  },
  methods: {
    getAllArticlesByTag(tag) {
      if (this.data.length) {
        return this.data.filter(article => article.tag === tag);
      }
    },
    dateHandler(date) {
      return moment(date)
        .locale("ru")
        .format("DD MMMM YYYY");
    }
  },
  computed: {
    titles() {
      if (this.data.length) {
        return Array.from(new Set(this.data.map(article => article.tag)));
      }
    }
  }
};
</script>

<style lang="scss">
@import "./articles.scss";
</style>
