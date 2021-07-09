<template>
  <div>
    <ul>
      <li v-for="(todoItem, idx) in filteredTodos" :key="idx">
        <th>{{ todoItem.id }}</th>
        <td>{{ todoItem.comment }}</td>
        <button @click="removeTodo(idx)">X</button>
      </li>
    </ul>
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

<style></style>
