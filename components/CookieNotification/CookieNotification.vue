<template>
  <div class="cookie__notification" v-if="showCookie()">
    <div class="text">Мы используем Cookies</div>
    <v-btn elevation="2" @click="saveCookie">OK</v-btn>
  </div>
</template>

<script>
import Cookies from "universal-cookie";
import { mapGetters, mapMutations } from "vuex";
const cookies = new Cookies();
export default {
  data() {
    return {
      ...mapGetters({
        showCookie: "store/getShowCookie",
      }),
    };
  },
  methods: {
    ...mapMutations({
      setShowCookie: "store/setShowCookie",
    }),
    saveCookie() {
      cookies.set("ShowCookies", "false", { path: "/" });
      this.setShowCookie(false);
    },
  },
};
</script>

<style lang="scss">
@import "./CookieNotification.scss";
</style>