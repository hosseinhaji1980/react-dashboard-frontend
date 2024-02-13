import React from "react";
import { Pie } from "react-chartjs-2";

const labels = ["January", "February", "March", "April", "May", "June"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(153, 102, 255)", "rgb(255, 159, 64)"],
      data: [0, 10, 5, 2, 20, 30],
    },
  ],
};

const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "کارکرد",
      },
      legend: {
        display: true,
        position: 'right',

      },
    },
  };
const PieChart = () => {
  return (
    <div>
      <Pie data={data} options={options}  />
    </div>
  );
};

export default PieChart;
