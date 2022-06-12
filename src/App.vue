<template>
  <div
    class="tw-w-[calc(100%-20px)] tw-max-w-[640px] tw-m-auto desktop:tw-w-full"
  >
    <div
      class="tw-flex tw-items-center"
      :class="{ 'tw-invisible': isHiddenNav === true }"
    >
      <router-link to="/">Back To Home</router-link>
    </div>
    <h1 class="tw-my-4 tw-text-center tw-text-4xl tw-font-semibold">
      {{ titleRef }}
    </h1>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
  import { ref, defineComponent, watch } from 'vue';
  import { useRoute } from 'vue-router';

  export default defineComponent({
    name: 'App',
    setup() {
      const route = useRoute();
      const titleRef = ref<string>('Vue 3.0 Practice');
      const isHiddenNav = ref<boolean>(true);

      watch(
        () => route.path,
        () => {
          const result = route.path === '/' ? true : false;
          isHiddenNav.value = result;
        },
        { immediate: true }
      );

      return {
        titleRef,
        isHiddenNav,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import '../src/scss/utils/_utils.scss';
</style>
