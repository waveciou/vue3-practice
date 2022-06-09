<template>
  <h1>Vue 3.0 Practice</h1>
  <div class="wrap">
    <ul class="home-contents">
      <li>
        <router-link class="home-contents__link" to="/home">home</router-link>
      </li>
      <li>
        <router-link class="home-contents__link" to="/todolist">
          Todolist
        </router-link>
      </li>
    </ul>
  </div>

  <div>{{ appMessage }}</div>

  <router-view />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'App',
    setup() {
      const appMessage = 'App元件';
      return {
        appMessage,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import '../src/scss/utils/_utils.scss';

  .home-contents {
    padding-left: 25px;
    margin: 2rem 0;
    list-style: disc;

    > li {
      margin-bottom: 1rem;
    }
  }

  .home-contents__link {
    display: inline-block;
    font-size: 18px;
    line-height: 1.6em;
    color: $color-blue-green;

    @include min-width(1025px) {
      &:hover,
      &:focus {
        color: $color-yellow;
      }
    }
  }
</style>
