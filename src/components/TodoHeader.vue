<template>
  <div class="header">
    <h1>Todo List</h1>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.header {
  width: 100%;
  height: 20%;
}
.header > h1 {
  font-family: "Roboto", sans-serif;
  font-size: var(--font-header);
  color: var(--font-color-header);
  font-weight: 100;
  font-size: 7em;
  min-width: var(--outter-min-width);
  text-align: center;
  margin: 0;
  padding: 0;
}

@media screen and (max-width: 48em) {
  .wrapper {
    font-size: 2em;
  }
  .header > h1 {
    font-size: 6em;
  }
}
@media screen and (max-width: 31.25em) {
  .header > h1 {
    font-size: 4.5em;
  }
}
</style>
