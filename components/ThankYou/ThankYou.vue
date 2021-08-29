<template>
  <div class="thankYou mx-auto px-4 pb-16">
    <transition name="bounce" v-on:leave="leave">
      <div v-if="show === 'smartphone'" class="smartphone">
        <div class="content">Спасибо что слушаете</div>
      </div>
    </transition>
    <transition name="bounce"  v-on:leave="leave">
      <div v-if="show === 'tablet'" class="tablet">
        <div class="content">Наш вечно лапмовый</div>
      </div>
    </transition>
    <transition name="bounce" v-on:leave="leave">
      <div v-if="show === 'laptop'" class="laptop">
        <div class="content">Подкаст <span> Frost Cast</span></div>
      </div>
    </transition>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  data() {
    return {
      show: "smartphone",
      interval: null,
      counter: 0,
      showList: ["smartphone", "tablet", "laptop"],
    };
  },
  methods: {
    startAnimation() {
      this.interval = setInterval(() => {
        if (this.counter > this.showList.length - 1) {
          this.counter = 0;
        }
        this.show = this.showList[this.counter];
        this.counter += 1;
      }, 3000);
    },
    leave(el, done) {
      el.style.display = "none";
    },
  },
  created() {
    this.startAnimation();
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
});
</script>

<style lang="scss">
@import "./ThankYou.scss";
</style>
