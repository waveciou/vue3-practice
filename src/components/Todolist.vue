<template>
  <div class="todolist">
    <div class="todolist__header">
      <input
        v-model.trim="inputValue"
        class="todolist__input"
        type="text"
        placeholder="Please enter your todo item"
      />
      <button class="btn submit-btn" @click.stop="addTodoHandler">
        Add Todo
      </button>
    </div>
    <div class="todolist__body">
      <div v-if="todolist.length > 0" class="todolist__types-control">
        <button
          class="btn select-btn"
          :class="{
            'current': todoType !== 'UNCHECKED' && todoType !== 'CHECKED',
          }"
          @click.stop="todoType = 'ALL'"
        >
          ALL
        </button>
        <button
          class="btn select-btn"
          :class="{ 'current': todoType === 'CHECKED' }"
          @click.stop="todoType = 'CHECKED'"
        >
          CHECKED
        </button>
        <button
          class="btn select-btn"
          :class="{ 'current': todoType === 'UNCHECKED' }"
          @click.stop="todoType = 'UNCHECKED'"
        >
          UNCHECKED
        </button>
      </div>
      <ul class="todolist__list">
        <li v-for="todoItem of todolistByTypes" :key="todoItem.id">
          <div class="todolist__item">
            <div class="todolist__checkbox">
              <input
                :id="todoItem.id"
                v-model="todoItem.checked"
                type="checkbox"
                :checked="todoItem.checked === true"
              />
              <label :for="todoItem.id"></label>
            </div>
            <div class="todolist__title">{{ todoItem.value }}</div>
            <button
              class="delete-btn"
              @click.stop="deleteTodoHandler(todoItem.id)"
            ></button>
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

  .todolist {
    width: 100%;
    margin: auto;
  }

  .todolist__header {
    margin: 1.5rem 0;
    display: flex;
    align-items: center;

    @include min-width(640px + 20px) {
      margin-top: 2rem;
      margin-bottom: 2rem;
    }
  }

  .todolist__input {
    width: 100%;
    height: 40px;
    padding: 5px 12px;
    margin: 0;
    display: inline-block;
    position: relative;
    font-size: 1rem;
    color: $color-blue-green;
    background-color: $color-white;
    border: 1px $color-white solid;
    border-radius: 5px;
    outline: none;
    transform: translateZ(0);
    line-height: 30px;
    letter-spacing: 1px;
    flex-grow: 1;
    flex-basis: 0;
    appearance: none;
  }

  .btn {
    height: 40px;
    padding: 10px;
    line-height: 20px;
    color: $color-white;
    background-color: $color-blue-green;
    border-radius: 5px;
  }

  .submit-btn {
    margin-left: 10px;
  }

  .delete-btn {
    position: absolute;
    top: 10px;
    right: 10px;

    &::before {
      @include font-awesome;

      content: '\f00d';
      width: 15px;
      height: 15px;
      display: block;
      font-size: 15px;
      color: $color-blue-green;
      line-height: 15px;
    }
  }

  .todolist__list {
    > li {
      margin-bottom: 1rem;
    }
  }

  .todolist__item {
    padding: 10px 30px 10px 10px;
    display: flex;
    align-items: baseline;
    position: relative;
    background-color: $color-white;
    border: 1px $color-white solid;
    border-radius: 3px;
  }

  .todolist__checkbox {
    input {
      width: 0;
      height: 0;
      position: absolute;
      opacity: 0;
      visibility: none;
      z-index: -9999;

      &:checked + label::before {
        color: $color-blue-green;
      }
    }

    label::before {
      @include font-awesome;

      content: '\f00c';
      width: 15px;
      height: 15px;
      margin-right: 10px;
      display: block;
      font-size: 80%;
      text-align: center;
      color: $color-white;
      background-color: $color-white;
      border: 1px $color-gray solid;
      border-radius: 3px;
      line-height: 15px;
      cursor: pointer;
      box-sizing: border-box;
    }
  }

  .todolist__title {
    word-break: break-all;
  }

  .todolist__types-control {
    width: 100%;
    display: flex;
    align-items: center;
    overflow-x: auto;
    overflow-y: hidden;
    margin-bottom: 1rem;

    @include min-width(640px + 20px) {
      justify-content: center;
    }
  }

  .select-btn {
    min-width: 120px;
    margin: 0 5px;
    text-align: center;

    @include min-width(640px + 20px) {
      margin-right: 7px;
      margin-left: 7px;
    }

    &.current {
      color: $color-yellow;
    }
  }
</style>
