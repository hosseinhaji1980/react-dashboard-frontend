import React, { useState, useEffect } from 'react';
import { Tabs, Table, Button, Layout, Typography, Space, Spin, Upload, message, Modal } from 'antd';
import { UploadOutlined, CheckOutlined, CloseOutlined, CheckCircleOutlined } from '@ant-design/icons';
import SourceOrdersApi from '../services/orders/getOrdersApi';
import { uploadOrderImage, rejectOrder, acceptOrder } from '../services/orders/orderService'; // Import the API service
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



    const fetchOrders = async () => {
        console.log('Fetching orders...'); // Debugging line
        setLoading(true);
        try {
            const response = await SourceOrdersApi.getData();
            const ownerId = localStorage.getItem('ownerid');
            setAdminId(ownerId);
            if (!ownerId) {
                console.error('ownerid not found in localStorage');
                setLoading(false);
                return;
            }

            const pending = response.data.filter(order => order.orderstatus === 'inOrder');
            setPendingOrders(pending);

            const completed = response.data.filter(order => order.orderstatus === 'accepted' && order.ownerid === Number(ownerId));
            setCompletedOrders(completed);

            const rejected = response.data.filter(order => order.orderstatus === 'rejected' && order.ownerid === Number(ownerId));
            setRejectedOrders(rejected);

            const inOrder = response.data.filter(order => order.orderstatus === 'doing' && order.ownerid === Number(ownerId));
            setInOrderOrders(inOrder);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
        // Ensure fetchOrders only runs once when the component mounts
        // Adding [] as a dependency array ensures this
    }, []);

    const handleCompleteOrder = (orderId) => {
        setSelectedOrderId(orderId);
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

    const handleAcceptOrder = (orderId, orderid) => {
        acceptOrder(orderid, adminId);
        message.success('Order accepted!');
        fetchOrders();
    };
    const handleRowClick = (record) => {
        setSelectedOrder(record);
        setIsModalVisible(true);
      };
      const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedOrder(null);
      };
    const getColumns = () => {
        switch (key) {
            case 'pendingOrders':
                return [
                    {
                        title: '#',
                        dataIndex: 'id',
                        key: 'id',
                    },
                    {
                        title: 'شماره سفارش',
                        aligh:'center',
                        dataIndex: 'orderid',
                        key: 'orderid',
                    },
                    {
                        title: 'پلتفرم',
                        dataIndex: 'platform',
                        key: 'platform',
                    },
                    {
                        title: 'کد محصول',
                        dataIndex: 'productcode',
                        key: 'productcode',
                    },
                    {
                        title: 'نام کاربری',
                        dataIndex: 'username',
                        key: 'username',
                        align: 'center',  // اضافه کردن خاصیت align
                    },
                    {
                        title: 'قیمت',
                        dataIndex: 'price',
                        key: 'price',
                        align: 'center',  // اضافه کردن خاصیت align
                    },
                    {
                        title: 'تاریخ سفارش',
                        dataIndex: 'orderdate',
                        key: 'orderdate',
                        align: 'center',  // اضافه کردن خاصیت align
                    },
                    {
                        title: 'مرجع سفارش',
                        dataIndex: 'source',
                        key: 'source',
                        align: 'center',  // اضافه کردن خاصیت align
                    },
                    {
                        title: 'عملیات',
                        key: 'action',
                        align: 'center',  // اضافه کردن خاصیت align
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
            case 'inOrderOrders':
                return [
                    {
                        title: '#',
                        dataIndex: 'id',
                        key: 'id',
                    },
                    // {
                    //     title: 'کد محصول',
                    //     dataIndex: 'productcode',
                    //     key: 'productcode',
                    // },
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
                        title: 'عملیات',
                        key: 'action',
                    
                        render: (text, record) => (
                            <Space size="middle">
                                <Button
                                    type="info"
                                    icon={<CheckOutlined />}
                                    onClick={() => handleCompleteOrder(record.id)}
                                >
                                    تکمیل سفارش
                                </Button>
                                <Button
                                    type="primary"
                                                                        style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}

                                    icon={<CheckOutlined />}
                                    onClick={() => handleRowClick(record)}
                                >
                                   تغییر وضعیت سفارش
                                </Button>
                                <Button
                                    type="danger"
                                    icon={<CloseOutlined />}
                                    onClick={() => handleRejectOrder(record.id)}
                                >
                                    رد سفارش
                                </Button>
                            </Space>
                        ),
                    },
                ];
            case 'completedOrders':
            case 'rejectedOrders':
                return [
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
                        title: 'مرجع سفارش',
                        dataIndex: 'source',
                        key: 'source',
                    },
                    {
                        title: 'وضعیت سفارش',
                        key: 'status',
                        render: () => key === 'completedOrders' ? 'تکمیل شده' : 'رد شده',
                    },
                ];
            default:
                return [];
        }
    };

    return (
        <Layout >
            <Title level={2} style={{ fontFamily: 'Shabnam, sans-serif', marginBottom: '24px' }}>
                سفارشات من
            </Title>
            <Content>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '50px 0' }}>
                        <Spin size="large" />
                    </div>
                ) : (
                    <Tabs
                        defaultActiveKey="pendingOrders"
                        onChange={setKey}
                        centered
                        style={{ marginBottom: '24px' }}
                    >
                        <TabPane tab=" سفارشات در انتظار تایید" key="pendingOrders">
                            <Table
                                columns={getColumns()}
                                dataSource={pendingOrders}
                                rowKey="id"
                                scroll={{ x: 800 }}
                                rowClassName={(record, index) => index % 2 === 0 ? 'even-row' : 'odd-row'}
                            />
                        </TabPane>
                        
                        <TabPane tab="در حال انجام من" key="inOrderOrders">
                            <Table
                                columns={getColumns()}
                                dataSource={inOrderOrders}
                                rowKey="id"
                                scroll={{ x: 800 }}
                                rowClassName={(record, index) => index % 2 === 0 ? 'even-row' : 'odd-row'}
                            />
                        </TabPane>
                        <TabPane tab="سفارشات تکمیل شده من" key="completedOrders">
                            <Table
                                columns={getColumns()}
                                dataSource={completedOrders}
                                rowKey="id"
                                scroll={{ x: 800 }}
                                rowClassName={(record, index) => index % 2 === 0 ? 'even-row' : 'odd-row'}
                            />
                        </TabPane>
                        <TabPane tab="سفارشات رد شده من" key="rejectedOrders">
                            <Table
                                columns={getColumns()}
                                dataSource={rejectedOrders}
                                rowKey="id"
                                scroll={{ x: 800 }}
                                rowClassName={(record, index) => index % 2 === 0 ? 'even-row' : 'odd-row'}
                            />
                        </TabPane>
                    </Tabs>
                )}
                <Modal
                    title="آپلود تصویر"
                    visible={uploadVisible}
                    onCancel={() => setUploadVisible(false)}
                    footer={null}
                >
                    <Upload beforeUpload={handleFileUpload}>
                        <Button icon={<UploadOutlined />}>انتخاب تصویر</Button>
                    </Upload>
                </Modal>
            </Content>
            <ReportModal
        visible={isModalVisible}
        onClose={handleModalClose}
        orderData={selectedOrder}
      />
        </Layout>
        
    );
};

export default OrdersPage;
