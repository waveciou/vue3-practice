<template>
  <div class="tw-w-full tw-m-auto">
    <div class="tw-my-6 tw-flex tw-items-center desktop:tw-my-8">
      <input
        v-model.trim="inputValue"
        class="tw-w-full tw-h-10 tw-py-1 tw-px-3 tw-m-0 tw-inline-block tw-relative tw-text-md tw-leading-8 tw-text-blue-green tw-bg-white tw-border tw-border-white tw-border-solid tw-rounded tw-tracking-wide tw-grow tw-basis-0 tw-appearance-none"
        type="text"
        placeholder="Please enter your todo item"
      />
      <button
        class="tw-h-10 tw-p-3 tw-leading-4 tw-text-white tw-bg-blue-green tw-rounded tw-ml-2"
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
          class="tw-min-w-120 tw-h-10 tw-p-3 tw-mx-2 tw-leading-4 tw-text-center tw-text-white tw-bg-blue-green tw-rounded desktop:tw-mx-3"
          :class="{
            'tw-text-yellow':
              todoType !== 'UNCHECKED' && todoType !== 'CHECKED',
          }"
          @click.stop="todoType = 'ALL'"
        >
          ALL
        </button>
        <button
          class="tw-min-w-120 tw-h-10 tw-p-3 tw-mx-2 tw-leading-4 tw-text-center tw-text-white tw-bg-blue-green tw-rounded desktop:tw-mx-3"
          :class="{ 'tw-text-yellow': todoType === 'CHECKED' }"
          @click.stop="todoType = 'CHECKED'"
        >
          CHECKED
        </button>
        <button
          class="tw-min-w-120 tw-h-10 tw-p-3 tw-mx-2 tw-leading-4 tw-text-center tw-text-white tw-bg-blue-green tw-rounded desktop:tw-mx-3"
          :class="{ 'tw-text-yellow': todoType === 'UNCHECKED' }"
          @click.stop="todoType = 'UNCHECKED'"
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
              <span
                v-if="todoItem.checked === false"
                class="tw-block tw-w-6 tw-h-6 tw-mr-2 before-font-material before:tw-content-['\e835'] before:tw-leading-6 before:tw-text-blue-green before:tw-text-center"
              />
              <span
                v-else
                class="tw-block tw-w-6 tw-h-6 tw-mr-2 before-font-material before:tw-content-['\e834'] before:tw-leading-6 before:tw-text-blue-green before:tw-text-center"
              />
              <span class="tw-block tw-leading-6 tw-break-all">
                {{ todoItem.value }}
              </span>
            </label>
            <button
              type="button"
              class="before-font-material tw-absolute tw-top-3 tw-right-2 before:tw-content-['\e872'] before:tw-block before:tw-w-5 before:tw-h-6 before:tw-leading-6 before:tw-text-blue-green before:tw-text-center"
              @click.stop="deleteTodoHandler(todoItem.id)"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, computed } from 'vue';

  interface ITodoItem {
    id: string;
    value: string;
    checked: boolean;
  }

  type ITodoType = 'ALL' | 'CHECKED' | 'UNCHECKED';

  export default defineComponent({
    name: 'Todolist',
    setup() {
      const inputValue = ref<string>('');
      const todolist = reactive<ITodoItem[]>([]);
      const todoType = ref<ITodoType>('ALL');

      const addTodoHandler = () => {
        if (inputValue.value === '') {
          alert('Please enter something text.');
          return false;
        }

        const date: Date = new Date();

        todolist.push({
          id: `${date.getTime()}`,
          value: inputValue.value,
          checked: false,
        });

        inputValue.value = '';
        todoType.value = 'ALL';
      };

      const deleteTodoHandler = (id: string) => {
        const index: number = todolist.findIndex(
          (element) => element.id === id
        );
        if (index >= 0) {
          todolist.splice(index, 1);
        }
        return false;
      };

      const todolistByTypes = computed(() => {
        const type: ITodoType = todoType.value;

        return todolist.filter((todoItem) => {
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
        inputValue,
        todolist,
        todoType,
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
