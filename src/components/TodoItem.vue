<!-- <script setup>
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
console.log(edited.value);

const localCompleted = ref(props.todo.completed);

watch(
  () => props.todo,
  (newTodo) => {
    edited.value = { ...newTodo };
    localCompleted.value = newTodo.completed;
  }
);

const formattedDate = computed(() => {
  const d = new Date(props.todo.dueDate);
  return d.toLocaleDateString();
});

const updateMutation = useMutation({
  mutationFn: (updatedTodo) => updateTodo(updatedTodo.id, updatedTodo),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
    isEditing.value = false;

  },
});

const deleteMutation = useMutation({
  mutationFn: (id) => deleteTodo(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
    emit("refresh");
  },
});

const toggleCompleted = () => {
  updateMutation.mutate({ ...props.todo, completed: localCompleted.value });
};

const toggleEdit = () => {
  isEditing.value = !isEditing.value;
  if (!isEditing.value) {
    edited.value = { ...props.todo };
  }
};

const updateTodoItem = () => {
  updateMutation.mutate({ ...edited.value });
};

const deleteTodoItem = () => {
  if (confirm("Are you sure?")) {
    deleteMutation.mutate(props.todo.id);
  }
};
</script>
<template>
  <div class="todo-item">
    <div class="header">
      <h3 :class="{ completed: todo.completed }">{{ todo.title }}</h3>
      <div class="actions">
        <button @click="toggleEdit" class="action-btn edit-btn">
          {{ isEditing ? "Cancel" : "Edit" }}
        </button>
        <button @click="deleteTodoItem" class="action-btn delete-btn">
          Delete
        </button>
      </div>
    </div>
    <p class="description">{{ todo.description }}</p>
    <div class="meta">
      <span class="date">{{ formattedDate }}</span>
      <span class="priority">{{ todo.priority }}</span>
      <label class="completed-label">
        <input
          type="checkbox"
          v-model="localCompleted"
          @change="toggleCompleted"
        />
        Completed
      </label>
    </div>
    <div v-if="isEditing" class="edit-form">
      <form @submit.prevent="updateTodoItem">
        <input v-model="edited.title" required class="form-input" />
        <textarea v-model="edited.description" class="form-textarea"></textarea>
        <input
          v-model="edited.dueDate"
          type="date"
          required
          class="form-input"
        />
        <select v-model="edited.priority" required class="form-select">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit" class="form-button">Save</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.todo-item {
  background: #f9f9f9;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 0.5s ease;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #2d3436;
}
.header h3.completed {
  text-decoration: line-through;
  color: #b2bec3;
}
.actions {
  display: flex;
  gap: 10px;
}
.action-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
  font-size: 0.9rem;
}
.edit-btn {
  background-color: #0984e3;
  color: #fff;
}
.delete-btn {
  background-color: #d63031;
  color: #fff;
}
.description {
  margin: 10px 0;
  color: #636e72;
}
.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #636e72;
  margin-top: 10px;
}
.completed-label {
  display: flex;
  align-items: center;
  gap: 5px;
}
.edit-form {
  margin-top: 15px;
  background-color: #dfe6e9;
  padding: 15px;
  border-radius: 8px;
}
.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}
.form-button {
  background-color: #00b894;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}
.form-button:hover {
  background-color: #55efc4;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> -->
<template>
  <div class="todo-item">
    <div class="todo-header">
      <h3 :class="{ completed: todo.completed }">{{ todo.title }}</h3>
      <div class="todo-actions">
        <button @click="toggleEdit" class="btn edit-btn">
          {{ isEditing ? "Cancel" : "Edit" }}
        </button>
        <button @click="deleteTodoItem" class="btn delete-btn">Delete</button>
      </div>
    </div>
    <p class="todo-description">{{ todo.description }}</p>
    <div class="todo-meta">
      <span class="todo-date">{{ formattedDate }}</span>
      <span class="todo-priority">{{ todo.priority }}</span>
      <label class="todo-completed">
        <input
          type="checkbox"
          v-model="localCompleted"
          @change="toggleCompleted"
        />
        Completed
      </label>
    </div>
    <div v-if="isEditing" class="todo-edit-form">
      <form @submit.prevent="updateTodoItem">
        <input
          v-model="edited.title"
          required
          placeholder="Title"
          class="input"
        />
        <textarea
          v-model="edited.description"
          placeholder="Description"
          class="textarea"
        ></textarea>
        <input type="date" v-model="edited.dueDate" required class="input" />
        <select v-model="edited.priority" required class="select">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit" class="btn save-btn">Save</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { updateTodo, deleteTodo } from "../services/api";

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
  (newVal) => {
    edited.value = { ...newVal };
    localCompleted.value = newVal.completed;
  }
);
const formattedDate = computed(() => {
  const date = new Date(props.todo.dueDate);
  return date.toLocaleDateString();
});
const updateMutation = useMutation({
  mutationFn: (updatedTodo) => updateTodo(updatedTodo.id, updatedTodo),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
    isEditing.value = false;
  },
});
const deleteMutation = useMutation({
  mutationFn: (id) => deleteTodo(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
    emit("refresh");
  },
});
const toggleCompleted = () => {
  updateMutation.mutate({ ...props.todo, completed: localCompleted.value });
};
const toggleEdit = () => {
  isEditing.value = !isEditing.value;
  if (!isEditing.value) {
    edited.value = { ...props.todo };
  }
};
const updateTodoItem = () => {
  updateMutation.mutate({ ...edited.value });
};
const deleteTodoItem = () => {
  if (confirm("Are you sure?")) {
    deleteMutation.mutate(props.todo.id);
  }
};
</script>

<style scoped>
.todo-item {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  animation: fadeIn 0.5s ease;
}
.todo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.todo-header h3 {
  font-size: 1.6rem;
  color: #2c3e50;
  margin: 0;
}
.todo-header h3.completed {
  text-decoration: line-through;
  color: #95a5a6;
}
.todo-actions {
  display: flex;
  gap: 10px;
}
.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s;
}
.edit-btn {
  background-color: #3498db;
  color: #ffffff;
}
.delete-btn {
  background-color: #e74c3c;
  color: #ffffff;
}
.save-btn {
  background-color: #27ae60;
  color: #ffffff;
  width: 100%;
  margin-top: 10px;
}
.todo-description {
  margin: 10px 0;
  color: #7f8c8d;
}
.todo-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-top: 10px;
}
.todo-completed {
  display: flex;
  align-items: center;
  gap: 5px;
}
.todo-edit-form {
  margin-top: 15px;
  background-color: #ecf0f1;
  padding: 15px;
  border-radius: 8px;
}
.input,
.textarea,
.select {
  width: 100%;
  padding: 10px;
  border: 1px solid #bdc3c7;
  border-radius: 6px;
  font-size: 1rem;
  margin-bottom: 10px;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
