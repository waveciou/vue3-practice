<template>
  <div class="tw-w-full tw-m-auto">
    <button @click="handleOpen">Open</button>
    <PopUp :is-open="isOpen" @close="handleClose">
      <p>This is PopUp Component</p>
    </PopUp>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import PopUp from '@/Components/Popup/popup.vue';

  const isOpen = ref<boolean>(false);
  const handleOpen = (): void => {
    isOpen.value = true;
  };
  const handleClose = (): void => {
    isOpen.value = false;
  };
</script>

<style lang="scss" scoped>
  @import '@/Scss/utils/_utils.scss';
</style>
