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
  <transition name="fade" mode="out-in">
    <Loader v-if="isLoading" />
  </transition>
</template>

<script lang="ts">
  import { ref, defineComponent, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { useCommonStore } from '@/Store/commonStore';
  import Loader from '@/Components/Loader.vue';

  export default defineComponent({
    name: 'App',
    components: {
      'Loader': Loader,
    },
    setup() {
      const route = useRoute();
      const commonStore = useCommonStore();

      const title = ref<string>('Vue 3.0 Practice');
      const isHiddenNav = ref<boolean>(true);

      const { isLoading } = storeToRefs(commonStore);

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
        isLoading,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import '@/Scss/utils/_utils.scss';
</style>
