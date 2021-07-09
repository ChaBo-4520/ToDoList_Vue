<template>
  <div>
    <ul>
      <li v-for="(todoItem, idx) in filteredTodos" :key="idx">
        <input type="checkbox" v-model="todoItem.completed" />
        <label>{{ todoItem.comment }}</label>
        <button @click="removeTodo(idx)"><i class="fas fa-times"></i></button>
        <!-- <input
          type="text"
          class="edit-description display"
          onkeydown="updateItemDescription(event)"
        /> -->
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

<style scoped></style>
