import React from 'react';
import ReactApexChart from 'react-apexcharts';

const GradientLine = ({ dataset }) => {
  const options = {
    series: [{
      name: dataset.label || 'series1', // Set a default label if not provided
      data: dataset.data || [] // Set an empty array as default data if not provided
    }],
    chart: {
      toolbar: {
        show: false
      },
      height: 100,
      type: 'area'
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth'
    },
    scales: {
      yAxes: [{
        gridLines: {
          lineWidth: 0,
          color: "rgba(255,255,255,0)"
        }
      }]
    },
    grid: {
      show: false
    },
    xaxis: {
      labels: {
        show: false,
      },
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      labels: {
        show: false,
      },
      tooltip: {
        enabled: false
      }
    }
  };

  return (
    <div>
      <ReactApexChart options={options} series={options.series} type="area" height={100} />
    </div>
  );
}

export default GradientLine;
