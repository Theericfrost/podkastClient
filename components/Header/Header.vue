<template>
  <div class="header flex items-center" ref="header">
    <div class="logo">
      <a href="/">
        <img src="~assets/img/Header/header_logo.png" alt="Frost Cast" />
      </a>
    </div>
    <div class="menues ml-4 flex items-center">
      <md-menu md-size="medium" md-align-trigger>
        <md-button md-menu-trigger>О подкасте</md-button>
        <md-menu-content>
          <md-menu-item>Реклама в подкасте</md-menu-item>
          <md-menu-item>FAQ</md-menu-item>
          <md-menu-item>Об авторах</md-menu-item>
        </md-menu-content>
      </md-menu>
      <div>Статьи</div>
      <div>Подкасты</div>
    </div>
    <div class="social-media ml-auto mr-4 flex items-center">
      <i class="fab fa-vk" />
      <i class="fab fa-instagram" />
      <i class="fab fa-youtube" />
    </div>
    <div class="search__block">
      <md-field>
        <md-input v-model="search" placeholder="Поиск"></md-input>
      </md-field>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
export default defineComponent({
  data() {
    return {
      search: "",
    };
  },
  methods: {
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
            this.$refs.header.className = `${classStr.replace("header_motion", "")}`;
          }
        }
      });
    },
  },
  mounted() {
    this.addListener();
  },
});
</script>

<style lang="scss">
@import "./Header.scss";
</style>