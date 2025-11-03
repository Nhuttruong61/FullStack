import React, { memo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { formatOrdersTrend } from "../../../../helper/formatChart";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LineChartOrders({ data }) {
  const dataFormat = formatOrdersTrend(data);

  const chartData = {
    labels: dataFormat.map((item) => item.name),
    datasets: [
      {
        label: "Số đơn hàng",
        data: dataFormat.map((item) => item.orders),
        borderColor: "#8884d8",
        backgroundColor: "rgba(136, 132, 216, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
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

  return <Line data={chartData} options={options} />;
}

export default memo(LineChartOrders);
