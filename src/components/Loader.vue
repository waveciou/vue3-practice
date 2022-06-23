<template>
  <div
    class="tw-w-full tw-h-full tw-fixed tw-left-0 tw-top-0 tw-z-6000 tw-flex tw-items-center tw-justify-center tw-bg-white tw-bg-opacity-40"
  >
    <div class="tw-text-black tw-text-center">
      <div class="tw-flex tw-items-center tw-justify-center">
        <span
          class="bouncing-animation tw-w-4 tw-h-4 tw-block tw-my-8 tw-mx-1 tw-bg-black tw-rounded-full"
        />
        <span
          class="bouncing-animation bouncing-animation_delay-2 tw-w-4 tw-h-4 tw-block tw-my-8 tw-mx-1 tw-bg-black tw-rounded-full"
        />
        <span
          class="bouncing-animation bouncing-animation_delay-4 tw-w-4 tw-h-4 tw-block tw-my-8 tw-mx-1 tw-bg-black tw-rounded-full"
        />
      </div>
      <div class="tw-text-2xl tw-font-bold tw-break-words">Loading...</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/Scss/utils/_utils.scss';

  @keyframes bouncing-loader {
    to {
      opacity: 0.1;
      transform: translate3d(0, -1rem, 0);
    }
  }

  .bouncing-animation {
    animation: bouncing-loader 0.6s infinite alternate;
  }

  .bouncing-animation_delay-2 {
    animation-delay: 0.2s;
  }

  .bouncing-animation_delay-4 {
    animation-delay: 0.4s;
  }
</style>
