import React, { useState, useEffect } from 'react';
import { Table, Input, Spin, Button, Popconfirm, Form, Modal, notification } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import usersService from '../../services/usersServices';

const UsersTbl = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [editingRow, setEditingRow] = useState(null);
    const [form] = Form.useForm();

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await usersService.getList();
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
        form.setFieldsValue({
            username: record.username,
            email: record.email,
            password: record.password,
            telegramaccount: record.telegramaccount,
            admin: record.admin,
        });
        setEditingRow(record.id);
    };

    const handleSave = async (userId) => {
        try {
            const updatedData = await form.validateFields();
            const updatedUser = { ...updatedData, userId };
            await usersService.updateUser(userId, updatedUser);

            setUsers((prev) =>
                prev.map((user) => (user.id === userId ? { ...user, ...updatedData } : user))
            );
            setEditingRow(null);
                notification.success({
                  message: '',
                  description: 'اطلاعات کاربر  با موفقیت ویرایش شد.',
                });
            
        } catch (error) {
            notification.success({
                message: '',
                description: 'خطا در ویرایش اطلاعات کاربر',
              });        }
    };

    const handleDelete = async (userId) => {
        try {
            await usersService.deleteUser(userId);
            setUsers(users.filter(user => user.id !== userId));
            setFilteredUsers(filteredUsers.filter(user => user.id !== userId));
            notification.success({
                message: '',
                description: 'اطلاعات کاربر  با موفقیت حذف گردید.',
              });
        } catch (error) {
            notification.success({
                message: '',
                description: 'خطا در حذف اطلاعات کاربر',
              });           }
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
            render: (text, record) => (
                editingRow === record.id ? (
                    <Form.Item
                        name="username"
                        style={{ margin: 0 }}
                    >
                        <Input />
                    </Form.Item>
                ) : (
                    text
                )
            ),
        },
        {
            title: 'کلمه عبور',
            dataIndex: 'password',
            key: 'password',
            align: 'center',
            render: (text, record) => (
                editingRow === record.id ? (
                    <Form.Item
                        name="password"
                        style={{ margin: 0 }}
                    >
                        <Input />
                    </Form.Item>
                ) : (
                    text
                )
            ),
        },
        {
            title: 'ایمیل',
            dataIndex: 'email',
            key: 'email',
            align: 'center',
            render: (text, record) => (
                editingRow === record.id ? (
                    <Form.Item
                        name="email"
                        style={{ margin: 0 }}
                    >
                        <Input />
                    </Form.Item>
                ) : (
                    text
                )
            ),
        },
        {
            title: 'ادمین',
            dataIndex: 'admin',
            key: 'admin',
            align: 'center',
            render: (text, record) => (
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
            render: (text, record) => (
                editingRow === record.id ? (
                    <Form.Item
                        name="telegramaccount"
                        style={{ margin: 0 }}
                    >
                        <Input />
                    </Form.Item>
                ) : (
                    <a href={text} target="_blank" rel="noopener noreferrer">
                        {text}
                    </a>
                )
            ),
        },
        {
            title: 'ویرایش',
            key: 'edit',
            align: 'center',
            render: (text, record) => (
                editingRow === record.id ? (
                    <Button onClick={() => handleSave(record.id)} icon={<SaveOutlined />}>
                        ذخیره
                    </Button>
                ) : (
                    <Button onClick={() => handleEdit(record)} icon={<EditOutlined />}>
                        ویرایش
                    </Button>
                )
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
                <Form form={form} component={false}>
                    <Table
                    className='table-container'
                        columns={columns}
                        dataSource={filteredUsers}
                        rowKey="id"
                        pagination={{ pageSize: 10 }}
                        style={{ fontFamily: 'shabnam' }}
                    />
                </Form>
            </Spin>
        </div>
    );
};

export default UsersTbl;
