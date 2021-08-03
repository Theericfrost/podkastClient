<template>
  <div class="subscribe pt-32 pb-32 bg-gray-200">
    <v-container>
      <form @submit.prevent="sendRequest" class="flex items-center">
        <div class="subscribe__mail">
          <v-text-field
            label="Email"
            v-model="email"
            placeholder="Ваш e-mail"
          ></v-text-field>
        </div>
        <div class="btn__container ml-4">
          <v-btn depressed @click="sendRequest">Подписаться</v-btn>
        </div>
      </form>
      <div class="text text-xl font-medium">
        Подпишитесь на наши обновления чтобы получать оповещения о выходе
        подкастов
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      email: "",
      emailRegular:
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    };
  },
  methods: {
    ...mapMutations({
      setSnack: "store/setSnack",
    }),
    sendRequest() {
      if (this.email.length && this.emailValid) {
        axios
          .post(`${process.env.BACKEND}/request`, { email: this.email })
          .then(
            (res) => {
              if (res && res.status === 200) {
                this.setSnack({ text: "Подписка прошла успешно" });
              }
            },
            (err) => {
              if (err && err.response && err.response.status === 406) {
                this.setSnack({ text: "Вы уже подписаны" });
              } else {
                this.setSnack({ text: "Что то пошло не так" });
              }
            }
          );
      } else {
        this.setSnack({ text: "Введите email" });
      }
    },
  },
  computed: {
    emailValid() {
      return this.emailRegular.test(String(this.email).toLowerCase());
    },
  },
};
</script>

<style lang="scss">
@import "./Subscribe.scss";
</style>