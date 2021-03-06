<template>
  <v-app>
    <my-header :type="headerType" />
    <Nuxt />
    <my-menu :podkasts="podkasts"/>
    <my-history />
    <my-snack-bar />
    <my-footer />
    <my-audio-player :podkasts="podkasts" />
    <my-cookie />
  </v-app>
</template>

<script>
import Header from "~components/Header/Header";
import SnackBar from "~components/SnackBar/SnackBar";
import Footer from "~components/Footer/Footer";
import AudioPlayer from "~components/AudioPlayer/AudioPlayer";
import CookieNotification from "~components/CookieNotification/CookieNotification";
import Menu from "~components/Menu/Menu";
import History from "~components/History/History";

import "~assets/css/font-awesome.css";
import Cookies from "universal-cookie";
import { mapMutations } from "vuex";
import { get } from "axios";

const cookies = new Cookies();

export default {
  components: {
    "my-header": Header,
    "my-snack-bar": SnackBar,
    "my-footer": Footer,
    "my-audio-player": AudioPlayer,
    "my-cookie": CookieNotification,
    "my-menu": Menu,
    "my-history": History,
  },
  head: {
    link: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
      },
    ],
  },
  data() {
    return {
      whiteThemeHeader: ["/articles"],
      podkasts: null,
    };
  },
  methods: {
    ...mapMutations({
      setShowCookie: "store/setShowCookie",
      setQueue: "queue/setQueue",
      setHistory: "history/setHistory",
    }),
    getPodkasts() {
      get(`${process.env.BACKEND}/podkasts`).then((response) => {
        if (response && response.data && response.data.data) {
          this.podkasts = response.data.data;
        }
      });
    },
  },
  computed: {
    headerType() {
      return this.whiteThemeHeader.includes(this.$route.path) ? "dark" : "";
    },
  },
  created() {
    this.getPodkasts();
  },
  mounted() {
    /* Font Awesome */
    const fontAwesome = document.createElement("link");
    fontAwesome.href = "/font.css";
    fontAwesome.rel = "preload";
    fontAwesome.as = "style";
    fontAwesome.onload = () => {
      fontAwesome.rel = "stylesheet";
    };
    document.head.appendChild(fontAwesome);
    const showCookies = cookies.get("ShowCookies");
    const queueCookie = cookies.get("queue");
    const historyCookie = cookies.get("history");
    if (showCookies) {
      this.setShowCookie(showCookies === "false" ? false : true);
    }
    if (queueCookie) {
      this.setQueue(queueCookie);
    }
    if (historyCookie) {
      this.setHistory(historyCookie);
    }
  },
};
</script>

<style lang="scss">
</style>
