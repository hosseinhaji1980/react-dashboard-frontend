import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Spin } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, ClockCircleOutlined, CloseOutlined, CheckCircleOutlined } from '@ant-design/icons';
import getOrdersApi from '../../services/orders/getOrdersApi'; // فرض کنید این تابع برای دریافت داده‌ها است
import DeleteOrder from '../../services/orders/DeleteOrderApi'; // فرض کنید این تابع برای حذف سفارش است

const OrdersTableAntd = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // وضعیت لودینگ
  const [selectedOrder, setSelectedOrder] = useState(null); // سفارش انتخاب شده برای حذف
  const [isModalVisible, setIsModalVisible] = useState(false); // وضعیت نمایش مودال

  // تابع برای دریافت داده‌ها از API
  const fetchData = async () => {
    try {
      setLoading(true); // آغاز لودینگ
      const response = await getOrdersApi.getData();
      setOrders(response.data); // ذخیره داده‌ها در state
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false); // پایان لودینگ
    }
  };

  // دریافت داده‌ها هنگام بارگذاری کامپوننت
  useEffect(() => {
    fetchData();
  }, []);

  // کلیک روی دکمه حذف و نمایش مودال تایید
  const handleDeleteClick = (record) => {
    setSelectedOrder(record);
    setIsModalVisible(true);
  };

  // تایید حذف و انجام عملیات حذف
  const handleDeleteConfirm = async () => {
    try {
      if (selectedOrder) {
        await DeleteOrder(selectedOrder.orderid); // فراخوانی API برای حذف
        fetchData(); // بازخوانی داده‌ها پس از حذف
      }
      setIsModalVisible(false);
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  // لغو حذف
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  // فرمت کردن تاریخ و زمان
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return '';
    const [datePart, timePart] = dateTimeString.split(' ');
    return `${timePart} _ ${datePart}`;
  };

  // ستون‌های جدول
  const columns = [
    {
      title: 'کد محصول',
      dataIndex: 'productcode',
      key: 'productcode',
      align: 'center',
    },
    {
      title: 'پلتفرم',
      dataIndex: 'platform',
      key: 'platform',
      align: 'center',
    },
    {
      title: 'نام کاربر',
      dataIndex: 'username',
      key: 'username',
      align: 'center',
    },
    {
      title: 'ایمیل',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
    },
    {
      title: 'شماره سفارش',
      dataIndex: 'orderid',
      key: 'orderid',
      align: 'center',
    },
    {
      title: 'زمان تایید سفارش',
      dataIndex: 'dateaccept',
      key: 'dateaccept',
      render: (text) => formatDateTime(text),
      align: 'center',
    },
    {
      title: 'زمان تکمیل سفارش',
      dataIndex: 'ordercompletiontime',
      key: 'ordercompletiontime',
      render: (text) => formatDateTime(text),
      align: 'center',
    },
    {
      title: 'زمان ثبت سفارش',
      dataIndex: 'orderdate',
      key: 'orderdate',
      render: (text) => formatDateTime(text),
      align: 'center',
    },
    {
      title: 'وضعیت سفارش',
      dataIndex: 'orderstatus',
      key: 'orderstatus',
      render: (status) => {
        let color = '', icon = null, text = '';
        switch (status) {
          case 'accepted':
            text = 'تکمیل شده';
            color = '#77d2b3';
            icon = <CheckOutlined />;
            break;
          case 'inOrder':
            text = 'در انتظار تایید';
            color = '#ffeb3b';
            icon = <ClockCircleOutlined />;
            break;
          case 'doing':
            text = 'در حال انجام';
            color = '#2196f3';
            icon = <CheckCircleOutlined />;
            break;
          case 'rejected':
            text = 'رد شده';
            color = '#f44336';
            icon = <CloseOutlined />;
            break;
          default:
            text = 'نامشخص';
        }
        return (
          <div style={{ backgroundColor: color, textAlign: 'center', padding: '5px', borderRadius: '4px' }}>
            {icon} {text}
          </div>
        );
      },
      align: 'center',
    },

  ];

  return (
    <Spin spinning={loading}>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="orderid"
        pagination={{ pageSize: 10 }}
        style={{ fontFamily: 'shabnam' }}
      />

     
    </Spin>
  );
};

export default OrdersTableAntd;
