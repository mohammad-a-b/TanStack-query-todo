<script setup>
import { ref, watch, onMounted } from "vue";
import Chart from "chart.js/auto";
import { useQuery } from "@tanstack/vue-query";
import { fetchTodos } from "../services/api";

const chartCanvas = ref(null);
const chartInstance = ref(null);
const { data: todos } = useQuery({
  queryKey: ["todos"],
  queryFn: fetchTodos,
});

const renderChart = () => {
  if (chartInstance.value) chartInstance.value.destroy();
  const completed = todos.value?.filter((todo) => todo.completed).length || 0;
  const pending = (todos.value?.length || 0) - completed;
  const ctx = chartCanvas.value.getContext("2d");
  chartInstance.value = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Completed", "Pending"],
      datasets: [
        {
          data: [completed, pending],
          backgroundColor: ["#2ecc71", "#e74c3c"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            font: { size: 14 },
            color: "#333333",
          },
        },
      },
    },
  });
};

onMounted(() => {
  if (todos.value) renderChart();
});
watch(todos, (newVal) => {
  if (newVal) renderChart();
});
</script>
<template>
  <div class="dashboard-container">
    <h2 class="dashboard-title">Dashboard</h2>
    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.6s ease;
}

.dashboard-title {
  text-align: center;
  font-size: 2.5rem;
  color: #333333;
  margin-bottom: 30px;
  font-weight: 600;
}

.chart-container {
  max-width: 500px;
  margin: 0 auto;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
