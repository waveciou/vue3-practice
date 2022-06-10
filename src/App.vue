<template>
  <h1>{{ titleRef }}</h1>
  <div class="wrap">
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
