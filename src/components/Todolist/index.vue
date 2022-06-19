<template>
  <div class="tw-w-full tw-m-auto">
    <div class="tw-my-6 tw-flex tw-items-center desktop:tw-my-8">
      <input
        v-model.trim="inputValue"
        class="tw-w-full tw-h-10 tw-py-1 tw-px-3 tw-m-0 tw-inline-block tw-relative tw-text-md tw-leading-8 tw-text-blue-green tw-bg-white tw-border tw-border-white tw-border-solid tw-rounded tw-tracking-wide tw-grow tw-basis-0 tw-appearance-none"
        type="text"
        placeholder="Please Input Your Todo"
        @keyup.enter="handleAddTodo"
      />
      <button
        type="button"
        class="tw-h-10 tw-p-3 tw-leading-4 tw-text-white tw-bg-blue-green tw-rounded tw-ml-3"
        @click.stop="handleAddTodo"
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
          v-for="todoItem of contextTodolist"
          :key="todoItem.id"
          class="tw-mb-4"
        >
          <TodoItem :todo-data="todoItem" @delete="handleDeleteTodo" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, watch, onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { v4 as uuidv4 } from 'uuid';
  import { ITodoItem, useTodoStore } from '../../store/todoStore';
  import TodoItem from './todoItem.vue';

  type ISelectType = 'ALL' | 'CHECKED' | 'UNCHECKED';

  export default defineComponent({
    name: 'Todolist',
    components: {
      'TodoItem': TodoItem,
    },
    setup() {
      const todoStore = useTodoStore();
      const { todolist } = storeToRefs(todoStore);

      const inputValue = ref<string>('');
      const selectType = ref<ISelectType>('ALL');

      onMounted(() => {
        const localData: string = localStorage.getItem('vue3-todolist') || '';
        let isConfirm = false;

        if (localData !== '') {
          try {
            const localValue: ITodoItem[] = JSON.parse(localData);

            if (Array.isArray(localValue)) {
              isConfirm = true;

              todoStore.$patch((state) => {
                state.todolist = [...localValue];
              });
            }
          } catch (error) {
            console.log(error);
          }

          if (!isConfirm) {
            localStorage.removeItem('vue3-todolist');
          }
        }
      });

      const handleAddTodo = () => {
        if (inputValue.value === '') {
          alert('Please Input Something.');
          return false;
        }

        // * Use Actions to edit the store data.
        // todoStore.ADD_TODO_ACTION({
        //   id: `${uuidv4()}`,
        //   value: inputValue.value,
        //   checked: false,
        // });

        todoStore.$patch((state) => {
          state.todolist.push({
            id: `${uuidv4()}`,
            value: inputValue.value,
            checked: false,
          });
        });

        inputValue.value = '';
        selectType.value = 'ALL';
      };

      const handleDeleteTodo = (id: string) => {
        if (window.confirm('Are you sure to delete todo?')) {
          todoStore.$patch((state) => {
            const index: number = state.todolist.findIndex(
              (item) => item.id === id
            );

            if (index >= 0) {
              state.todolist.splice(index, 1);
            }
          });
        }
      };

      const contextTodolist = computed(() => {
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

      watch(
        () => todolist.value,
        (current) => {
          localStorage.setItem('vue3-todolist', JSON.stringify(current));
        },
        { deep: true }
      );

      return {
        todolist,
        inputValue,
        selectType,
        handleAddTodo,
        handleDeleteTodo,
        contextTodolist,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import '../src/scss/utils/_utils.scss';
</style>
