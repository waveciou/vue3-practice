<template>
  <div
    class="tw-py-3 tw-pl-3 tw-pr-8 tw-relative tw-bg-white tw-border tw-border-white tw-border-solid tw-rounded tw-overflow-hidden"
  >
    <input
      :id="todoData.id"
      v-model="isChecked"
      type="checkbox"
      :checked="todoData.checked === true"
      class="tw-w-0 tw-h-0 tw-absolute tw-opacity-0 tw-invisible tw-z-hidden"
    />
    <label
      :for="todoData.id"
      class="tw-flex tw-items-center tw-cursor-pointer tw-overflow-hidden"
    >
      <div>
        <span
          v-if="todoData.checked === false"
          class="tw-block tw-w-6 tw-h-6 tw-mr-2 before-font-material before:tw-content-['\e835'] before:tw-leading-6 before:tw-text-blue-green before:tw-text-center"
        />
        <span
          v-else
          class="tw-block tw-w-6 tw-h-6 tw-mr-2 before-font-material before:tw-content-['\e834'] before:tw-leading-6 before:tw-text-blue-green before:tw-text-center"
        />
      </div>
      <span class="tw-block tw-leading-6 tw-break-all">
        {{ todoData.value }}
      </span>
    </label>
    <button
      type="button"
      class="before-font-material tw-absolute tw-top-3 tw-right-3 before:tw-content-['\e872'] before:tw-block before:tw-w-5 before:tw-h-6 before:tw-leading-6 before:tw-text-blue-green before:tw-text-center"
      @click.stop="context.emit('delete', todoData.id)"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { useTodoStore } from '../../store/todoStore';

  export default defineComponent({
    name: 'TodoItem',
    props: {
      todoData: {
        type: Object,
        required: true,
      },
    },
    setup(props, context) {
      const todoStore = useTodoStore();
      const isChecked = ref<boolean>(props.todoData.checked);

      watch(isChecked, (current) => {
        todoStore.$patch((state) => {
          const index: number = state.todolist.findIndex(
            (item) => item.id === props.todoData.id
          );

          if (index >= 0) {
            state.todolist[index].checked = current;
          }
        });
      });

      return {
        isChecked,
        context,
      };
    },
  });
</script>
