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
// 적용된 filter에 따라 filter가 적용된 todos를 리턴해준다.
let filters = {
  all: function(todos) {
    return todos;
  },
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
    // 실제 todoList
    todoItems: [],
    // 적용된 필터(String)
    visibility: "all",
  },
  getters: {
    // filter가 적용된 todoList
    filteredTodos(state) {
      return filters[state.visibility](state.todoItems);
    },
    // active상태인 todo의 개수
    remains(state) {
      return filters["active"](state.todoItems).length;
    },
    numberOfCompleted(state) {
      return filters["completed"](state.todoItems).length;
    },
  },
  actions: {
    // LocalStorage로부터 Todo를 받아오는 명령
    getList() {
      if (localStorage.length > 0) {
        this.commit("setTodos");
      }
    },
    // LocalStorage을 현재 state에 저장된 값으로 갱신시켜준다.
    updateStorage({ state }) {
      todoStorage.save(state.todoItems);
    },

    // 모든 항목의 complete상태를 전환시킨다.
    toggleAllComplete({ getters }) {
      // active된 todo가 하나라도있으면 전부 complete처리
      // this.commit("setAllCompleteState", getters.remains != 0);
      if (getters.remains != 0) this.commit("setAllCompleteState", true);
      else this.commit("setAllCompleteState", false);
    },
  },
  mutations: {
    // LocalStorage로 부터 todo를 받아와 state에 저장 시킴
    setTodos(state) {
      state.todoItems = todoStorage.fetch();
    },
    // state의 todoList에서 해당 항목을 삭제시킴
    removeTodo(state, idx) {
      if (confirm("정말 삭제하시겠습니까?")) {
        state.todoItems.splice(idx, 1);
        alert("삭제되었습니다.");
      }
    },
    // todoList에 새 항목을 추가시킴
    pushTodo(state, newTodo) {
      state.todoItems.push({
        id: todoStorage.uid++,
        comment: newTodo,
        completed: false,
      });
    },
    // 선택한 filter에 따라 state의 filter값을 변경시켜줌
    changeVisibility(state, visibility) {
      state.visibility = visibility;
    },
    // 완료한 항목을 삭제시킴
    // todoItems값을 active된 Items만 남기도록 갱신함
    removeCompleted(state) {
      if (confirm("완료한 항목을 삭제하시겠습니까?")) {
        state.todoItems = filters.active(state.todoItems);
        alert("완료한 항목을 삭제했습니다.");
      }
    },
    // complete상태를 전환시킴
    toggleCompleted(state, idx) {
      state.todoItems[idx].completed = !state.todoItems[idx].completed;
    },
    // 모든 complete상태를 complete_state로 전환시킨다.
    setAllCompleteState(state, complete_state) {
      for (let i = 0; i < state.todoItems.length; i++) {
        state.todoItems[i].completed = complete_state;
      }
    },
  },
});
