<template>
  <div class="footer">
    <span class="todo-count">
      <strong class="counting">0</strong>
      items left
    </span>
    <div class="filters">
      <button class="all selected-option" data-key="option" data-value="all">
        All
      </button>
      <button class="active" data-key="option" data-value="active">
        Active
      </button>
      <button class="completed" data-key="option" data-value="completed">
        Completed
      </button>
    </div>
    <span class="clear-completed">Clear-completed</span>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
