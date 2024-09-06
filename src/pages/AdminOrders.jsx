import React, { useState, useEffect } from 'react';
import { Tabs, Table, Button, Layout, Typography, Space } from 'antd';
import SourceOrdersApi from '../services/orders/getOrdersApi'; // دریافت داده‌ها از API

const { TabPane } = Tabs;
const { Title } = Typography;
const { Content } = Layout;

const OrdersPage = () => {
    const [key, setKey] = useState('pendingOrders');
    const [pendingOrders, setPendingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [rejectedOrders, setRejectedOrders] = useState([]);

    // Fetch orders and filter them
    const fetchOrders = async () => {
        try {
            const response = await SourceOrdersApi.getData();
            const ownerId = localStorage.getItem('ownerid');
            if (!ownerId) {
                console.error('ownerid not found in localStorage');
                return;
            }

            const pending = response.data.filter(order => order.orderstatus === 'inOrder');
            setPendingOrders(pending);

            const completed = response.data.filter(order => order.orderstatus === 'accepted' && order.ownerid === Number(ownerId));
            setCompletedOrders(completed);

            const rejected = response.data.filter(order => order.orderstatus === 'rejected' && order.ownerid === Number(ownerId));
            setRejectedOrders(rejected);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleAcceptOrder = (orderId) => {
        alert(`Order ${orderId} accepted!`);
    };

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'کد محصول',
            dataIndex: 'productcode',
            key: 'productcode',
        },
        {
            title: 'پلتفرم',
            dataIndex: 'platform',
            key: 'platform',
        },
        {
            title: 'نام کاربری',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'تاریخ سفارش',
            dataIndex: 'orderdate',
            key: 'orderdate',
        },
        {
            title: 'وضعیت سفارش',
            key: 'status',
            render: () => 'در انتظار تایید',
        },
        {
            title: 'قیمت',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'شماره سفارش',
            dataIndex: 'orderid',
            key: 'orderid',
        },
        {
            title: 'چت آیدی',
            dataIndex: 'chatid',
            key: 'chatid',
        },
        {
            title: 'لول',
            dataIndex: 'level',
            key: 'level',
        },
        {
            title: 'مرجع سفارش',
            dataIndex: 'source',
            key: 'source',
        },
        {
            title: 'عملیات',
            key: 'action',
            render: (text, record) => (
                <Button type="primary" onClick={() => handleAcceptOrder(record.id)}>
                    قبول سفارش
                </Button>
            ),
        },
    ];

    return (
        <Layout style={{ padding: '24px' }}>
            <Title level={2} style={{ fontFamily: 'Shabnam, sans-serif', marginBottom: '24px' }}>
                سفارشات من
            </Title>
            <Content>
                <Tabs defaultActiveKey="1" onChange={setKey} centered>
                    <TabPane tab="تمام سفارشات در انتظار" key="pendingOrders">
                        <Table
                            columns={columns}
                            dataSource={pendingOrders}
                            rowKey="id"
                            scroll={{ x: 800 }}
                        />
                    </TabPane>
                    <TabPane tab="سفارشات تکمیل شده من" key="completedOrders">
                        <Table
                            columns={columns.map(col => ({ ...col, render: col.render ? () => 'تکمیل شده' : col.render }))}
                            dataSource={completedOrders}
                            rowKey="id"
                            scroll={{ x: 800 }}
                        />
                    </TabPane>
                    <TabPane tab="سفارشات رد شده من" key="rejectedOrders">
                        <Table
                            columns={columns.map(col => ({ ...col, render: col.render ? () => 'رد شده' : col.render }))}
                            dataSource={rejectedOrders}
                            rowKey="id"
                            scroll={{ x: 800 }}
                        />
                    </TabPane>
                </Tabs>
            </Content>
        </Layout>
    );
};

export default OrdersPage;
