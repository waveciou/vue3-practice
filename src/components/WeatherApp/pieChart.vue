<template>
  <div>
    <svg
      class="pie-chart"
      viewBox="0 0 33.83098862 33.83098862"
      width="200"
      height="200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        stroke="#efefef"
        stroke-width="2"
        fill="none"
        cx="16.91549431"
        cy="16.91549431"
        r="15.91549431"
      ></circle>
      <circle
        class="pie-chart__circle"
        stroke="#42B983"
        stroke-width="2"
        :stroke-dasharray="`${amountValue},100`"
        stroke-linecap="round"
        fill="none"
        cx="16.91549431"
        cy="16.91549431"
        r="15.91549431"
      ></circle>
      <g class="pie-chart__info">
        <text
          class="pie-chart__percent"
          x="16.91549431"
          y="16.91549431"
          alignment-baseline="central"
          text-anchor="middle"
          font-size="8"
        >
          {{ amountValue }}%
        </text>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const prop = defineProps<{
    amount: number;
  }>();

  const amountValue = computed(() => {
    return Math.floor(prop.amount);
  });
</script>

<style lang="scss" scoped>
  @import '@/Scss/utils/_utils.scss';

  @keyframes pie-chart-fill {
    to {
      stroke-dasharray: 0 100;
    }
  }

  @keyframes pie-chart-appear {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .pie-chart {
    &__circle {
      transform: rotate(-90deg);
      animation: pie-chart-fill 2s reverse;
      transform-origin: center;
    }

    &__info {
      opacity: 0;
      transform: translateY(0.3em);
      animation: pie-chart-appear 2s forwards;
    }

    &__percent {
      fill: $color-black;
      font-weight: 600;
    }
  }
</style>
