<template>
  <div class="input">
    <input
      type="checkbox"
      class="toggle-complete"
      :class="remains > 0 ? 'selected-all' : ''"
      v-show="this.todoItems.length"
      @click="toggleComplete"
    />
    <input
      type="text"
      class="new-todo"
      placeholder="새로운 할 일을 추가해보세요!"
      autofocus
      v-model="newTodoItem"
      @keydown.enter="addTodo"
    />
    <button id="clear-text" @click="clearInputbox" v-show="newTodoItem">
      <font-awesome-icon :icon="['fas', 'times']"></font-awesome-icon>
    </button>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      newTodoItem: "",
    };
  },
  computed: {
    ...mapGetters(["remains"]),
    ...mapState(["todoItems"]),
  },
  methods: {
    addTodo() {
      if (this.newTodoItem == "") return;
      // 입력된 Text의 앞, 뒤 공백문자 제거
      let value = this.newTodoItem && this.newTodoItem.trim();
      this.pushTodo(value);
      this.clearInputbox();
    },
    clearInputbox() {
      this.newTodoItem = "";
    },
    ...mapMutations(["pushTodo"]),
    ...mapActions(["toggleComplete"]),
  },
};
</script>

<style scoped>
input {
  border: none;
}
input:focus {
  outline: none;
}
button {
  background: none;
  border: none;
  cursor: pointer;
}
.input {
  font-family: "Roboto", sans-serif;
  width: 100%;
  height: 4em;
  display: flex;
  position: relative;

  align-items: center;
  box-sizing: border-box;
  padding: var(--base-space);
  border-bottom: 1px solid var(--shadow-gray);
}

.input > button {
  font-size: var(--font-medium);
  align-items: center;
  text-align: center;
}
.input #toggle-all {
  width: 10%;
  min-width: 40px;
  left: 1rem;
  position: absolute;
}
.input .new-todo {
  width: 80%;
  height: 2rem;
  margin-left: 2.6rem;
  font-size: var(--font-medium);
  padding: 0;
}
#clear-text {
  width: 10%;
  min-width: 40px;
  right: 1rem;
  position: absolute;
  color: var(--shadow-gray);
}
.toggle-complete::before {
  content: "\f00c";
  font-family: "Font Awesome 5 Free";
  font-weight: 700;
  position: absolute;
  cursor: pointer;
  font-size: 1.7rem;
  left: 1rem;
  top: 1rem;

  padding-right: 0.5rem;
  width: 3rem;
  text-align: center;
  background-color: white;
}
.toggle-complete.selected-all {
  color: var(--shadow-gray);
}
@media screen and (max-width: 50rem) {
  .input input[type="text"] {
    font-size: var(--font-small);
  }
}
</style>
