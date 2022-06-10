<template>
  <div>
    <ul class="home-contents">
      <li>
        <router-link class="home-contents__link" to="/">home</router-link>
      </li>
      <li>
        <router-link class="home-contents__link" to="/todolist">
          Todolist
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Home',
    setup() {
      return {
        // 返回的資料
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
