<template>
  <v-card class="progress-chart-card">
    <v-card-title>
      <span class="text-h6">Your Learning Progress</span>
    </v-card-title>
    <v-card-subtitle>
      <span class="text-caption"
        >Track your progress across different skills</span
      >
    </v-card-subtitle>
    <v-card-text>
      <div>
        <Line :data="chartData" :options="chartOptions" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "ProgressChart",
  components: {
    Line,
  },
  data() {
    return {
      // Chart data - Modify based on your specific needs
      chartData: {
        labels: ["Vocabulary", "Grammar", "Speaking", "Listening", "Writing"], // Different language skills
        datasets: [
          {
            label: "Your Progress",
            data: [75, 50, 80, 65, 90], // Example progress data
            backgroundColor: "rgba(75, 192, 192, 0.2)", // Light background color
            borderColor: "rgba(75, 192, 192, 1)", // Border color
            borderWidth: 2,
            fill: true, // Fill area under the line
          },
        ],
      },
      // Chart options to customize the chart's appearance and behavior
      chartOptions: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Language Learning Progress",
            font: {
              size: 16,
            },
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.label}: ${tooltipItem.raw}%`;
              },
            },
          },
        },
        scales: {
          y: {
            min: 0,
            max: 100,
            ticks: {
              stepSize: 10,
            },
          },
        },
      },
    };
  },
};
</script>

<style scoped>
.progress-chart-card {
  max-width: 600px;
  margin: 20px auto;
}
</style>
