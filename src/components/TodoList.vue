<script setup>
import { ref, computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { fetchTodos } from "@/services/api";
import TodoItem from "./TodoItem.vue";

const filter = ref("all");
const { data, isLoading, isError, refetch } = useQuery({
  queryKey: ["todos"],
  queryFn: fetchTodos,
  staleTime: 60000,
});

const filteredTodos = computed(() =>
  filter.value === "all"
    ? data.value || []
    : (data.value || []).filter((t) => t.completed)
);

defineExpose({ refresh: refetch });
</script>

<template>
  <div class="todo-list">
    <div class="filters">
      <button @click="filter = 'all'" :class="{ active: filter === 'all' }">
        All
      </button>
      <button
        @click="filter = 'completed'"
        :class="{ active: filter === 'completed' }"
      >
        Completed
      </button>
    </div>
    <div v-if="isLoading" class="status-message">Loading...</div>
    <div v-if="isError" class="status-message">Error loading todos.</div>
    <ul v-if="filteredTodos.length" class="todo-items">
      <li v-for="todo in filteredTodos" :key="todo.id">
        <TodoItem :todo="todo" @refresh="refetch" />
      </li>
    </ul>
    <div v-else class="status-message">No todos found.</div>
  </div>
</template>

<style scoped>
.todo-list {
  background: #ffffff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.5s ease-in-out;
}
.filters {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}
.filters button {
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background-color: #dfe6e9;
  color: #2d3436;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.filters button.active {
  background-color: #2d3436;
  color: #ffffff;
}
.status-message {
  text-align: center;
  color: #636e72;
  font-size: 1.1rem;
}
.todo-items {
  list-style: none;
  padding: 0;
  margin: 0;
}
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
