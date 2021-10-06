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
            <i :class="linkUnit.class" />
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
    <my-bug-tracker />
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import BugTracker from "~components/BugTracker/BugTracker";

export default defineComponent({
  components: {
    "my-bug-tracker": BugTracker
  },
  data() {
    return {
      links: [
        { class: "fab fa-vk", alt: "vk", link: "" },
        { class: "fab fa-instagram", alt: "instagram", link: "" },
        { class: "fab fa-youtube", alt: "youTube", link: "" },
      ],
      email: `mailto:${process.env.EMAIL}`,
    };
  },
});
</script>

<style lang="scss">
@import "./Footer.scss";
</style>
