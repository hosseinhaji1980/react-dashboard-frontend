import React, { useState, useEffect } from 'react';
import ApexCharts from 'apexcharts';

const GradientLine = () => {
  const [options, setOptions] = useState({
    series: [{
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100]
    
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
    }
    ,
    scales: {
      cales: {
        yAxes: [{
            gridLines: {
                lineWidth: 0,
                color: "rgba(255,255,255,0)"
            }
        }]
    }
    }  ,
    grid:{
      show: false
     },       
    

    xaxis: {
      labels: {
        show: false,
      }
      ,tooltip:{
        enabled:false
      }
      
    },
  yaxis: {
    labels: {
      show: false,
    }
    ,tooltip:{
      enabled:false
    }
  // },
  //   tooltip: {
  //     x: {
  //       format: 'dd/MM/yy HH:mm'
  //     },
    },
    
  });

  useEffect(() => {
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    
    // Cleanup
    return () => chart.destroy();
  });

  return <div id="chart" />;
}

export default GradientLine;
