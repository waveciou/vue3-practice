<template>
  <div class="tw-w-full tw-m-auto">
    <div class="tw-my-6 tw-flex tw-items-center desktop:tw-my-8">
      <input
        v-model.trim="inputValue"
        class="tw-w-full tw-h-10 tw-py-1 tw-px-3 tw-m-0 tw-inline-block tw-relative tw-text-md tw-leading-8 tw-text-blue-green tw-bg-white tw-border tw-border-white tw-border-solid tw-rounded tw-tracking-wide tw-grow tw-basis-0 tw-appearance-none"
        type="text"
        placeholder="Search City"
        @keyup.enter="handleSubmit"
      />
      <button
        type="button"
        class="tw-h-10 tw-p-3 tw-leading-4 tw-text-white tw-bg-blue-green tw-rounded tw-ml-3"
        title="Submit"
        @click.stop="handleSubmit"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const inputValue = ref<string>('');

  const handleSubmit = () => {
    return false;
  };
</script>

<style lang="scss" scoped>
  @import '../src/scss/utils/_utils.scss';
</style>
