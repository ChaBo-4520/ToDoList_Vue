<template>
  <div v-b-tooltip.hover class="wrapper" data-html="true" id="manual">
    <font-awesome-icon :icon="['far', 'question-circle']"></font-awesome-icon>
    <b-tooltip target="manual" placement="bottom">
      <div class="content">
        로컬 스토리지를 사용하는 TodoList입니다. <br />
        새로운 할 일을 추가해 사용해보세요! 추가된 항목을 더블클릭하여 내용을
        수정할 수 있습니다.
      </div>
    </b-tooltip>
  </div>
</template>

<script>
export default {
  data() {
    return {
      manual: `
      
      `,
    };
  },
};
</script>

<style scoped>
.wrapper {
  position: relative;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  font-size: 3em;
  color: var(--dark-gray);

  border: 1px solid black;
}

.wrapper > svg {
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
}
b-tooltip {
}
.content {
  text-align: left;
  max-width: 14em;
  height: 14em;
}
@media screen and (max-width: 37.5em) {
  .wrapper {
    font-size: 2em;
  }
}
</style>
