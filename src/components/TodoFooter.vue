<template>
  <div class="footer" v-show="this.todoItems.length">
    <span class="todo-count">
      <strong class="counting">0</strong>
      items left
    </span>
    <div class="filters">
      <button
        @click="changeVisibility('all')"
        class="all selected-option"
        data-key="option"
        data-value="all"
      >
        All
      </button>
      <button
        @click="changeVisibility('active')"
        class="active"
        data-key="option"
        data-value="active"
      >
        Active
      </button>
      <button
        @click="changeVisibility('completed')"
        class="completed"
        data-key="option"
        data-value="completed"
      >
        Completed
      </button>
    </div>
    <button class="clear-completed" @click="removeCompleted">
      Clear-completed
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["todoItems"]),
  },
  methods: {
    ...mapMutations(["changeVisibility", "removeCompleted"]),
  },
};
</script>

<style></style>
