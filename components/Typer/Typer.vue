<template>
  <div
    :class="['typer', className]"
    v-html="stringText"
    :style="{ minHeight: `${lines * 56}px` }"
  />
</template>

<script>
export default {
  props: {
    text: String,
    eternal: Boolean,
    speed: Number,
    colorObj: Array,
    className: String,
    lines: Number,
  },
  data() {
    return {
      spanArr: [],
      newArr: [],
      stringText: "",
      counterTyper: 0,
      counterSpan: 0,
      typeTextInterval: null,
      eternalTimeOut: null,
    };
  },
  methods: {
    updateText() {
      this.colorObj.map((el) => {
        Object.entries(el).map(([title, color]) => {
          let spanStart = `<span style="color:${color}">`;
          this.spanArr = [
            ...this.spanArr,
            {
              span: spanStart,
              indexStart: this.text.indexOf(title),
              indexPreSpanClose: this.text.indexOf(title) + title.length,
            },
          ];
        });
      });
    },
    typerFunc() {
      if (this.colorObj) {
        const textArr = this.text.split("");
        this.typeTextInterval = setInterval(() => {
          // insert start of color span tag
          if (
            this.spanArr[this.counterSpan] &&
            textArr[this.counterTyper] &&
            this.counterTyper === this.spanArr[this.counterSpan].indexStart
          ) {
            this.newArr = [...this.newArr, this.spanArr[this.counterSpan].span];
            if (textArr[this.counterTyper]) {
              this.newArr = [...this.newArr, textArr[this.counterTyper]];
            }
          }
          // inset finish color span tag
          else if (
            this.spanArr[this.counterSpan] &&
            this.counterTyper ===
              this.spanArr[this.counterSpan].indexPreSpanClose
          ) {
            this.newArr = [...this.newArr, "</span>"];
            if (textArr[this.counterTyper]) {
              this.newArr = [...this.newArr, textArr[this.counterTyper]];
            }
            this.counterSpan++;
          } else {
            if (textArr[this.counterTyper])
              this.newArr = [...this.newArr, textArr[this.counterTyper]];
          }
          this.counterTyper++;
        }, this.speed);
      } else {
        // Non color block
        const textArr = text.split("");
        typeTextInterval = setInterval(() => {
          if (textArr[this.counterTyper]) {
            this.newArr = [...this.newArr, textArr[this.counterTyper]];
            this.counterTyper++;
          }
        }, this.speed);
      }
    },
  },
  mounted() {
    if (this.colorObj) {
      this.updateText();
    }
    this.typerFunc();
  },
  beforeDestroy() {
    clearInterval(this.typeTextInterval);
    clearTimeout(this.eternalTimeOut);
  },
  watch: {
    newArr: {
      handler(value) {
        this.stringText = value.join("");
        if (
          this.eternal &&
          this.text.length === this.newArr.length - this.spanArr.length * 2
        ) {
          this.eternalTimeOut = setTimeout(() => {
            this.newArr = [];
            this.counterTyper = 0;
            this.counterSpan = 0;
          }, 2000);
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
@import "./Typer.scss";
</style>
