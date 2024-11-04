import React, { useState, useEffect } from 'react';
import { Table, Input, Spin, Modal, Button, Popconfirm } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined,EditOutlined } from '@ant-design/icons';
import usersService from '../../services/usersServices';
const UsersTbl = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await usersService.getList();
            // Assuming response follows the structure { data: Array, message: 'ok' }
            if (Array.isArray(response.data)) {
                setUsers(response.data);
                setFilteredUsers(response.data);
            } else {
                console.error("Expected an array but received:", response);
                setUsers([]);
                setFilteredUsers([]);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };
    
    

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const filteredData = users.filter(user =>
            user.username?.includes(searchText) || 
            user.email?.includes(searchText)
        );
        setFilteredUsers(filteredData);
    }, [searchText, users]);
    

    const handleEdit = (record) => {
        setSelectedUser(record);
        setIsModalVisible(true);
    };

    const handleDelete = async (userId) => {
        try {
            await usersService.deleteUser(userId);
            setUsers(users.filter(user => user.user_id !== userId));
            setFilteredUsers(filteredUsers.filter(user => user.user_id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedUser(null);
    };
    const columns = [
        {
            title: 'شناسه کاربر',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
        },
        {
            title: 'نام کاربر',
            dataIndex: 'username',
            key: 'username',
            align: 'center',
        },
        {
            title: 'کلمه عبور',
            dataIndex: 'pass',
            key: 'pass',
            align: 'center',
        },
        

        // Inside your columns definition
        {
            title: 'ادمین',
            dataIndex: 'admin',
            key: 'admin',
            align: 'center',
            render: (text) => (
                text === 1 ? (
                    <CheckCircleOutlined style={{ color: 'green' }} />
                ) : (
                    <CloseCircleOutlined style={{ color: 'red' }} />
                )
            ),
        },
        
        {
            title: 'اکانت تلگرام',
            dataIndex: 'telegramaccount',
            key: 'telegramaccount',
            align: 'center',
            render: (text) => (
                <a href={text} target="_blank" rel="noopener noreferrer">
                    {text}
                </a>
            ),
        },
        {
            title: 'کلمه عبور',
            dataIndex: 'password',
            key: 'password',
            align: 'center',
        },
        {
            title: 'ویرایش',
            key: 'edit',
            align: 'center',
            render: (text, record) => (
                <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                    ویرایش
                </Button>
            ),
        },
        {
            title: 'حذف',
            key: 'delete',
            align: 'center',
            render: (text, record) => (
                <Popconfirm
                    title="آیا از حذف این کاربر مطمئن هستید؟"
                    onConfirm={() => handleDelete(record.id)}
                    okText="بله"
                    cancelText="خیر"
                >
                    <Button icon={<DeleteOutlined />} danger>
                        حذف
                    </Button>
                </Popconfirm>
            ),
        },
    ];
    
    return (
        <div>
            <Input
                placeholder="جستجو با نام کاربر یا ایمیل"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ marginBottom: '20px', width: '300px' }}
            />

            <Spin spinning={loading}>
                <Table
                    columns={columns}
                    dataSource={filteredUsers}
                    rowKey="user_id"
                    pagination={{ pageSize: 10 }}
                    style={{ fontFamily: 'shabnam' }}
                />
            </Spin>

            <Modal
                title="ویرایش کاربر"
                visible={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
            >
                <p>شناسه کاربر: {selectedUser?.user_id}</p>
                <p>نام کاربر: {selectedUser?.username}</p>
                <p>ایمیل: {selectedUser?.email}</p>
                <p>نوع کاربر: {selectedUser?.role}</p>
                {/* در اینجا می‌توانید فرم ویرایش قرار دهید */}
            </Modal>
        </div>
    );
};

export default UsersTbl;
