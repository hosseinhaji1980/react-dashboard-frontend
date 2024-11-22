import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Spin } from 'antd';
import walletsService from '../../services/walletsService';

const TransactionsDetail = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data from API
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await walletsService.getWalletsTransactions(); // درخواست API
            setTransactions(response); // ذخیره داده در state
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Define table columns
    const columns = [
        {
            title: 'نام کیف پول',
            dataIndex: 'wallet_name',
            key: 'wallet_name',
        },
        {
            title: 'مقدار',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => amount.toLocaleString(), // نمایش مقدار با کاما
        },
        {
            title: 'تاریخ تراکنش',
            dataIndex: 'transaction_date',
            key: 'transaction_date',
            render: (date) => new Date(date).toLocaleString('fa-IR'), // تبدیل به فرمت فارسی
        },
        {
            title: 'نوع تراکنش',
            dataIndex: 'transaction_type',
            key: 'transaction_type',
            render: (type) => (
                <Tag color={type === 'deposit' ? 'green' : 'red'}>
                    {type === 'deposit' ? 'واریز' : 'برداشت'}
                </Tag>
            ),
        },
        {
            title: 'ویزا',
            dataIndex: 'visa',
            key: 'visa',
            render: (visa) => (visa ? 'بله' : 'خیر'), // نمایش بله/خیر
        },
        {
            title: 'نوع کیف پول',
            dataIndex: 'wallet_type',
            key: 'wallet_type',
        },
        {
            title: 'مشاهده تراکنش',
            key: 'actions',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button
                        type="primary"
                        onClick={() => handleViewDeposits(record)}
                    >
                        مشاهده واریزی‌ها
                    </Button>
                    <Button
                        type="default"
                        danger
                        onClick={() => handleViewWithdrawals(record)}
                    >
                        مشاهده برداشت‌ها
                    </Button>
                </div>
            ),
        },
    ];

    // Handle view deposits
    const handleViewDeposits = (record) => {
        console.log('مشاهده واریزی‌ها:', record);
        // اینجا می‌توانید کدی برای هدایت یا نمایش واریزی‌های مربوطه بنویسید
    };

    // Handle view withdrawals
    const handleViewWithdrawals = (record) => {
        console.log('مشاهده برداشت‌ها:', record);
        // اینجا می‌توانید کدی برای هدایت یا نمایش برداشت‌های مربوطه بنویسید
    };

    return (
        <div className="transactions-table">
            {loading ? (
                <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />
            ) : (
                <Table
                    dataSource={transactions}
                    columns={columns}
                    rowKey={(record) => record.transaction_date + record.amount} // کلید یکتا برای هر سطر
                    pagination={{ pageSize: 10 }}
                />
            )}
        </div>
    );
};

export default TransactionsDetail;
