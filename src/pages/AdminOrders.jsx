import React, { useState, useEffect } from 'react';
import { Tabs, Table, Button, Layout, Typography, Space, Spin, Upload, message, Modal } from 'antd';
import { UploadOutlined, CheckCircleOutlined } from '@ant-design/icons';
import SourceOrdersApi from '../services/orders/getOrdersApi';
import { uploadOrderImage, rejectOrder, acceptOrder } from '../services/orders/orderService';
import ReportModal from '../components/Modal';

import '../css/Orders.css';

const { TabPane } = Tabs;
const { Title } = Typography;
const { Content } = Layout;

const OrdersPage = () => {
    const [key, setKey] = useState('pendingOrders');
    const [pendingOrders, setPendingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [rejectedOrders, setRejectedOrders] = useState([]);
    const [inOrderOrders, setInOrderOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploadVisible, setUploadVisible] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [adminId, setAdminId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [pageSize, setPageSize] = useState(20);
    const [currentPage, setCurrentPage] = useState({
        pendingOrders: 1,
        inOrderOrders: 1,
        completedOrders: 1,
        rejectedOrders: 1
    });

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await SourceOrdersApi.getData();
            console.log(response);
            const ownerId = localStorage.getItem('ownerid');
            setAdminId(ownerId);

            if (!ownerId) {
                console.error('ownerid not found in localStorage');
                setLoading(false);
                return;
            }

            setPendingOrders(response.data.filter(order => order.orderstatus === 'inOrder'));
            setCompletedOrders(response.data.filter(order => order.orderstatus === 'accepted' && order.ownerid === Number(ownerId)));
            setRejectedOrders(response.data.filter(order => order.orderstatus === 'rejected' && order.ownerid === Number(ownerId)));
            setInOrderOrders(response.data.filter(order => order.orderstatus === 'doing' && order.ownerid === Number(ownerId)));
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleCompleteOrder = (orderId,chatId,source) => {
        setSelectedOrderId(orderId,chatId,source);
        setUploadVisible(true);
    };

    const handleFileUpload = (file) => {
        uploadOrderImage(file, selectedOrderId)
            .then((response) => {
                if (response.success) {
                    message.success('Order completed successfully.');
                    fetchOrders();
                    setUploadVisible(false);
                } else {
                    message.error(response.message || 'Error uploading image or completing the order.');
                }
            });
        return false;
    };

    const handleRejectOrder = (orderId) => {
        rejectOrder(orderId)
            .then((response) => {
                if (response.success) {
                    message.success('Order rejected!');
                    fetchOrders();
                } else {
                    message.error(response.message || 'Error rejecting the order.');
                }
            });
    };

    const handleAcceptOrder = async (orderId, orderid) => {
        try {
            await acceptOrder(orderid, adminId);
            message.success('سفارش موردنظر در وضعیت در حال انجام قرار گرفت.');
            await fetchOrders();
        } catch (error) {
            message.error('خطا در قبول سفارش. لطفا دوباره تلاش کنید.');
            console.error('Error accepting order:', error);
        }
    };

    const handlePageChange = (tabKey, page) => {
        setCurrentPage((prev) => ({
            ...prev,
            [tabKey]: page,
        }));
    };

    const getColumns = (tabKey) => {
        const commonColumns = [
            { title: '#', dataIndex: 'id', key: 'id', align: 'center' },
            { title: 'شماره سفارش', dataIndex: 'orderid', key: 'orderid', align: 'center' },
            { title: 'پلتفرم', dataIndex: 'platform', key: 'platform', align: 'center' },
            { title: 'کد محصول', dataIndex: 'productcode', key: 'productcode', align: 'center' },
            { title: 'نام کاربری', dataIndex: 'username', key: 'username', align: 'center' },
            { title: 'قیمت', dataIndex: 'price', key: 'price', align: 'center' },
            { title: 'تاریخ سفارش', dataIndex: 'orderdate', key: 'orderdate', align: 'center' },
            { title: 'مرجع سفارش', dataIndex: 'source', key: 'source', align: 'center' },
        ];

        if (tabKey === 'pendingOrders') {
            return [
                ...commonColumns,
                {
                    title: 'عملیات',
                    key: 'action',
                    align: 'center',
                    render: (text, record) => (
                        <Space size="middle">
                            <Button
                                type="primary"
                                icon={<CheckCircleOutlined />}
                                onClick={() => handleAcceptOrder(record.id, record.orderid)}
                            >
                                قبول سفارش
                            </Button>
                        </Space>
                    ),
                },
            ];
        } else if (tabKey === 'inOrderOrders') {
            return [
                ...commonColumns,
                {
                    title: 'عملیات',
                    key: 'action',
                    align: 'center',
                    render: (text, record) => (
                        <Space size="middle">
                            <Button type="primary" onClick={() => handleCompleteOrder(record.id)}>
                                تکمیل سفارش
                            </Button>
                            <Button danger onClick={() => handleRejectOrder(record.id)}>
                                رد سفارش
                            </Button>
                        </Space>
                    ),
                },
            ];
        } else {
            return commonColumns;
        }
    };

    return (
        <Layout style={{ width: '100%' }}>
            <Content style={{ padding: '24px', width: '100%', maxWidth: '100vw' }}>
                <Title level={2} style={{ fontFamily: 'Shabnam, sans-serif', marginBottom: '24px' }}>
                    سفارشات من
                </Title>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '50px 0' }}>
                        <Spin size="large" />
                    </div>
                ) : (
                    <Tabs defaultActiveKey="pendingOrders" onChange={(key) => setKey(key)} centered style={{ marginBottom: '24px' }}>
                        <TabPane tab="سفارشات در انتظار تایید" key="pendingOrders">
                            <Table
                                columns={getColumns('pendingOrders')}
                                dataSource={pendingOrders}
                                rowKey="id"
                                pagination={{
                                    current: currentPage.pendingOrders,
                                    pageSize: pageSize,
                                    showSizeChanger: true,
                                    pageSizeOptions: ['10', '20', '50', '100'],
                                    onChange: (page) => handlePageChange('pendingOrders', page),
                                    onShowSizeChange: (current, size) => {
                                        setPageSize(size);
                                        handlePageChange('pendingOrders', 1);
                                    },
                                }}
                                scroll={{ x: '100%' }}
                                style={{ width: '100%' }}
                            />
                        </TabPane>
                        <TabPane tab="در حال انجام من" key="inOrderOrders">
                            <Table
                                columns={getColumns('inOrderOrders')}
                                dataSource={inOrderOrders}
                                rowKey="id"
                                pagination={{
                                    current: currentPage.inOrderOrders,
                                    pageSize: pageSize,
                                    showSizeChanger: true,
                                    pageSizeOptions: ['10', '20', '50', '100'],
                                    onChange: (page) => handlePageChange('inOrderOrders', page),
                                    onShowSizeChange: (current, size) => {
                                        setPageSize(size);
                                        handlePageChange('inOrderOrders', 1);
                                    },
                                }}
                                scroll={{ x: '100%' }}
                                style={{ width: '100%' }}
                            />
                        </TabPane>
                        <TabPane tab="سفارشات تکمیل شده من" key="completedOrders">
                            <Table
                                columns={getColumns('completedOrders')}
                                dataSource={completedOrders}
                                rowKey="id"
                                pagination={{
                                    current: currentPage.completedOrders,
                                    pageSize: pageSize,
                                    showSizeChanger: true,
                                    pageSizeOptions: ['10', '20', '50', '100'],
                                    onChange: (page) => handlePageChange('completedOrders', page),
                                    onShowSizeChange: (current, size) => {
                                        setPageSize(size);
                                        handlePageChange('completedOrders', 1);
                                    },
                                }}
                                scroll={{ x: '100%' }}
                                style={{ width: '100%' }}
                            />
                        </TabPane>
                        <TabPane tab="سفارشات رد شده من" key="rejectedOrders">
                            <Table
                                columns={getColumns('rejectedOrders')}
                                dataSource={rejectedOrders}
                                rowKey="id"
                                pagination={{
                                    current: currentPage.rejectedOrders,
                                    pageSize: pageSize,
                                    showSizeChanger: true,
                                    pageSizeOptions: ['10', '20', '50', '100'],
                                    onChange: (page) => handlePageChange('rejectedOrders', page),
                                    onShowSizeChange: (current, size) => {
                                        setPageSize(size);
                                        handlePageChange('rejectedOrders', 1);
                                    },
                                }}
                                scroll={{ x: '100%' }}
                                style={{ width: '100%' }}
                            />
                        </TabPane>
                    </Tabs>
                )}
                <Modal
                    visible={uploadVisible}
                    title="آپلود تصویر سفارش"
                    onCancel={() => setUploadVisible(false)}
                    footer={null}
                >
                    <Upload
                        beforeUpload={handleFileUpload}
                        showUploadList={false}
                    >
                        <Button icon={<UploadOutlined />}>آپلود فایل</Button>
                    </Upload>
                </Modal>
                <ReportModal
                    visible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    order={selectedOrder}
                />
            </Content>
        </Layout>
    );
};

export default OrdersPage;
