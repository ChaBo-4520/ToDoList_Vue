<template>
  <div id="todo-app">
    <Todo-header></Todo-header>
    <div class="main">
      <Todo-input></Todo-input>
      <div class="items">
        <Todo-list></Todo-list>
      </div>
      <Todo-footer></Todo-footer>
    </div>
    <div class="footer">
      <p id="app-info">Created by Boram Cha</p>
      <a href="https://github.com/ChaBo-4520">
        <i class="fab fa-github"></i> https://github.com/ChaBo-4520
      </a>
    </div>
  </div>
</template>
<script>
import TodoHeader from "./components/TodoHeader.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/TodoFooter.vue";

import { mapState, mapActions } from "vuex";
export default {
  name: "App",
  components: { TodoHeader, TodoInput, TodoList, TodoFooter },
  computed: {
    ...mapState(["todoItems"]),
  },
  methods: {
    ...mapActions(["updateStorage", "getList"]),
  },
  watch: {
    // Vuex의 state에 저장된 todoItems에 변경이 있으면 LocalStorage를 업데이트
    "$store.state.todoItems": {
      handler() {
        this.updateStorage();
      },
      // object나 array의 item변경까지 감지
      deep: true,
    },
  },
  // created될 때, localstorage로 부터 todoList를 받아온다.
  created() {
    this.getList();
  },
};
</script>
<style>
:root {
  /* color */
  --font-color-header: #c8e6c9;
  --shadow-gray: #e6e6e6;
  --white-gray: #f5f5f5;
  --dark-gray: #656565;
  /* space */
  --base-space: 1.1rem;
  /* font-size */
  --font-header: 100px;
  --font-medium: 1.5rem;
  --font-samll: 1.2rem;
  /* width, height */
  --outter-min-width: 26.875rem;
  --inner-max-width: 34.375rem;
  --inner-max-width: 38.375rem;
  --inner-min-width: 21.875rem;
  --response-width: 50rem;
}
* {
  margin: 0;
  padding: 0;
}
html,
body {
  margin: 0;
  padding: 0;
}
input {
  margin: 0.3em;
}
body {
  background-color: var(--white-gray);
  overflow-y: scroll;
}
button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 0.5em;
}
li {
  list-style: none;
}

a {
  color: none;
  text-decoration: none;
}
a:visited {
  color: var(--dark-gray);
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
#todo-app {
  margin: 0 auto;
  width: 100%;
  min-width: var(--outter-min-width);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#todo-app > .main {
  /* 속성 */
  width: 80%;
  min-width: var(--inner-min-width);
  max-width: var(--inner-max-width);
  display: flex;
  flex-direction: column;
  align-items: center;

  /* style */
  background-color: white;
  border-top: 2px solid var(--shadow-gray);
  border-bottom: 2px solid var(--shadow-gray);

  box-shadow: 0 25px 50px 0 rgb(0 0 0 / 10%);
}
.main > .items {
  width: 100%;
}
#todo-app > .footer {
  width: 60%;
  padding-bottom: var(--base-space);
  color: var(--dark-gray);
  text-align: center;
  min-width: var(--inner-min-width);
  max-width: var(--inner-max-width);
}
#todo-app > .footer {
  margin-top: calc(2 * var(--base-space));
}
</style>
