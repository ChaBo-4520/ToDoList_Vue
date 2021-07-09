import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 로컬 스토리지 라이브러리(작은 라이브러리)
const STORAGE_KEY = "todos-vuekr-demo";
let todoStorage = {
  fetch: function() {
    let todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]" || undefined
    );
    todos.forEach(function(todo, index) {
      todo.id = index;
    });
    todoStorage.uid = todos.length;
    return todos;
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
};
let filters = {
  all: (todos) => todos,
  active: function(todos) {
    return todos.filter(function(todo) {
      return !todo.completed;
    });
  },
  completed: function(todos) {
    return todos.filter(function(todo) {
      return todo.completed;
    });
  },
};

export default new Vuex.Store({
  state: {
    todoItems: [],
    visibility: "all",
  },
  getters: {
    filteredTodos(state) {
      return filters[state.visibility](state.todoItems);
    },
    remaining(state) {
      return filters.active(state.todoItems).length;
    },
  },
  actions: {
    getList() {
      if (localStorage.length > 0) {
        this.commit("setTodos");
      }
    },
    updateStorage({ state }) {
      todoStorage.save(state.todoItems);
    },
  },
  mutations: {
    setTodos(state) {
      state.todoItems = todoStorage.fetch();
    },
    removeTodo(state, idx) {
      state.todoItems.splice(idx, 1);
    },
    pushTodo(state, newTodo) {
      state.todoItems.push({
        id: todoStorage.uid++,
        comment: newTodo,
        completed: false,
      });
    },
    changeVisibility(state, visibility) {
      state.visibility = visibility;
    },
    removeCompleted(state) {
      state.todoItems = filters.active(state.todoItems);
    },
  },
});
