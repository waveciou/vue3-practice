<template>
  <div
    class="tw-w-[calc(100%-20px)] tw-max-w-[640px] tw-m-auto desktop:tw-w-full"
  >
    <router-link to="/">Back To Home</router-link>
    <h1 class="tw-my-4 tw-text-center tw-text-4xl tw-font-semibold">
      {{ titleRef }}
    </h1>
    <router-view />
  </div>
</template>

<script lang="ts">
  import { ref, defineComponent } from 'vue';

  export default defineComponent({
    name: 'App',
    setup() {
      const titleRef = ref('Vue 3.0 Practice');
      return {
        titleRef,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import '../src/scss/utils/_utils.scss';
</style>
