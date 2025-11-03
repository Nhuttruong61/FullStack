import React, { memo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { formatPie } from "../../../../helper/formatChart";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function PeiChard({ data }) {
  const dataFormat = formatPie(data);

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

  return <Pie data={chartData} options={options} />;
}

export default memo(PeiChard);
