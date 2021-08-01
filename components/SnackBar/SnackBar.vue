<template>
  <md-snackbar
    :md-position="position"
    :md-duration="isInfinity ? Infinity : duration"
    :md-active.sync="show"
    md-persistent
  >
    <span>{{ snack.text }}</span>
    <md-button class="md-primary" @click="close">Закрыть</md-button>
  </md-snackbar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data: () => ({
    position: "left",
    duration: 4000,
    isInfinity: false,
    show: false
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
      this.setSnack({ text: "", show: false });
    },
  },
  watch: {
      show(){
        if(this.show !== this.snack.show){
            this.setSnack({ ...this.snack.show, show: this.show});
        }
      },
      snack() {
         if(this.show !== this.snack.show){
            this.show = this.snack.show;
        }
      }
  }
};
</script>

<style lang="scss">
  @import "./SnackBar.scss";
</style>