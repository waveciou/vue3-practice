import { defineStore } from 'pinia';

export interface ITodoItem {
  id: string;
  value: string;
  checked: boolean;
}

interface ITodoStore {
  todolist: ITodoItem[];
}

export const useTodoStore = defineStore({
  id: 'todo',
  state: (): ITodoStore => {
    return {
      todolist: [],
    };
  },
  actions: {
    ADD_TODO_ACTION(payload: ITodoItem) {
      this.todolist.push(payload);
    },
    DELETE_TODO_ACTION(id: string) {
      const index: number = this.todolist.findIndex((item) => item.id === id);

      if (index >= 0) {
        this.todolist.splice(index, 1);
      }
    },
  },
});
