<template>
  <div>
    <li
      v-for="(todoItem, idx) in filteredTodos"
      :key="idx"
      class="item"
      :class="{
        completed: todoItem.completed,
        editing: todoItem.id == cachedId,
      }"
      @dblclick="editTodo(todoItem)"
    >
      <button
        class="checkBox"
        :class="todoItem.completed ? 'completed' : ''"
        :key="idx"
        @click="toggleCompleted(todoItem.id)"
      ></button>
      <div class="content">
        <label :class="todoItem.completed ? 'completed' : ''"
          >{{ todoItem.comment }}
        </label>
        <input
          class="edit"
          type="text"
          v-todo-focus="todoItem.id == cachedId"
          v-model="todoItem.comment"
          @keydown.enter="doneEdit(todoItem)"
          @keydown.esc="cancelEdit(todoItem)"
          @blur="doneEdit(todoItem)"
          autofocus
        />
      </div>
      <button @click="removeTodo(idx)" class="delete">
        <font-awesome-icon :icon="['fas', 'times']"></font-awesome-icon>
      </button>
    </li>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      cachedId: null,
      cachedComment: "",
    };
  },
  computed: {
    ...mapState(["todoItems"]),
    ...mapGetters(["filteredTodos"]),
  },
  methods: {
    editTodo(todo) {
      this.cachedId = todo.id;
      this.cachedComment = todo.comment;
    },
    doneEdit(todo) {
      this.cachedId = null;
      todo.comment = todo.comment.trim();
      if (!todo.comment) {
        this.cancelEdit(todo);
      }
    },
    cancelEdit(todo) {
      this.cachedId = null;
      todo.comment = this.cachedComment;
    },
    ...mapActions(["getList"]),
    ...mapMutations(["removeTodo", "toggleCompleted"]),
  },
  directives: {
    "todo-focus": function(el, binding) {
      if (binding.value) {
        el.focus();
      }
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style scoped>
.item {
  width: 100%;
  height: 2.9em;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  font-size: var(--font-medium);
  display: flex;
  position: relative;
  border: 1px solid var(--shadow-gray);
  align-items: center;
}
.item > .checkBox::before {
  content: "\f111";
  font-family: "Font Awesome 5 Free";
  font-weight: 400;
  position: absolute;
  cursor: pointer;

  font-size: 2.5rem;
  left: 1.2rem;
  top: 0.6rem;
  text-align: center;
  background-color: white;
  border-radius: 50%;
}
.item > .checkBox.completed::before {
  content: "\f058";
  font-family: "Font Awesome 5 Free";
  font-weight: 300;
  position: absolute;

  font-size: 2.5rem;
  left: 1.2rem;
  top: 0.6rem;
  text-align: center;
  color: black;
}
.item > .completed {
  color: var(--dark-gray);
  text-decoration: line-through var(--dark-gray);
}
.item > .delete {
  position: absolute;
  right: 0;
  width: 2em;
  font-size: var(--font-medium);
  display: none;
}
.item:hover > .delete {
  display: block;
}
.item .content {
  position: absolute;
  display: flex;
  align-items: center;
  height: 100%;
  width: 65%;
  margin-left: 3em;
}
.item .content > label {
  display: block;
  position: absolute;
  width: 100%;
  height: 1.6em;
  color: black;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item .content .edit {
  font-family: "Roboto", sans-serif;
  font-size: var(--font-medium);
  position: absolute;
  width: 100%;
  height: 100%;
  padding-left: calc(var(--base-space) / 5);
  box-sizing: border-box;
  background-color: white;
  margin: 0;
  border: 1px solid black;
  display: none;
}
.item.editing .edit {
  display: inline;
}
</style>
