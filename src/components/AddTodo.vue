<script setup>
import { ref } from "vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { createTodo } from "@/services/api";
const form = ref({
  title: "",
  description: "",
  dueDate: "",
  priority: "medium",
});
const queryClient = useQueryClient();
const emit = defineEmits(["todo-added"]);
const mutation = useMutation({
  mutationFn: (newTodo) => createTodo(newTodo),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
    Object.assign(form.value, {
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
    });
    emit("todo-added");
  },
});
const submit = () => {
  mutation.mutate({ ...form.value, completed: false });
};
</script>

<template>
  <div class="add-todo">
    <h2 class="form-title">Add Todo</h2>
    <form @submit.prevent="submit">
      <input
        v-model="form.title"
        placeholder="Title"
        required
        class="form-input"
      />
      <textarea
        v-model="form.description"
        placeholder="Description"
        class="form-textarea"
      ></textarea>
      <input v-model="form.dueDate" type="date" required class="form-input" />
      <select v-model="form.priority" required class="form-select">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit" :disabled="mutation.isLoading" class="form-button">
        Add Todo
      </button>
    </form>
  </div>
</template>

<style scoped>
.add-todo {
  background: linear-gradient(135deg, #89f7fe, #66a6ff);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  margin-bottom: 30px;
  animation: fadeIn 0.5s ease-in-out;
}
.form-title {
  font-size: 1.8rem;
  color: #ffffff;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
}
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 12px 15px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
}
.form-input,
.form-select {
  background-color: #f0f4f8;
}
.form-textarea {
  background-color: #f7f9fc;
  resize: vertical;
  min-height: 140px;

}
.form-button {
  background-color: #2d3436;
  color: #ffffff;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.form-button:hover {
  background-color: #636e72;
}
.form-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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
