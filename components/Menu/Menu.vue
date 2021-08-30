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
import MenuItem from "~components/MenuItem/MenuItem";

export default {
  components: {
    "my-menu-item": MenuItem,
  },
  props: {
    podkasts: Array
  },
  data() {
    return {
      ...mapGetters({
        showMenuRight: "store/getShowMenuRight",
      })
    };
  },
  methods: {
    ...mapMutations({
      setShowHistory: "store/setShowHistory",
    }),
  },

};
</script>

<style lang="scss">
@import "./Menu.scss";
</style>
