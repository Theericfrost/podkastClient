<template>
  <transition name="slide-fade">
    <div class="menu__right" v-if="showMenuRight()">
      <v-card>
        <v-navigation-drawer permanent>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6"> Подкасты </v-list-item-title>
              <v-list-item-subtitle class="history__open" @click="setShowHistory(true)"
                >Открыть очередь прослушивания</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list dense nav>
            <my-menu-item
              v-for="(podkast, n) in podkasts"
              :key="podkast.title"
              :podkast="podkast"
              :order="n + 1"
            />
          </v-list>
        </v-navigation-drawer>
      </v-card>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { get } from "axios";
import MenuItem from "~components/MenuItem/MenuItem";

export default {
  components: {
    "my-menu-item": MenuItem,
  },
  data() {
    return {
      ...mapGetters({
        showMenuRight: "store/getShowMenuRight",
      }),
      podkasts: null,
    };
  },
  methods: {
    ...mapMutations({
      setShowHistory: "store/setShowHistory",
    }),
    getPodkasts() {
      get(`${process.env.BACKEND}/podkasts`).then((response) => {
        if (response && response.data && response.data.data) {
          this.podkasts = response.data.data;
        }
      });
    },
  },
  created() {
    this.getPodkasts();
  },
};
</script>

<style lang="scss">
@import "./Menu.scss";
</style>
