import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchOrdersByCustomerAndDateRange } from '../../services/orders/Orders';

const DebtCalculator = () => {
  const [customerName, setCustomerName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [orderStatus, setOrderStatus] = useState('all');
  const [results, setResults] = useState([]); // مقدار پیش‌فرض به یک آرایه خالی تغییر کرد

  useEffect(() => {
    fetchOrders();
  }, [customerName, startDate, endDate, orderStatus]);

  const fetchOrders = async () => {
    const start = startDate ? startDate.toISOString().split('T')[0] : '';
    const end = endDate ? endDate.toISOString().split('T')[0] : '';

    try {
      const ordersData = await fetchOrdersByCustomerAndDateRange(customerName, start, end, orderStatus);
      setResults(ordersData);
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('خطا در دریافت اطلاعات سفارشات.');
    }
  };

  return (
    <div>
      <h2>محاسبه بدهی مشتریان</h2>
      <div>
        <label>نام مشتری:</label>
        <input
          type="text"
          value={customerName}
          onChange={e => setCustomerName(e.target.value)}
        />
      </div>
      <div>
        <label>زمان شروع:</label>
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          dateFormat="yyyy/MM/dd"
          placeholderText="تاریخ شروع را انتخاب کنید"
          isClearable
        />
      </div>
      <div>
        <label>زمان پایان:</label>
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          dateFormat="yyyy/MM/dd"
          placeholderText="تاریخ پایان را انتخاب کنید"
          isClearable
        />
      </div>
      <div>
        <label>وضعیت سفارش:</label>
        <select value={orderStatus} onChange={e => setOrderStatus(e.target.value)}>
          <option value="all">تمام سفارشات</option>
          <option value="accepted">تایید شده</option>
          <option value="inOrder">در حال انتظار</option>
          <option value="doing">در حال انجام</option>
          <option value="rejected">رد شده</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>نام مشتری</th>
            <th>تعداد سفارشات تایید شده</th>
            <th>جمع مبلغ تایید شده</th>
            <th>تعداد سفارشات در حال انتظار</th>
            <th>جمع مبلغ در حال انتظار</th>
            <th>تعداد سفارشات در حال انجام</th>
            <th>جمع مبلغ در حال انجام</th>
            <th>تعداد سفارشات رد شده</th>
            <th>جمع مبلغ رد شده</th>
            <th>تعداد کل سفارشات</th>
            <th>جمع کل مبلغ</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(results) && results.map((result, index) => (
            <tr key={index}>
              <td>{result.customerName}</td>
              <td>{result.accepted_orders_count}</td>
              <td>{result.accepted_orders_amount}</td>
              <td>{result.inOrder_orders_count}</td>
              <td>{result.inOrder_orders_amount}</td>
              <td>{result.doing_orders_count}</td>
              <td>{result.doing_orders_amount}</td>
              <td>{result.rejected_orders_count}</td>
              <td>{result.rejected_orders_amount}</td>
              <td>{result.total_orders_count}</td>
              <td>{result.total_orders_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DebtCalculator;
