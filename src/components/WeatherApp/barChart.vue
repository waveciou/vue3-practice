<template>
  <div>
    <svg
      class="tw-m-auto"
      width="290px"
      height="200px"
      @mouseleave="$emit('set-current', '')"
    >
      <g
        v-for="(item, index) of amountValue"
        :key="`bar_${item.id}`"
        @mouseleave="$emit('set-current', '')"
        @mouseenter="handleSetCurrent(item.time)"
      >
        <rect
          class="bar-chart__column tw-cursor-pointer"
          width="50px"
          :height="`${item.percent}%`"
          :y="`${100 - item.percent}%`"
          :x="`${(50 + 10) * index}px`"
          rx="6"
        ></rect>
        <text
          class="bar-chart__text"
          :x="`${(50 + 10) * index + 25}px`"
          :y="`${104 - item.percent}%`"
          fill="#ffffff"
          alignment-baseline="central"
          text-anchor="middle"
          font-size="12"
        >
          {{ item.value }}
        </text>
      </g>
    </svg>
    <svg class="tw-m-auto" width="290px" height="20px">
      <g v-for="(item, index) of amountValue" :key="`caption_${item.id}`">
        <text
          :x="`${(50 + 10) * index + 25}px`"
          y="10px"
          fill="#35495e"
          alignment-baseline="central"
          text-anchor="middle"
          font-size="12"
        >
          {{ formatTime(item.time, utcTime, 'HH:mm') }}
        </text>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useWeatherStore } from '@/Store/weatherStore';
  import { v4 as uuidv4 } from 'uuid';
  import formatTime from '@/Utils/formatTime';
  import { ITempData } from '@/Store/weatherStore';

  const weatherStore = useWeatherStore();
  const { utcTime } = storeToRefs(weatherStore);

  const prop = defineProps<{
    amount: ITempData[];
  }>();

  const emit = defineEmits(['set-current']);

  interface IAmountData {
    id: string;
    value: number;
    percent: number;
    time: number;
  }

  const amountValue = computed((): IAmountData[] => {
    const _amount: number[] = prop.amount.map(({ value }) => value);
    const max: number = Math.max(..._amount) * 100;
    const min: number = Math.min(..._amount) * 100;
    const range: number = max - min;

    const result: IAmountData[] = prop.amount.map(({ value, time }) => {
      const formatValue: number = value * 100;
      let percent = 100;

      if (formatValue === max) {
        percent = 100;
      } else if (formatValue === min) {
        percent = 10;
      } else {
        const _percent: number = ((formatValue - min) / range) * 100;
        percent = _percent > 90 ? _percent : 10 + _percent;
      }

      return { value, percent, time, id: uuidv4() };
    });

    return result;
  });

  const handleSetCurrent = (time: number) => {
    const result: string = formatTime(time, utcTime.value);
    emit('set-current', result);
  };
</script>

<style lang="scss" scoped>
  @import '@/Scss/utils/_utils.scss';

  .bar-chart {
    &__column {
      fill: $color-green;
      transition: fill 0.4s ease;

      @media screen and (min-width: 1025px) {
        &:hover {
          fill: $color-black;
        }
      }
    }

    &__text {
      pointer-events: none;
    }
  }
</style>
