<template>
  <div class="podkast">
    <div class="podkast__header">
      <v-container>
        <h1>Подкаст</h1>
        <h2>
          Это подкаст <span>{{ podkast.title }}</span>
        </h2>
      </v-container>
    </div>
    <div class="podkast__body">
      <v-container>
        <!-- <img :src="podkast.pathImg" :alt="podkast.title" class="img"/> -->
        <div class="text">
          {{ podkast.text }}
        </div>
       
      </v-container>
    </div>
  
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default {
  data() {
    return {
      id: this.$route.params.id,
      podkast: {},
    };
  },
  created() {
    axios.get(`${process.env.BACKEND}/podkasts/${this.id}`).then((response) => {
      if (response && response.data && response.data.data) {
        this.podkast = response.data.data;
        console.log(response.data.data);
      }
    });
  },
};
</script>

<style lang="scss">
@import "./podkast.scss";
</style>
