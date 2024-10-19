import React, { useState, useEffect } from 'react';
import { Modal, Table, Input, Spin } from 'antd';
import { CheckOutlined, ClockCircleOutlined, CloseOutlined, CheckCircleOutlined } from '@ant-design/icons';
import ApiService from "../services/orders/apiService";
 
const OrderStatusModal = ({ visible, onClose, orderStatus, getOrdersApi }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    if (visible) {
      fetchData();
    }
  }, [visible, orderStatus]);

  useEffect(() => {
    const filteredData = orders.filter(order =>
      order.orderid.toString().includes(searchText)
    );
    setFilteredOrders(filteredData);
  }, [searchText, orders]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getOrdersByStatus(orderStatus,1,20);
      const filteredOrders = response.data.filter(order => order.orderstatus === orderStatus);
      setOrders(filteredOrders);
      setFilteredOrders(filteredOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <Modal
      title={`سفارشات ${orderStatus === 'accepted' ? 'تکمیل شده' : ''}`}
      visible={visible}
      onCancel={onClose}
      width="80%"
      footer={null}
    >
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
        />
      </Spin>
    </Modal>
  );
};

export default OrderStatusModal;