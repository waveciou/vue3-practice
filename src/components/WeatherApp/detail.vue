<template>
  <section
    class="tw-p-3 mobile:tw-p-4 desktop:tw-p-5 tw-rounded-md tw-bg-white"
  >
    <div class="desktop:tw-flex desktop:tw-justify-between tw-mb-5">
      <div class="desktop:tw-flex-grow desktop:tw-basis-0 desktop:tw-pr-5">
        <h2
          className="tw-text-2xl desktop:tw-text-3xl tw-font-bold tw-break-words tw-mb-4"
        >
          {{ detail?.name }}
        </h2>
        <div class="tw-p-3 tw-rounded-md tw-bg-gray-light">
          <ul>
            <li class="tw-text-base tw-leading-7 tw-font-bold">
              <strong>Time:</strong>
              {{ formatTime(detail?.time as number, utcTime) }}
            </li>
            <li class="tw-text-base tw-leading-7 tw-font-bold">
              <strong>Weather:</strong>
              {{ detail?.weather }}
            </li>
            <li class="tw-text-base tw-leading-7 tw-font-bold">
              <strong>Latitude:</strong>
              {{ detail?.coord.lat }}
            </li>
            <li class="tw-text-base tw-leading-7 tw-font-bold">
              <strong>Longitude:</strong>
              {{ detail?.coord.lon }}
            </li>
            <li class="tw-text-base tw-leading-7 tw-font-bold">
              <strong>Population:</strong>
              {{ formatCurrency(detail?.population as number) }}
            </li>
            <li class="tw-text-base tw-leading-7 tw-font-bold">
              <strong>Sunrise:</strong>
              {{ formatTime(detail?.sunrise as number, utcTime, 'HH:mm') }}
            </li>
            <li class="tw-text-base tw-leading-7 tw-font-bold">
              <strong>Sunset:</strong>
              {{ formatTime(detail?.sunset as number, utcTime, 'HH:mm') }}
            </li>
          </ul>
        </div>
      </div>
      <div
        v-if="humidity !== null"
        class="tw-w-52 tw-mx-auto tw-my-5 desktop:tw-mx-0 desktop:tw-my-0 desktop:tw-basis-52"
      >
        <PieChart :amount="humidity" />
        <div class="tw-text-center tw-text-xl tw-font-bold tw-mt-3 tw-mb-1">
          Humidity
        </div>
      </div>
    </div>
    <Forecast :list="weatherList" />
  </section>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useWeatherStore } from '@/Store/weatherStore';
  import formatTime from '@/Utils/formatTime';
  import formatCurrency from '@/Utils/formatCurrency';
  import PieChart from '@/Components/WeatherApp/pieChart.vue';
  import Forecast from '@/Components/WeatherApp/forecast.vue';

  const weatherStore = useWeatherStore();
  const { detail, humidity, utcTime, weatherList } = storeToRefs(weatherStore);
</script>
