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
import { formatRevenueComparison } from "../../../../helper/formatChart";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function RevenueByStatus({ data }) {
  const dataFormat = formatRevenueComparison(data);

  const chartData = {
    labels: dataFormat.map((item) => item.name),
    datasets: [
      {
        label: "Doanh thu",
        data: dataFormat.map((item) => item.revenue),
        backgroundColor: "#82ca9d",
        borderColor: "#5a9e78",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    indexAxis: "x",
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

export default memo(RevenueByStatus);
