<template>
  <div id="todo-app">
    <Todo-header></Todo-header>
    <div class="main">
      <Todo-input></Todo-input>
      <Todo-list></Todo-list>
    </div>
    <Todo-footer></Todo-footer>
  </div>
</template>
<script>
import TodoHeader from "./components/TodoHeader.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/TodoFooter.vue";

import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "App",
  components: { TodoHeader, TodoInput, TodoList, TodoFooter },
  computed: {
    ...mapState(["todoItems"]),
  },
  methods: {
    ...mapActions(["updateStorage"]),
    ...mapMutations(["setTodos"]),
  },
  watch: {
    "$store.state.todoItems": {
      handler() {
        this.updateStorage();
      },
      deep: true,
    },
  },
  created() {
    this.setTodos();
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
  --inner-min-width: 21.875rem;
  --response-width: 50rem;
}
html,
body {
  margin: 0;
  padding: 0;
}
body {
  background-color: var(--white-gray);
}
#todo-app {
  margin: 0 auto;
  width: 100vw;
  min-width: var(--outter-min-width);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#todo-app > .main {
  /* 속성 */
  width: 60%;
  min-width: var(--inner-min-width);
  max-width: var(--inner-max-width);
  display: flex;
  flex-direction: column;
  align-items: center;

  /* style */
  background-color: white;
  border-top: 1px solid var(--shadow-gray);
  box-shadow: 0px 2px 3px 2px var(--shadow-gray);
}
</style>
