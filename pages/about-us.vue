<template>
  <div class="about__us">
    <div class="img__block">
      <div
        class="img__bg"
        :style="{
          background:
            'url(' + require('@/assets/img/AboutUs/AboutUsBg.jpeg') + ')',
        }"
      ></div>
      <v-container>
        <div class="text">
          <h1>Меня зовут Эрик</h1>
          <h2><span>Автор</span> данного подкаста</h2>
        </div>
      </v-container>
    </div>
    <v-container>
      <v-timeline class="timeline">
        <v-timeline-item
          v-for="(year, i) in years"
          :key="i"
          :color="year.color"
          small
        >
          <template v-slot:opposite>
            <span
              :class="`headline font-weight-bold ${year.color}--text`"
              v-text="year.year"
            ></span>
          </template>
          <div class="py-4">
            <h2 :class="`headline font-weight-light mb-4 ${year.color}--text`">
              {{ year.title }}
            </h2>
            <div class="text__sub">
              {{ year.text }}
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      years: [
        {
          color: "cyan",
          year: "2007",
          title: "Вошел в АЙТИ",
          text: "Первый раз установил Windows",
        },
        {
          color: "green",
          year: "2011",
          title: "Начало веб разработки",
          text: "Сверстал первый сайт в таблицах",
        },
        {
          color: "pink",
          year: "2013",
          title: "Канал на You Tube",
          text: "Дата регистрации: 31 июл. 2013 г.",
        },
        {
          color: "amber",
          year: "2020",
          title: "Закончил универ",
          text: "Выпустился по информационной безопасности",
        },
        {
          color: "orange",
          year: "До сих пор",
          title: "Программирование",
          text: "Работаю frontend разработчиком",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "./about-us/about-us.scss";
</style>