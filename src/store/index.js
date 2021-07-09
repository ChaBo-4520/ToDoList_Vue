import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 로컬 스토리지 라이브러리(작은 라이브러리)
var STORAGE_KEY = "todos-vuekr-demo";
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
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

export default new Vuex.Store({
  state: {
    todoItems: [],
  },
  actions: {
    getList() {
      if (localStorage.length > 0) {
        this.commit("setTodos");
      }
    },
  },
  mutations: {
    setTodos(state) {
      for (let i = 0; i < localStorage.length; i++) {
        // dev모드에서 자동으로 저장되는 값 제외(배포모드에는 필요없음)
        if (localStorage.key(i) == "loglevel:webpack-dev-server") continue;
        // localStorage.key(i) => Storage의 n번째 key 이름을 반환한다.
        state.todoItems.push(localStorage.key(i));
      }
    },
    pushTodo(state, newTodo) {
      state.todoItems.push(newTodo);
    },
  },
  modules: {},
});
