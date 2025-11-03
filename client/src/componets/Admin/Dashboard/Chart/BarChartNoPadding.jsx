import React, { memo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { formatBarChartNoPadding } from "../../../../helper/formatChart";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChartNoPadding({ data }) {
  const dataFormat = formatBarChartNoPadding(data);

  const chartData = {
    labels: dataFormat.map((item) => item.name),
    datasets: [
      {
        label: "Doanh thu",
        data: dataFormat.map((item) => item.revenue),
        backgroundColor: "#8884d8",
        borderColor: "#0056b3",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

export default memo(BarChartNoPadding);
