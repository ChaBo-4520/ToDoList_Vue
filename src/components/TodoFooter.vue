<template>
  <div class="footer" v-show="this.todoItems.length">
    <span class="todo-count">
      <strong class="counting">{{ remains }}</strong>
      items left
    </span>
    <div class="filters">
      <button
        @click="changeVisibility('all')"
        class="all"
        data-key="option"
        data-value="all"
        :class="visibility == 'all' ? 'selected-option' : ''"
      >
        All
      </button>
      <button
        @click="changeVisibility('active')"
        class="active"
        data-key="option"
        data-value="active"
        :class="visibility == 'active' ? 'selected-option' : ''"
      >
        Active
      </button>
      <button
        @click="changeVisibility('completed')"
        class="completed"
        data-key="option"
        data-value="completed"
        :class="visibility == 'completed' ? 'selected-option' : ''"
      >
        Completed
      </button>
    </div>
    <div class="clear-completed" @click="removeCompleted">
      Clear-completed
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState(["todoItems", "visibility"]),
    ...mapGetters(["remains"]),
  },
  methods: {
    ...mapMutations(["changeVisibility", "removeCompleted"]),
  },
};
</script>

<style scoped>
.footer {
  position: relative;
  width: 100%;
  height: 4rem;
  padding: var(--base-space);
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  color: var(--dark-gray);
  font-size: var(--font-small);
}
.footer span {
  height: 1rem;
  display: flex;
  align-items: center;
  margin-top: 0.3rem;
}
.footer .counting {
  margin-right: 0.2rem;
}
.footer .clear-completed {
  z-index: 1;
  cursor: pointer;
}
.footer .filters {
  width: 100%;
  height: 2rem;
  position: absolute;
  left: 0;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  z-index: 0;
}
.footer .filters > button {
  color: var(--dark-gray);
  font-size: var(--font-small);
  margin: 0 0.2rem;
  box-sizing: border-box;
  border: 1px solid transparent;
  border-radius: 5px;
}
.footer .filters > button:hover {
  border: 1px solid black;
  box-sizing: border-box;
}
.footer .filters .selected-option {
  border: 1px solid black;
  background-color: var(--white-gray);
}

@media screen and (max-width: 50rem) {
  .footer {
    height: 5rem;
  }
  .footer span {
    margin-top: 0;
    display: flex;
    align-items: flex-start;
  }
  .footer .filters {
    position: absolute;
    display: flex;
    width: 100%;
    left: 0;
    justify-content: center;
    box-sizing: border-box;
    bottom: 0.5rem;
  }
}
</style>
