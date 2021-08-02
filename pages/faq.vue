<template>
  <div class="faq">
    <div class="faq__header">
      <div class="container mx-auto px-4">
        <h1>Faq</h1>
        <h2>Здесь собраны самые популярные вопросы и ответы</h2>
      </div>
    </div>
    <div class="questions">
      <div class="container mx-auto px-4">
        <div class="questions__title">Популярные вопросы</div>
        <div class="questions__text">
          Мы получаем от наших слушателей, читателей и зрителей сотни вопросов
          каждый год. Причем часто они повторяются. Поэтому мы решили ответить
          на них в одном месте. Этот FAQ актуален на лето 2021 года, но мы
          постараемся его время от времени обновлять, если что-то изменится.
        </div>
        <div class="list">
          <md-list :md-expand-single="expandSingle">
            <md-list-item md-expand v-for="question in questions" :key="question.title" >
              <span class="md-list-item-text">{{question.title}}</span>
              <md-list slot="md-expand">
                <md-list-item class="md-inset">{{question.text}}</md-list-item>
              </md-list>
            </md-list-item>
          </md-list>
        </div>
      </div>
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