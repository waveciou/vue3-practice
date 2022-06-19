<template>
  <div
    class="tw-w-full tw-flex tw-items-center tw-overflow-x-auto tw-overflow-y-hidden tw-mb-4 desktop:tw-justify-center"
  >
    <button
      type="button"
      class="tw-min-w-120 tw-h-10 tw-p-3 tw-mx-2 tw-leading-4 tw-text-center tw-text-white tw-bg-blue-green tw-rounded desktop:tw-mx-3"
      :class="{
        'tw-text-yellow': selected !== 'UNCHECKED' && selected !== 'CHECKED',
      }"
      @click.stop="context.emit('select', 'ALL')"
    >
      ALL
    </button>
    <button
      type="button"
      class="tw-min-w-120 tw-h-10 tw-p-3 tw-mx-2 tw-leading-4 tw-text-center tw-text-white tw-bg-blue-green tw-rounded desktop:tw-mx-3"
      :class="{ 'tw-text-yellow': selected === 'CHECKED' }"
      @click.stop="context.emit('select', 'CHECKED')"
    >
      CHECKED
    </button>
    <button
      type="button"
      class="tw-min-w-120 tw-h-10 tw-p-3 tw-mx-2 tw-leading-4 tw-text-center tw-text-white tw-bg-blue-green tw-rounded desktop:tw-mx-3"
      :class="{ 'tw-text-yellow': selected === 'UNCHECKED' }"
      @click.stop="context.emit('select', 'UNCHECKED')"
    >
      UNCHECKED
    </button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'TodoNav',
    props: {
      selected: {
        type: String,
        required: true,
      },
    },
    setup(props, context) {
      return {
        context,
      };
    },
  });
</script>
