<template>
  <v-bottom-sheet
    content-class="history__dialog"
    hide-overlay
    persistent
    v-model="showHistory"
    no-click-animation
  >
    <v-sheet class="history">
      <div class="close">
        <i class="far fa-times-circle" @click="setShowHistory(false)" />
      </div>
      <div class="inner">
        <div class="tabs__block">
          <v-tabs v-model="tab" class="tabs">
            <v-tab>Очередь прослушивания</v-tab>
            <v-tab>История</v-tab>
          </v-tabs>
          <v-btn elevation="2" small @click="removeAll"> Очистить </v-btn>
        </div>

        <div v-if="tab === 0" class="content__block">
          <keep-alive>
            <draggable v-model="queue" @start="drag = true" @end="drag = false">
              <my-history-item
                v-for="audio in getQueue"
                :key="audio.title"
                :audio="audio"
                   :deleteFunc="removeFromQueue"
              />
            </draggable>
          </keep-alive>
        </div>
        <div v-if="tab == 1" class="content__block">
          <draggable v-model="history" @start="drag = true" @end="drag = false">
            <my-history-item
              v-for="audio in getHistory"
              :key="audio.title"
              :audio="audio"
              :deleteFunc="removeFromHistory"
            />
          </draggable>
        </div>
      </div>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import HistoryItem from "~components/HistoryItem/HistoryItem";
import draggable from "vuedraggable";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default {
  components: {
    "my-history-item": HistoryItem,
    draggable,
  },
  data() {
    return {
      tab: 0,
      drag: false,
    };
  },
  methods: {
    ...mapMutations({
      setShowHistory: "store/setShowHistory",
      setQueue: "queue/setQueue",
      removeAllFromQueue: "queue/removeAllFromQueue",
      removeFromQueue: "queue/removeFromQueue",
      setHistory: "history/setHistory",
      removeAllFromHistory: "history/removeAllFromHistory",
      removeFromHistory: "history/removeFromHistory",
    }),
    removeAll() {
      if (this.tab === 0) {
        this.removeAllFromQueue();
        cookies.remove("queue", { path: "/" });
      }
      if (this.tab === 1) {
        this.removeAllFromHistory();
        cookies.remove("history", { path: "/" });
      }
    },
  },
  computed: {
    ...mapGetters({
      showHistory: "store/getShowHistory",
      getQueue: "queue/getQueue",
      getHistory: "history/getHistory",
    }),
    queue: {
      get() {
        return this.getQueue;
      },
      set(value) {
        this.setQueue(value);
        cookies.set("queue", value, { path: "/" });
      },
    },
    history: {
      get() {
        return this.getHistory;
      },
      set(value) {
        this.setHistory(value);
        cookies.set("history", value, { path: "/" });
      },
    },
  },
};
</script>

<style lang="scss">
@import "./History.scss";
</style>
