<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center tw-fixed tw-top-0 tw-left-0 tw-z-[5000] tw-bg-black/60"
        @click.stop="handleClose"
      >
        <div
          class="modal-container tw-max-w-[600px] tw-w-[calc(100%-40px)] tw-min-h-[300px] tw-max-h-[calc(100%-40px)] tw-bg-white tw-px-5 tw-py-2.5 tw-relative tw-overflow-hidden tw-rounded-lg"
          @click.stop=""
        >
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
  const emits = defineEmits<{
    (e: 'close'): void;
  }>();
  defineProps<{ isOpen: boolean }>();
  const handleClose = (): void => {
    emits('close');
  };
</script>

<style scoped lang="scss">
  .modal-container {
    transition: all 0.3s ease;
  }
</style>
