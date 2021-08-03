<template>
  <div class="footer">
    <v-container fluid>
      <div class="logo__block">
        <img src="~assets/img/Header/header_logo.png" alt="Frost Cast" />
        <div class="social__media">
          <a
            v-for="linkUnit in links"
            class="link"
            target="_blank"
            :href="linkUnit.link"
            :key="linkUnit.alt"
          >
            <img :src="linkUnit.img" :alt="linkUnit.alt" />
          </a>
        </div>
      </div>
      <div class="righs">
        © TheEricFrost. All rights reserved. 2021
        <div class="email">
          Для связи используйте <a :href="email">e-mail</a>. Также ознакомьтесь
          с разделом <a href="/about-us">"О авторах"</a>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import {
  social_instagram,
  social_vk,
  social_youTube,
  header_logo,
} from "~assets/img";
export default defineComponent({
  data() {
    return {
      links: [
        { img: social_vk, alt: "vk", link: "" },
        { img: social_instagram, alt: "instagram", link: "" },
        { img: social_youTube, alt: "youTube", link: "" },
      ],
      email: `mailto:${process.env.EMAIL}`,
    };
  },
});
</script>

<style lang="scss">
@import "./Footer.scss";
</style>
