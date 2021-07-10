<template>
  <div>
    <li v-for="(todoItem, idx) in filteredTodos" :key="idx" class="item">
      <button
        class="checkBox"
        :class="todoItem.completed ? 'completed' : ''"
        :key="idx"
        @click="toggleCompleted(todoItem.id)"
      ></button>
      <label :class="todoItem.completed ? 'completed' : ''">{{
        todoItem.comment
      }}</label>
      <button @click="removeTodo(idx)" class="delete">
        <font-awesome-icon :icon="['fas', 'times']"></font-awesome-icon>
      </button>
      <!-- <input
          type="text"
          class="edit-description display"
          onkeydown="updateItemDescription(event)"
        /> -->
    </li>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState(["todoItems"]),
    ...mapGetters(["filteredTodos"]),
  },
  methods: {
    ...mapActions(["getList"]),
    ...mapMutations(["removeTodo", "toggleCompleted"]),
  },
  created() {
    this.getList();
  },
};
</script>

<style scoped>
.item {
  font-family: "Roboto", sans-serif;
  padding: var(--base-space);
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
.item > label {
  width: 80%;
  padding-left: calc(var(--font-medium) + var(--base-space));
  color: black;
  overflow-x: hidden;
}
.item > .completed {
  color: var(--dark-gray);
  text-decoration: line-through var(--dark-gray);
}
.item > .delete {
  font-size: var(--font-medium);
  margin: 0 auto;
}
</style>
