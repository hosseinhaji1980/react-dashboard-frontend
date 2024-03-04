import React from 'react';
import ReactApexChart from 'react-apexcharts';

const BarChart = ({ dataset }) => {
  const options = {
    series: [{
      name: dataset.label || 'Series 1',
      data: dataset.data || []
    }],
    chart: {
      type: 'radialBar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['Customer 1', 'Customer 2', 'Customer 3', 'Customer 4', 'Customer 5', 'Customer 6', 'Customer 7'],
    },
    yaxis: {
      title: {
        text: 'Amount',
      },
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val;
        }
      }
    }
  };

  return (
    <div>
      <ReactApexChart options={options} series={options.series} type="bar" height={350} />
    </div>
  );
}

export default BarChart;
