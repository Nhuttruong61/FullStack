import React, { memo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { formatPaymentMethod } from "../../../../helper/formatChart";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#0088FE"];

function PaymentMethodChart({ data }) {
  const dataFormat = formatPaymentMethod(data);

  const chartData = {
    labels: dataFormat.map((item) => item.name),
    datasets: [
      {
        data: dataFormat.map((item) => item.value),
        backgroundColor: COLORS,
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
}

export default memo(PaymentMethodChart);
