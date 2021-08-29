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
            <v-btn text @click="sendMessage">Отправить</v-btn>
            <v-btn text @click="dialog.value = false">Закрыть</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      open: false,
      message: "",
    };
  },
  methods: {
    sendMessage() {
      console.log(this.message);
    },
  },
};
</script>

<style lang="scss">
@import "./BugTracker.scss";
</style>
