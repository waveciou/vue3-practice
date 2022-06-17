<template>
  <div class="tw-w-full tw-m-auto">
    <div class="tw-my-6 tw-flex tw-items-center desktop:tw-my-8">
      <input
        v-model.trim="inputValue"
        class="tw-w-full tw-h-10 tw-py-1 tw-px-3 tw-m-0 tw-inline-block tw-relative tw-text-md tw-leading-8 tw-text-blue-green tw-bg-white tw-border tw-border-white tw-border-solid tw-rounded tw-tracking-wide tw-grow tw-basis-0 tw-appearance-none"
        type="text"
        placeholder="Please Input Your Todo"
        @keyup.enter="addTodoHandler"
      />
      <button
        type="button"
        class="tw-h-10 tw-p-3 tw-leading-4 tw-text-white tw-bg-blue-green tw-rounded tw-ml-3"
        @click.stop="addTodoHandler"
      >
        Add Todo
      </button>
    </div>
    <div>
      <div
        v-if="todolist.length > 0"
        class="tw-w-full tw-flex tw-items-center tw-overflow-x-auto tw-overflow-y-hidden tw-mb-4 desktop:tw-justify-center"
      >
        <button
          type="button"
          class="tw-min-w-120 tw-h-10 tw-p-3 tw-mx-2 tw-leading-4 tw-text-center tw-text-white tw-bg-blue-green tw-rounded desktop:tw-mx-3"
          :class="{
            'tw-text-yellow':
              selectType !== 'UNCHECKED' && selectType !== 'CHECKED',
          }"
          @click.stop="selectType = 'ALL'"
        >
          ALL
        </button>
        <button
          type="button"
          class="tw-min-w-120 tw-h-10 tw-p-3 tw-mx-2 tw-leading-4 tw-text-center tw-text-white tw-bg-blue-green tw-rounded desktop:tw-mx-3"
          :class="{ 'tw-text-yellow': selectType === 'CHECKED' }"
          @click.stop="selectType = 'CHECKED'"
        >
          CHECKED
        </button>
        <button
          type="button"
          class="tw-min-w-120 tw-h-10 tw-p-3 tw-mx-2 tw-leading-4 tw-text-center tw-text-white tw-bg-blue-green tw-rounded desktop:tw-mx-3"
          :class="{ 'tw-text-yellow': selectType === 'UNCHECKED' }"
          @click.stop="selectType = 'UNCHECKED'"
        >
          UNCHECKED
        </button>
      </div>
      <ul>
        <li
          v-for="todoItem of todolistByTypes"
          :key="todoItem.id"
          class="tw-mb-4"
        >
          <div
            class="tw-py-3 tw-pl-3 tw-pr-8 tw-relative tw-bg-white tw-border tw-border-white tw-border-solid tw-rounded tw-overflow-hidden"
          >
            <input
              :id="todoItem.id"
              v-model="todoItem.checked"
              type="checkbox"
              :checked="todoItem.checked === true"
              class="tw-w-0 tw-h-0 tw-absolute tw-opacity-0 tw-invisible tw-z-hidden"
            />
            <label
              :for="todoItem.id"
              class="tw-flex tw-items-center tw-cursor-pointer tw-overflow-hidden"
            >
              <div>
                <span
                  v-if="todoItem.checked === false"
                  class="tw-block tw-w-6 tw-h-6 tw-mr-2 before-font-material before:tw-content-['\e835'] before:tw-leading-6 before:tw-text-blue-green before:tw-text-center"
                />
                <span
                  v-else
                  class="tw-block tw-w-6 tw-h-6 tw-mr-2 before-font-material before:tw-content-['\e834'] before:tw-leading-6 before:tw-text-blue-green before:tw-text-center"
                />
              </div>
              <span class="tw-block tw-leading-6 tw-break-all">
                {{ todoItem.value }}
              </span>
            </label>
            <button
              type="button"
              class="before-font-material tw-absolute tw-top-3 tw-right-3 before:tw-content-['\e872'] before:tw-block before:tw-w-5 before:tw-h-6 before:tw-leading-6 before:tw-text-blue-green before:tw-text-center"
              @click.stop="deleteTodoHandler(todoItem.id)"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useTodoStore } from '../stores/todoStore';

  type ISelectType = 'ALL' | 'CHECKED' | 'UNCHECKED';

  export default defineComponent({
    name: 'TodoList',
    setup() {
      const todoStore = useTodoStore();
      const { todolist } = storeToRefs(todoStore);

      const inputValue = ref<string>('');
      const selectType = ref<ISelectType>('ALL');

      const addTodoHandler = () => {
        if (inputValue.value === '') {
          alert('Please Input Something.');
          return false;
        }

        const date: Date = new Date();

        todoStore.ADD_TODO_ACTION({
          id: `${date.getTime()}`,
          value: inputValue.value,
          checked: false,
        });

        inputValue.value = '';
        selectType.value = 'ALL';
      };

      const deleteTodoHandler = (id: string) => {
        todoStore.DELETE_TODO_ACTION(id);
        return false;
      };

      const todolistByTypes = computed(() => {
        const type: ISelectType = selectType.value;

        return todolist.value.filter((todoItem) => {
          if (type === 'UNCHECKED') {
            return todoItem.checked === false;
          } else if (type === 'CHECKED') {
            return todoItem.checked === true;
          } else {
            return todoItem;
          }
        });
      });

      return {
        todolist,
        inputValue,
        selectType,
        addTodoHandler,
        deleteTodoHandler,
        todolistByTypes,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import '../src/scss/utils/_utils.scss';
</style>
