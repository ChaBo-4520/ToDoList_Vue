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

// filter 함수
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
    remains(state) {
      return filters["active"](state.todoItems).length;
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
    toggleAllComplete({ getters }) {
      // active된 todo가 하나라도있으면 전부 complete처리
      // this.commit("setAllCompleteState", getters.remains != 0);
      if (getters.remains != 0) this.commit("setAllCompleteState", true);
      else this.commit("setAllCompleteState", false);
    },
  },
  mutations: {
    setTodos(state) {
      state.todoItems = todoStorage.fetch();
    },
    removeTodo(state, idx) {
      if (confirm("정말 삭제하시겠습니까?")) {
        state.todoItems.splice(idx, 1);
        alert("삭제되었습니다.");
      }
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
      if (confirm("완료한 항목을 삭제하시겠습니까?")) {
        state.todoItems = filters.active(state.todoItems);
        alert("완료한 항목을 삭제했습니다.");
      }
    },
    toggleCompleted(state, idx) {
      state.todoItems[idx].completed = !state.todoItems[idx].completed;
    },
    setAllCompleteState(state, complete_state) {
      for (let i = 0; i < state.todoItems.length; i++) {
        state.todoItems[i].completed = complete_state;
      }
    },
  },
});
