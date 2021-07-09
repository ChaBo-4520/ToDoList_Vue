<template>
  <div>
    <ul>
      <li v-for="(todoItem, idx) in todoItems" :key="idx">
        {{ todoItem }}<button @click="removeTodo(todoItem, idx)">X</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["todoItems"]),
  },
  methods: {
    removeTodo(todoItem, index) {
      localStorage.removeItem(todoItem);
      this.todoItems.splice(index, 1);
    },
    ...mapActions(["getList"]),
  },
  created() {
    this.getList();
  },
};
</script>

<style></style>
