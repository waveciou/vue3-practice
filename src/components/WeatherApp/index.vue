<template>
  <div class="tw-w-full tw-m-auto">
    <div class="tw-my-6 tw-flex tw-items-center desktop:tw-my-8">
      <input
        v-model.trim="inputValue"
        class="tw-w-full tw-h-10 tw-py-1 tw-px-3 tw-m-0 tw-inline-block tw-relative tw-text-md tw-leading-8 tw-text-black tw-bg-white tw-border tw-border-white tw-border-solid tw-rounded tw-tracking-wide tw-grow tw-basis-0 tw-appearance-none"
        type="text"
        placeholder="Search City"
        @keyup.enter="handleSubmit"
      />
      <button
        type="button"
        class="tw-h-10 tw-p-3 tw-leading-4 tw-text-white tw-bg-black tw-rounded tw-ml-3"
        title="Submit"
        @click.stop="handleSubmit"
      >
        Submit
      </button>
    </div>

    <transition name="fade" mode="out-in">
      <Detail v-if="isShowResult" />
    </transition>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import axios from 'axios';
  // import { v4 as uuidv4 } from 'uuid';
  import { useCommonStore } from '@/Store/commonStore';
  import { useWeatherStore } from '@/Store/weatherStore';
  import Detail from '@/Components/WeatherApp/detail.vue';

  interface IDataListItem {
    dt: number;
    main: {
      temp_max: number;
      temp_min: number;
      humidity: number;
    };
    weather: { description: string }[];
  }

  const commonStore = useCommonStore();
  const weatherStore = useWeatherStore();

  const inputValue = ref<string>('');
  const isError = ref<boolean>(false);
  // const currentMaxTemp = ref<string>('');
  // const currentMinTemp = ref<string>('');

  const { isLoading } = storeToRefs(commonStore);
  const { detail } = storeToRefs(weatherStore);

  onMounted(() => {
    isError.value = false;
    isLoading.value = false;
  });

  const handleSubmit = async () => {
    if (inputValue.value === '' && !isLoading.value) {
      return false;
    }

    isError.value = false;
    isLoading.value = true;

    weatherStore.$reset();

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

      weatherStore.$patch((state) => {
        const { coord, population, sunrise, sunset, timezone } = data.city;

        state.weatherList = data.list.map(({ dt, weather }: IDataListItem) => {
          return {
            description: weather[0].description,
            time: dt,
          };
        });

        state.tempMaxList = data.list.map(({ dt, main }: IDataListItem) => {
          return {
            value: main.temp_max,
            time: dt,
          };
        });

        state.tempMinList = data.list.map(({ dt, main }: IDataListItem) => {
          return {
            value: main.temp_min,
            time: dt,
          };
        });

        state.humidity = data.list[0].main.humidity;
        state.utcTime = timezone / 3600;

        state.detail = {
          name: `${data.city.name}, ${data.city.country}`,
          weather: data.list[0].weather[0].description,
          coord,
          population,
          sunrise,
          sunset,
          time: data.list[0].dt,
        };
      });

      inputValue.value = '';
      isLoading.value = false;
    } catch (error) {
      console.log(error);
      isError.value = true;
      isLoading.value = false;
    }
  };

  const isShowResult = computed(() => {
    const result: boolean =
      !isLoading.value && !isError.value && detail.value !== null;
    return result;
  });
</script>

<style lang="scss" scoped>
  @import '@/Scss/utils/_utils.scss';
</style>
