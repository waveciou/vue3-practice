<template>
  <div>
    <ul class="tw-pl-6 tw-mb-8 tw-list-disc">
      <li>
        <router-link class="tw-inline-block tw-text-lg" to="/todolist">
          Todolist
        </router-link>
      </li>
      <li>
        <router-link class="tw-inline-block tw-text-lg" to="/weather-app">
          Weather App
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
      return {};
    },
  });
</script>

<style lang="scss" scoped>
  @import '../src/scss/utils/_utils.scss';
</style>
