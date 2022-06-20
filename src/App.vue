<template>
  <div
    class="tw-w-[calc(100%-20px)] tw-max-w-[640px] tw-m-auto desktop:tw-w-full"
  >
    <div
      class="tw-flex tw-items-center tw-my-2"
      :class="{ 'tw-invisible': isHiddenNav === true }"
    >
      <router-link
        to="/"
        class="tw-flex tw-items-center tw-text-base before-font-material before:tw-content-['\e5c4'] before:tw-text-base before:tw-mr-1"
      >
        Back To Home
      </router-link>
    </div>
    <h1 class="tw-my-4 tw-text-center tw-text-4xl tw-font-semibold">
      {{ title }}
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
      const title = ref<string>('Vue 3.0 Practice');
      const isHiddenNav = ref<boolean>(true);

      watch(
        () => route,
        () => {
          const result: boolean = route.path === '/' ? true : false;
          isHiddenNav.value = result;
          title.value = (route.meta.title as string) || 'Vue 3.0 Practice';
        },
        {
          immediate: true,
          deep: true,
        }
      );

      return {
        title,
        isHiddenNav,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import '../src/scss/utils/_utils.scss';
</style>
