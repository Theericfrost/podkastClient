<template>
  <div :class="['header flex items-center', type]" ref="header">
    <div class="menues ml-4 flex items-center">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on">О подкасте</div>
        </template>
        <v-list class="about__podkast">
          <v-list-item>
            <NuxtLink to="/faq">
              <v-list-item-title>FAQ</v-list-item-title>
            </NuxtLink>
          </v-list-item>
          <v-list-item>
            <NuxtLink to="/about-us">
              <v-list-item-title>Об авторах</v-list-item-title>
            </NuxtLink>
          </v-list-item>
          <v-list-item>
            <NuxtLink to="/calendar">
              <v-list-item-title>Выход подкастов</v-list-item-title>
            </NuxtLink>
          </v-list-item>
        </v-list>
      </v-menu>
      <div>
        <NuxtLink to="/articles">Статьи</NuxtLink>
      </div>
      <div>
        <NuxtLink to="/podkasts"> Подкасты </NuxtLink>
      </div>
    </div>
    <div class="logo">
      <NuxtLink to="/">
        <img src="~assets/img/Header/header_logo.png" alt="Frost Cast" />
      </NuxtLink>
    </div>
    <div class="right__part">
      <div class="social-media items-center">
        <i class="fab fa-vk" />
        <i class="fab fa-instagram" />
        <i class="fab fa-youtube" />
      </div>
      <div class="menu" @click="setShowMenuRight(!showMenuRight())">
        <i :class="['fas', showMenuRight() ? 'fa-times' : 'fa-bars']" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import { mapMutations, mapGetters } from "vuex";

export default defineComponent({
  props: {
    type: String
  },
  data() {
    return {
      ...mapGetters({
        showMenuRight: "store/getShowMenuRight"
      }),
      search: ""
    };
  },
  methods: {
    ...mapMutations({
      setShowMenuRight: "store/setShowMenuRight"
    }),
    addListener() {
      window.addEventListener("scroll", () => {
        if (this.$refs.header) {
          const { scrollY } = window;
          let showShadow = 0;
          const classStr = this.$refs.header.className;
          if (scrollY > showShadow && !classStr.includes("header_motion")) {
            this.$refs.header.className = `${classStr} header_motion`;
          }
          if (scrollY <= showShadow && classStr.includes("header_motion")) {
            this.$refs.header.className = `${classStr.replace(
              "header_motion",
              ""
            )}`;
          }
        }
      });
    }
  },
  mounted() {
    this.addListener();
  }
});
</script>

<style lang="scss">
@import "./Header.scss";
</style>
