<script setup>
import { ref } from "vue";
import AddTodo from "../components/AddTodo.vue";
import TodoList from "../components/TodoList.vue";

const todoListRef = ref(null);
const refreshTodos = () => {
  alert("New todo added!");
};
</script>
<template>
  <div class="home-container">
    <h1 class="title">Todo Manager</h1>
    <AddTodo @todo-added="refreshTodos" />
    <TodoList ref="todoListRef" />
  </div>
</template>

<style scoped>
.home-container {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.6s ease;
}

.title {
  text-align: center;
  font-size: 2.8rem;
  color: #333333;
  margin-bottom: 30px;
  font-weight: 700;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
