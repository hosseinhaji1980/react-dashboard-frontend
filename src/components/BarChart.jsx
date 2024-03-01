import {React,useState,useEffect} from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
  const labels = ["January", "February", "March", "April", "May", "June"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };
  return (
    <div>
      <Bar data={data} />
    </div>
  );
};
// const BarChart = ({ series, updateSeries }) => {
//   console.log(series); // Optional for debugging
//   const [chartData, setChartData] = useState({}); // Initialize with an empty object

//   useEffect(() => {
//     if (!series) return; // Early exit if series is undefined

//     const datasets = series.map((serie) => ({
//       label: serie.label,
//       backgroundColor: serie.backgroundColor,
//       borderColor: serie.borderColor,
//       data: serie.data,
//     }));

//     const labels = (series[0] && series[0].data) // Handle empty labels array
//       ? series[0].data.map((_, i) => i + 1) // Create labels if data exists
//       : []; // Otherwise, set an empty array

//     setChartData({ labels, datasets });
//   }, [series]);

//   return (
//     <div>
//       {chartData.labels.length > 0 && <Bar data={chartData} />} // Render only if labels exist
//     </div>
//   );
// };

export default BarChart;
