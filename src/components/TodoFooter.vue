<template>
  <div class="footer" v-show="this.todoItems.length">
    <span class="todo-count">
      <strong class="counting">{{ remains }}</strong>
      {{ remains | suffix }} left
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
  filters: {
    // 사용자 지정 filter
    // 이전 filter로 받은 return값이 1이면 item, 아니면 items를 반환
    suffix(n) {
      return n == 1 ? "item" : "items";
    },
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
.footer::after {
  content: "";
  position: absolute;
  left: 1%;
  bottom: -0.6em;
  height: 1em;
  width: 98%;
  border: 1px solid var(--shadow-gray);
  background-color: white;
  z-index: -1;
}
.footer::before {
  content: "";
  position: absolute;
  left: 2%;
  bottom: -1.1em;
  height: 1em;
  width: 96%;
  border: 1px solid var(--shadow-gray);
  background-color: white;
  z-index: -1;
}
.footer span {
  position: absolute;
  height: 1rem;
  display: flex;
  align-items: center;
  margin-top: 0.3rem;
}
.footer .counting {
  margin-right: 0.2rem;
}
.footer .clear-completed {
  position: absolute;
  right: var(--base-space);
  z-index: 1;
  cursor: pointer;
  top: 1.25em;
  line-height: -5px;
}
.footer .filters {
  width: 100%;
  height: 2rem;
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
  border: 3px solid transparent;
  border-radius: 5px;
}
.footer .filters > button:hover {
  border: 3px solid var(--font-color-header);
  box-sizing: border-box;
}
.footer .filters .selected-option {
  border: 3px solid var(--font-color-header);
}

@media screen and (max-width: 40rem) {
  .footer {
    height: 5.5rem;
  }
  .footer span {
    margin-top: 0;
    display: flex;
    align-items: flex-start;
  }
  .footer .filters {
    position: absolute;
    margin-top: var(--base-space);
    display: flex;
    width: 100%;
    justify-content: center;
    box-sizing: border-box;
    bottom: 0.5rem;
  }
}
</style>
