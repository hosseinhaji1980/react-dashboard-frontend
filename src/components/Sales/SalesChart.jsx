// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: 'روز 1', daily: 4000, weekly: 2400, monthly: 2400 },
//   { name: 'روز 2', daily: 3000, weekly: 1398, monthly: 2210 },
//   { name: 'روز 3', daily: 2000, weekly: 9800, monthly: 2290 },
//   { name: 'روز 4', daily: 2780, weekly: 3908, monthly: 2000 },
//   { name: 'روز 5', daily: 1890, weekly: 4800, monthly: 2181 },
//   { name: 'روز 6', daily: 2390, weekly: 3800, monthly: 2500 },
//   { name: 'روز 7', daily: 3490, weekly: 4300, monthly: 2100 },
// ];

// const SalesChart = () => {
//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <LineChart
//         data={data}
//         margin={{
//           top: 10, right: 30, left: 0, bottom: 0,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="daily" stroke="#8884d8" activeDot={{ r: 8 }} />
//         {/* <Line type="monotone" dataKey="weekly" stroke="#82ca9d" />
//         <Line type="monotone" dataKey="monthly" stroke="#ffc658" /> */}
//       </LineChart>
//     </ResponsiveContainer>
//   );
// }

// export default SalesChart;
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import FetchSales from '../../services/sales/fetchSales';

const SalesChart = () => {
  const [data, setData] = useState({
    daily: [],
    weekly: [],
    monthly: [],
    yearly: [],
  });
  const [period, setPeriod] = useState('daily');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FetchSales.getData(period);
        setData((prevData) => ({ ...prevData, [period]: response.data.data }));
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchData();
  }, [period]);

  return (
    <div>
      <div>
        <button onClick={() => setPeriod('daily')}>روزانه</button>
        <button onClick={() => setPeriod('weekly')}>هفتگی</button>
        <button onClick={() => setPeriod('monthly')}>ماهیانه</button>
        <button onClick={() => setPeriod('yearly')}>سالانه</button>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data[period]} 
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="order_date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total_sales" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;
