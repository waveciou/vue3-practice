// import '../scss/main.scss';
// import '../scss/todolist.scss';

(function (Vue) {
  const { ref, reactive, computed } = Vue;

  const app = {
    template: `
      <div class="todolist">
        <div class="todolist__header">
          <input
            class="todolist__input"
            type="text"
            placeholder="Please enter your todo item"
            v-model.trim="inputValue"
          >
          <button
            class="btn submit-btn"
            @click.stop="addTodoHandler"
          >Add Todo</button>
        </div>
        <div class="todolist__body">
          <div
            v-if="todolist.length > 0"
            class="todolist__types-control"
          >
            <button
              class="btn select-btn"
              :class="{'current': todoType !== 0 && todoType !== 1}"
              @click.stop="todoType = 2"
            >ALL</button>
            <button
              class="btn select-btn"
              :class="{'current': todoType === 1}"
              @click.stop="todoType = 1"
            >CHECKED</button>
            <button
              class="btn select-btn"
              :class="{'current': todoType === 0}"
              @click.stop="todoType = 0"
            >UNCHECKED</button>
          </div>
          <ul class="todolist__list">
            <li v-for="todoItem of todolistByTypes" :key="todoItem.id">
              <div class="todolist__item">
                <div class="todolist__checkbox">
                  <input
                    type="checkbox"
                    :id="todoItem.id"
                    :checked="todoItem.checked === true"
                    v-model="todoItem.checked"
                  >
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
    `,
    setup() {
      const inputValue = ref('');
      const todolist = reactive([]);
      const todoType = ref('2');

      const addTodoHandler = () => {
        if (inputValue.value === '') {
          alert('Please enter something text.');
          return false;
        }

        const date = new Date();

        todolist.push({
          id: `todoitem_${date.getTime()}`,
          value: inputValue.value,
          checked: false,
        });

        inputValue.value = '';
        todoType.value = 2;
      };

      const deleteTodoHandler = (id) => {
        const index = todolist.findIndex((element) => element.id === id);
        if (index < 0) return false;
        todolist.splice(index, 1);
      };

      const todolistByTypes = computed(() => {
        const type = todoType.value;
        return todolist.filter((todoItem) => {
          if (type === 0) {
            return todoItem.checked === false;
          } else if (type === 1) {
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
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const vm = Vue.createApp(app).mount('#app');
})(Vue);
