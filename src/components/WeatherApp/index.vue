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
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { v4 as uuidv4 } from 'uuid';
  import { useCommonStore } from '../../store/commonStore';

  const commonStore = useCommonStore();
  const inputValue = ref<string>('');
  const isError = ref<boolean>(false);

  onMounted(() => {
    isError.value = false;
    commonStore.isLoading = false;
  });

  const handleSubmit = async () => {
    if (inputValue.value === '') {
      return false;
    }

    isError.value = false;
    commonStore.isLoading = true;

    try {
      const { data } = await axios({
        method: 'get',
        url: 'https://api.openweathermap.org/data/2.5/forecast',
        params: {
          q: inputValue.value,
          units: 'metric',
          lang: 'zh_tw',
          cnt: '5',
          mode: 'json',
          appid: '48f427056d4654fc05c05c1e61a36c47',
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(data);
      commonStore.isLoading = false;
    } catch (error) {
      console.log(error);
      isError.value = true;
      commonStore.isLoading = false;
    }
  };
</script>

<style lang="scss" scoped>
  @import '../src/scss/utils/_utils.scss';
</style>
