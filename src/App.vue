<template>
  <div id="app">
    <Todo-header></Todo-header>
    <Todo-input></Todo-input>
    <Todo-list></Todo-list>
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
* {
  margin: 0;
  padding: 0;
}
</style>
