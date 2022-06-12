<template>
  <div>
    <ul class="tw-pl-6 tw-mb-8 tw-list-disc">
      <li>
        <router-link class="tw-inline-block tw-text-lg" to="/todolist">
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
</style>
