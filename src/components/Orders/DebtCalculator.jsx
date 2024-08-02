import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchOrdersByCustomerAndDateRange } from '../../services/orders/Orders';

const DebtCalculator = () => {
  const [customerName, setCustomerName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [orderStatus, setOrderStatus] = useState('all');
  const [report, setReport] = useState({
    accepted: 0,
    inOrder: 0,
    doing: 0,
    rejected: 0,
    total: 0
  });
  const [customerFullName, setCustomerFullName] = useState('');

  const calculateDebt = async () => {
    if (!customerName || !startDate || !endDate) {
      alert('لطفاً نام مشتری و تاریخ شروع و پایان را انتخاب کنید.');
      return;
    }

    const start = startDate.toISOString().split('T')[0];
    const end = endDate.toISOString().split('T')[0];

    try {
      const ordersData = await fetchOrdersByCustomerAndDateRange(customerName, start, end, orderStatus);
      console.log(ordersData);

      if (!ordersData || !Array.isArray(ordersData) || ordersData.length === 0) {
        alert('هیچ سفارشی یافت نشد.');
        return;
      }

      let newReport = { accepted: 0, inOrder: 0, doing: 0, rejected: 0, total: 0 };

      if (ordersData.length > 0) {
        setCustomerFullName(ordersData[0].customerName);

        if (orderStatus === 'all') {
          newReport = {
            accepted: parseInt(ordersData[0].accepted_orders, 10) || 0,
            inOrder: parseInt(ordersData[0].inOrder_orders, 10) || 0,
            doing: parseInt(ordersData[0].doing_orders, 10) || 0,
            rejected: parseInt(ordersData[0].rejected_orders, 10) || 0,
            total: (
              (parseInt(ordersData[0].accepted_orders, 10) || 0) +
              (parseInt(ordersData[0].inOrder_orders, 10) || 0) +
              (parseInt(ordersData[0].doing_orders, 10) || 0) +
              (parseInt(ordersData[0].rejected_orders, 10) || 0)
            )
          };
        } else {
          if (orderStatus === 'accepted') newReport.accepted = parseInt(ordersData[0].accepted_orders, 10) || 0;
          if (orderStatus === 'inOrder') newReport.inOrder = parseInt(ordersData[0].inOrder_orders, 10) || 0;
          if (orderStatus === 'doing') newReport.doing = parseInt(ordersData[0].doing_orders, 10) || 0;
          if (orderStatus === 'rejected') newReport.rejected = parseInt(ordersData[0].rejected_orders, 10) || 0;
          newReport.total = newReport.accepted + newReport.inOrder + newReport.doing + newReport.rejected;
        }
      }

      setReport(newReport);
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
        />
      </div>
      <div>
        <label>زمان پایان:</label>
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          dateFormat="yyyy/MM/dd"
          placeholderText="تاریخ پایان را انتخاب کنید"
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
      <button onClick={calculateDebt}>محاسبه بدهی</button>
      <div>
        <h3>نتایج:</h3>
        <p>نام مشتری: {customerFullName}</p>
        <p>مبلغ سفارشات تایید شده: {report.accepted} تومان</p>
        <p>مبلغ سفارشات در حال انتظار: {report.inOrder} تومان</p>
        <p>مبلغ سفارشات در حال انجام: {report.doing} تومان</p>
        <p>مبلغ سفارشات رد شده: {report.rejected} تومان</p>
        <p>جمع کل سفارشات: {report.total} تومان</p>
      </div>
    </div>
  );
};

export default DebtCalculator;
