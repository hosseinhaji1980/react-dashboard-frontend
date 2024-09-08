import React, { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import FetchSales from './../services/sales/fetchSales';

const LineChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Sales Data",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [],
      },
    ],
  });

  const [period, setPeriod] = useState('daily');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FetchSales.getData(period);
        const salesData = response.data.data;

        // Assuming the response contains an array of objects with date and sales properties
        const labels = salesData.map(item => item.order_date);
        const sales = salesData.map(item => item.total_sales);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "میزان فروش",
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(255, 99, 132)",
              data: sales,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchData();
  }, [period]);
  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 13,
            family: 'shabnam',
            style: 'normal',
            weight: 'normal'
          },
          color: 'blue' 
        }
      },
      tooltip: {
        bodyFont: {
          size: 12,
          family: 'shabnam',
          style: 'normal',
          weight: 'normal'
        },
        titleFont: {
          size: 13,
          family: 'shabnam',
          style: 'bold',
          weight: 'bold'
        },
        footerFont: {
          size: 12,
          family: 'shabnam',
          style: 'normal',
          weight: 'light'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 13,
            family: 'shabnam',
            style: 'normal',
            weight: 'normal'
          },
          color: 'blue' 
        }
      },
      y: {
        ticks: {
          font: {
            size: 13,
            family: 'shabnam',
            style: 'normal',
            weight: 'normal'
          },
          color: 'blue' // You can also set the color of the font
        }
      }
    }
  };
  return (
    <div>
      <div className='mt-2 rounded '>
        <h4>میزان فروش</h4>
        <label>دوره زمانی: </label>
        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="daily">روزانه</option>
          <option value="weekly">هفتگی</option>
          <option value="monthly">ماهیانه</option>
        </select>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
