<template>
  <v-snackbar v-model="show" :timeout="duration" :left="true">
    {{ snack.text }}
    <template v-slot:action="{ attrs }">
      <v-btn color="pink" text v-bind="attrs" @click="show = false">
        Закрыть
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data: () => ({
    position: "left",
    duration: 3000,
    isInfinity: false,
    show: false,
  }),
  computed: {
    ...mapGetters({
      snack: "store/getSnack",
    }),
  },
  methods: {
    ...mapMutations({
      setSnack: "store/setSnack",
    }),
    close() {
      this.setSnack({ text: "" });
    },
  },
  watch: {
    snack() {
      if (this.snack.text) {
        this.show = true;
      }
    },
    show(){
      if (this.show === false) {
        this.close()
      }
    }
  },
};
</script>

<style lang="scss">
@import "./SnackBar.scss";
</style>