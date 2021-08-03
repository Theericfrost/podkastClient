<template>
  <div class="faq">
    <div class="faq__header">
      <v-container>
        <h1>Faq</h1>
        <h2>Здесь собраны самые популярные вопросы и ответы</h2>
      </v-container>
    </div>
    <div class="questions">
      <v-container>
        <div class="questions__title">Популярные вопросы</div>
        <div class="questions__text">
          Мы получаем от наших слушателей, читателей и зрителей сотни вопросов
          каждый год. Причем часто они повторяются. Поэтому мы решили ответить
          на них в одном месте. Этот FAQ актуален на лето 2021 года, но мы
          постараемся его время от времени обновлять, если что-то изменится.
        </div>
        <div class="list">
          <v-expansion-panels multiple>
            <v-expansion-panel
              v-for="question in questions"
              :key="question.title"
            >
              <v-expansion-panel-header>
                {{ question.title }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                {{ question.text }}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [
        { title: "Какой микрофон используешь?", text: "Reizer Siren X" },
        { title: "Любимый сорт пива?", text: "Guiness" },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "./faq/faq.scss";
</style>