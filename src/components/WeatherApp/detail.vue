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
    </div>
  </section>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs';
  import utc from 'dayjs/plugin/utc';

  import { storeToRefs } from 'pinia';
  import { useWeatherStore } from '../../store/weatherStore';

  dayjs.extend(utc);

  const weatherStore = useWeatherStore();
  const { detail, utcTime } = storeToRefs(weatherStore);

  const formatTime = (
    time: number,
    utcTime: number,
    format?: string
  ): string => {
    const _format = format ? format : 'YYYY/MM/DD HH:mm';
    return dayjs.unix(time).utcOffset(utcTime).format(_format);
  };

  const formatCurrency = (value: number): string => {
    let result = `${value}`;
    const reg = /(-?\d+)(\d{3})/;
    while (reg.test(result)) {
      result = result.replace(reg, '$1,$2');
    }
    return result;
  };
</script>
