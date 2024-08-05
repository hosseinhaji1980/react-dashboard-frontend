import './../../css/Dashboard.css'; // فایل CSS برای استایل‌دهی اضافه شده است




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
    <div className="chart-container">
      <div className="button-container">
        <button onClick={() => setPeriod('daily')}>روزانه</button>
        <button onClick={() => setPeriod('weekly')}>هفتگی</button>
        <button onClick={() => setPeriod('monthly')}>ماهیانه</button>
        <button onClick={() => setPeriod('yearly')}>سالانه</button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data[period]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="order_date" tick={{ angle: -45, textAnchor: 'end' }} height={60} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total_sales" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
