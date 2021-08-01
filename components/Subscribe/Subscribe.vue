<template>
  <div class="subscribe pt-32 pb-32 bg-gray-200  mx-auto px-4">
    <form @submit.prevent="sendRequest" class="flex items-center">
      <div class="subscribe__mail">
        <md-field>
          <label>Email</label>
          <md-input v-model="email" placeholder="Ваш e-mail"></md-input>
        </md-field>
      </div>
      <div class="btn__container">
        <md-button class="md-raised" @click="sendRequest">Отправить</md-button>
      </div>
    </form>
    <div class="text text-xl font-medium">
      Подпишитесь на наши обновления чтобы получать оповещения о выходе
      подкастов
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      email: "",
      emailRegular: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    };
  },
  methods: {
    ...mapMutations({
      setSnack: "store/setSnack"
    }),
    sendRequest() {
      if (this.email.length && this.emailValid) {
        axios
          .post(`${process.env.BACKEND}/request`, { email: this.email })
          .then(
            res => {
              if (res && res.status === 200) {
                this.setSnack({ text: "Подписка прошла успешно", show: true });
              }
            },
            err => {
              if (err && err.response && err.response.status === 406) {
                this.setSnack({ text: "Вы уже подписаны", show: true });
              } else {
                this.setSnack({ text: "Что то пошло не так", show: true });
              }
            }
          );
      } else {
        this.setSnack({ text: "Введите email", show: true });
      }
    }
  },
  computed: {
    emailValid() {
      return this.emailRegular.test(String(this.email).toLowerCase());
    }
  }
};
</script>

<style lang="scss">
  @import "./Subscribe.scss";
</style>