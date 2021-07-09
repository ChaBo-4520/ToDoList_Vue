<template>
  <div>
    <li v-for="(todoItem, idx) in filteredTodos" :key="idx" class="item">
      <input type="checkbox" v-model="todoItem.completed" />
      <label>{{ todoItem.comment }}</label>
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
    ...mapMutations(["removeTodo"]),
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
.item > label {
  width: 80%;
  padding-left: calc(var(--font-medium) + var(--base-space));
}
.item > .delete {
  font-size: var(--font-medium);
  margin: 0 auto;
}
</style>
