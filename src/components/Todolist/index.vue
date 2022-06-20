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
        title="Add Todo"
        @click.stop="handleAddTodo"
      >
        Add Todo
      </button>
    </div>
    <div>
      <TodoNav
        v-if="todolist.length > 0"
        :selected="selected"
        @select="handleSetSelected"
      />
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
  import TodoNav from './todoNav.vue';
  import TodoItem from './todoItem.vue';

  type TSelected = 'ALL' | 'CHECKED' | 'UNCHECKED';

  export default defineComponent({
    name: 'Todolist',
    components: {
      'TodoNav': TodoNav,
      'TodoItem': TodoItem,
    },
    setup() {
      const todoStore = useTodoStore();
      const { todolist } = storeToRefs(todoStore);

      const inputValue = ref<string>('');
      const selected = ref<TSelected>('ALL');

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

      const handleSetSelected = (payload: TSelected) => {
        selected.value = payload;
      };

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
        selected.value = 'ALL';
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
        const type: TSelected = selected.value;

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
        selected,
        handleSetSelected,
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
