<template>
  <div class="app-container">
    <h1 class="app-title">Todo Manager</h1>
    <AddTodo @todo-added="refreshTodos" />
    <TodoList />
  </div>
</template>

<script setup>
import TodoList from "./components/TodoList.vue";
import AddTodo from "./components/AddTodo.vue";

const refreshTodos = () => {
  alert("Todo added!");
};
</script>


<style scoped>
.app-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 40px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}
.app-title {
  text-align: center;
  font-size: 2.5rem;
  color: #2d3436;
  margin-bottom: 30px;
 
}
</style>
