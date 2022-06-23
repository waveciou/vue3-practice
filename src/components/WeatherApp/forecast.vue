<template>
  <div
    class="tw-w-full tw-my-5 tw-overflow-x-auto tw-overflow-y-hidden tw-rounded-md"
  >
    <table class="tw-w-full">
      <thead>
        <tr class="tw-bg-black">
          <th
            v-for="item of captionList"
            :key="item.id"
            class="tw-py-2 tw-text-white tw-leading-4"
            :class="`${classDefines}`"
          >
            <div>{{ formatTime(item.time, utcTime, 'YYYY/MM/DD') }}</div>
            <div>{{ formatTime(item.time, utcTime, 'HH:mm') }}</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            v-for="item of contentList"
            :key="item.id"
            class="tw-py-3"
            :class="`${classDefines}`"
          >
            <span>{{ item.description }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { v4 as uuidv4 } from 'uuid';
  import { useWeatherStore, IWeatherData } from '@/Store/weatherStore';
  import formatTime from '@/Utils/formatTime';

  const weatherStore = useWeatherStore();
  const { utcTime } = storeToRefs(weatherStore);

  const prop = defineProps<{
    list: IWeatherData[];
  }>();

  interface ICaptionList {
    id: string;
    time: number;
  }

  interface IContentList {
    id: string;
    description: string;
  }

  const classDefines =
    'tw-w-1/5 tw-px-2.5 tw-leading-relaxed tw-align-middle tw-text-center tw-border tw-border-gray-light tw-border-solid tw-text-xs';

  const captionList = computed((): ICaptionList[] => {
    const result: ICaptionList[] = prop.list.map(({ time }) => {
      return { id: uuidv4(), time };
    });
    return result;
  });

  const contentList = computed((): IContentList[] => {
    const result: IContentList[] = prop.list.map(({ description }) => {
      return { id: uuidv4(), description };
    });
    return result;
  });
</script>
