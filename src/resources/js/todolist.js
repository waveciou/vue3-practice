import '../scss/main.scss';
import '../scss/todolist.scss';

(function(Vue) {
  const { ref, reactive } = Vue;

  const app = {
    template: `
      <div class="todolist">
        <div class="todolist__header">
          <input type="text" v-model="inputValue">
          <button
            class="submit-btn"
            @click.stop="addTodoHandler"
          >submit</button>
        </div>
        <div class="todolist__body">
          <ul class="todolist__list">
            <li v-for="todoItem of todolist" :key="todoItem.id">
              <div class="todolist__item">
                <div class="todolist__title">{{ todoItem.value }}</div>
                <div class="todolist__checkbox">
                  <input
                    type="checkbox"
                    :id="todoItem.id"
                    :checked="todoItem.checked === true"
                    v-model="todoItem.checked"
                  >
                  <label for="todoItem.id"></label>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div>{{ todolist }}</div>
      </div>
    `,
    setup() {
      const inputValue = ref('');
      const todolist = reactive([]);

      const addTodoHandler = () => {
        const date = new Date();

        todolist.push({
          id: `${date.getTime()}`,
          value: inputValue.value,
          checked: false
        });
      };

      return {
        inputValue,
        todolist,
        addTodoHandler
      };
    }
  };
  
  const vm = Vue.createApp(app).mount('#app');
})(Vue);