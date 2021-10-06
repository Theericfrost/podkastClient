<template>
  <div class="BugTracker">
    <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
      content-class="bug__dialog"
    >
      <template v-slot:activator="{ on, attrs }">
        <i class="fas fa-bug" v-bind="attrs" v-on="on" />
      </template>
      <template v-slot:default="dialog">
        <v-card>
          <v-card-text>
            <div class="text">
              <vue-typer
                text="Напишите о ваших пожеланиях или об ошибках в работе сайта"
                erase-style="clear"
                :repeat="0"
              />
            </div>
            <v-textarea
              solo
              class="text__area"
              label="Ваше сообщение"
              v-model="message"
            ></v-textarea>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="sendMessage(dialog)">Отправить</v-btn>
            <v-btn text @click="dialog.value = false">Закрыть</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
import { post } from "axios";
import { mapMutations } from "vuex";

export default {
  props: {},
  data() {
    return {
      open: false,
      message: ""
    };
  },
  methods: {
    ...mapMutations({
      setSnack: "store/setSnack"
    }),
    sendMessage(dialog) {
      if (this.message.length > 256) {
        this.setSnack({ text: "Максимальное количество символов 256" });
      } else {
        post(`${process.env.BACKEND}/errors`, { error: this.message }).then(
          response => {
            if (response && response.status === 200) {
              this.setSnack({ text: "Ваше сообщение успешно отправлено" });
              dialog.value = false;
            } else {
              this.setSnack({ text: "Что то пошло не так" });
            }
          },
          error => {
            this.setSnack({ text: "Что то пошло не так" });
          }
        );
      }
    }
  }
};
</script>

<style lang="scss">
@import "./BugTracker.scss";
</style>
