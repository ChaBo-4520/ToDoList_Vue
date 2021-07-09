<template>
  <div>
    <input type="text" v-model="newTodoItem" />
    <button @click="addTodo">추가</button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      newTodoItem: "",
    };
  },
  methods: {
    addTodo() {
      if (this.newTodoItem == "") return;
      // 입력된 Text의 앞, 뒤 공백문자 제거
      let value = this.newTodoItem && this.newTodoItem.trim();
      this.pushTodo(value);
      this.clearInputbox();
    },
    clearInputbox() {
      this.newTodoItem = "";
    },
    ...mapMutations(["pushTodo"]),
  },
};
</script>

<style></style>
