<template>
  <div class="error__header">
    <v-container>
      <h1 v-if="error.statusCode === 404">Страница не найдена</h1>
      <h1 v-else>Произошло что то непопровимое</h1>
      <my-typer
        :text="'Программист вставай мы все сломали'"
        :eternal="false"
        :speed="150"
        :colorObj="[
          { Программист: '#28BCE5' },
          { 'мы все сломали': 'crimson' },
        ]"
        :className="'main__typer'"
        :lines="2"
      />
      <pre>
          <code class="code">
<span class="green">&lt;!</span><span>DOCTYPE html</span><span class="green">&gt;</span>
<span class="orange">&lt;html&gt;</span>
  <span class="orange">&lt;style&gt;</span>
    * {
      <span class="green">СОСТОЯНИЕ</span>:<span class="blue">СЛОМАЛИ</span>;
    }
  <span class="orange">&lt;/style&gt;</span>
  <span class="orange">&lt;body&gt;</span> 
    Хей внизу ссылка
    Следуй за белым кроликом
    <div class="comment">
      &lt;!-- 
        <NuxtLink to="/"> <span class="link">
          <vue-typer
                text="ВЕРНУТЬСЯ"
                erase-style="clear"
                :pre-erase-delay='5000'
                :erase-delay='4000'
                :repeat="Infinity"
              /> 🐇 
          </span></NuxtLink> 
      --&gt;
    </div>
   <span class="orange">&lt;/body&gt;</span> 
<span class="orange">&lt;/html&gt;</span>
    </code>
    </pre>
    </v-container>
  </div>
</template>

<script>
import Typer from "~components/Typer/Typer";
export default {
  components: {
    "my-typer": Typer,
  },
  props: ["error"],
};
</script>

<style lang="scss">
@import "../assets/scss/colors";
@import "../assets/scss/mixins";
.error__header {
  padding-top: 83px;
  padding-bottom: 120px;
  background: $black2;
  h1 {
    margin-top: 120px;
    @include font(normal, 700, 86px, 96px, $white);
  }
  .code {
    color: $white !important;
    .comment {
      .vue-typer {
        font-family: monospace;
        cursor: pointer;
      }
      .vue-typer .custom.char {
        color: $white;
        background-color: $gray;
      }
      .vue-typer .custom.char.selected {
        background-color: $crimson;
      }
      .vue-typer .custom.caret {
        width: 10px;
        background-color: $blueLogo;
      }
    }
  }
}
</style>