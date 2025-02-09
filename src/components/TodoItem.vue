<script setup>
import { ref, computed, watch } from "vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { updateTodo, deleteTodo } from "@/services/api";

const props = defineProps({
  todo: { type: Object, required: true },
});
const emit = defineEmits(["refresh"]);
const queryClient = useQueryClient();

const isEditing = ref(false);
const edited = ref({ ...props.todo });
const localCompleted = ref(props.todo.completed);

watch(
  () => props.todo,
  (newTodo) => {
    edited.value = { ...newTodo };
    localCompleted.value = newTodo.completed;
  }
);

const formattedDate = computed(() =>
  new Date(props.todo.dueDate).toLocaleDateString()
);

const updateMutation = useMutation({
  mutationFn: updateTodo,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
    isEditing.value = false;
  },
});

const deleteMutation = useMutation({
  mutationFn: deleteTodo,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
});

const toggleCompleted = () =>
  updateMutation.mutate({ ...props.todo, completed: localCompleted.value });
const toggleEdit = () => {
  isEditing.value = !isEditing.value;
  if (!isEditing.value) edited.value = { ...props.todo };
};

const updateTodoItem = () => updateMutation.mutate({ ...edited.value });
const deleteTodoItem = () => {
  if (confirm("Are you sure?")) deleteMutation.mutate(props.todo.id);
};
</script>

<template>
  <div class="todo-item">
    <div class="header">
      <h3 :class="{ completed: todo.completed }">{{ todo.title }}</h3>
      <div class="actions">
        <button @click="toggleEdit">{{ isEditing ? "Cancel" : "Edit" }}</button>
        <button @click="deleteTodoItem">Delete</button>
      </div>
    </div>
    <p>{{ todo.description }}</p>
    <div>
      <span>{{ formattedDate }}</span>
      <span>{{ todo.priority }}</span>
      <input
        type="checkbox"
        v-model="localCompleted"
        @change="toggleCompleted"
      />
    </div>
    <div v-if="isEditing">
      <form @submit.prevent="updateTodoItem">
        <input v-model="edited.title" required />
        <textarea v-model="edited.description"></textarea>
        <input v-model="edited.dueDate" type="date" required />
        <select v-model="edited.priority" required>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Save</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.todo-item {
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h3.completed {
  text-decoration: line-through;
  color: #b2bec3;
}
button {
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
input,
textarea,
select {
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
}
</style>
