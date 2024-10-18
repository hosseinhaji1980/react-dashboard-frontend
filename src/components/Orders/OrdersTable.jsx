import React, { useState, useEffect } from 'react';
import { Table, Input, Spin, Modal } from 'antd';
import { CheckOutlined, ClockCircleOutlined, CloseOutlined, CheckCircleOutlined } from '@ant-design/icons';
import getOrdersApi from '../../services/orders/getOrdersApi'; // فرض کنید این تابع برای دریافت داده‌ها است
import ReportModal from '../Modal';
const OrdersTableAntd = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getOrdersApi.getData();
      setOrders(response.data);
      setFilteredOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = orders.filter(order =>
      order.orderid.toString().includes(searchText)
    );
    setFilteredOrders(filteredData);
  }, [searchText, orders]);

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return '';
    const [datePart, timePart] = dateTimeString.split(' ');
    return `${timePart} _ ${datePart}`;
  };

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

  const handleRowClick = (record) => {
    setSelectedOrder(record);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  return (
    <div>
      <Input
        placeholder="جستجو با شماره سفارش"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: '20px', width: '300px' }}
      />

      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={filteredOrders}
          rowKey="orderid"
          pagination={{ pageSize: 10 }}
          style={{ fontFamily: 'shabnam' }}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
            
            style: { cursor: 'pointer' }, // تغییر شکل ماوس به cursor
          })}
        />
      </Spin>

      <ReportModal
        visible={isModalVisible}
        onClose={handleModalClose}
        orderData={selectedOrder}
      />
    </div>
  );
};

export default OrdersTableAntd;
