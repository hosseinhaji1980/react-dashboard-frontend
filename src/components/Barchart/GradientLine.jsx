import React from 'react';
import ReactApexChart from 'react-apexcharts';

const BarChart = ({ dataset }) => {
  
  const chartLabels = dataset.map((item) => item.order_date || ''); // Handle missing order_date
  const chartValues = dataset.map((item) => item.total_sales);
  const colors = Array.from({ length: chartValues.length }, (_, i) =>
    `hsl(${i * 360 / chartValues.length}, 100%, 50%)` // Dynamic color generation
  );

  const options = {
    series: [{
      name: chartLabels || '',
      data: chartValues,
    }],
    annotations: {
      points: [{
        x: 'Bananas',
        seriesIndex: 0,
        label: {
          borderColor: '#775DD0',
          offsetY: 0,
          style: {
            color: '#fff',
            background: '#775DD0',
          },
          text: 'Bananas are good',
        }
      }]
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '50%',
      }
    },
    chart: {
      type: 'radialBar',
      padding: {
        top: 70, // Increased padding for more space
        right: -30,
        bottom: 50,
        left: 30,
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      labels: {
        offsetX: 10,
        style: {
          colors: [],
          fontSize: '14px', // Decreased font size
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'apexcharts-xaxis-label',
        },
      },
      categories: chartLabels,
      rotate: -45
    },
    yaxis: {
      labels: {
        offsetY: 150
      },
      title: {
        text: '',
      },
      labels: {
        formatter: function (value) {
          var val = Math.abs(value);
          if (val >= 1000000) {
            val = (val / 1000000).toFixed(0) + 'میلیون ';
          }
          return val;
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [50, 0, 100]
      }
    },
    tooltip: {
      y: {
        formatter: (val) => `$ ${val.toFixed(2)}` // Format tooltip value (2 decimal places)
      }
    }
  };

  return (
    <div>
      <ReactApexChart options={options} series={options.series} type="bar" />
    </div>
  );
};

export default BarChart;
