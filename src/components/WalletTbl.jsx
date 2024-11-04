import React, { useState, useEffect } from 'react';
import { Table, Input, Spin, Modal } from 'antd';
import { CheckCircleOutlined, CloseOutlined } from '@ant-design/icons';
import walletsService from '../services/walletsService'; // فرض کنید این تابع برای دریافت داده‌ها است

const WalletsTableAntd = () => {
    const [wallets, setWallets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [filteredWallets, setFilteredWallets] = useState([]);
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await walletsService.getList();
            console.log('Received data:', response); // لاگ کردن داده‌ها
            setWallets(Array.isArray(response) ? response : []); // اطمینان از اینکه داده‌ها یک آرایه هستند
            setFilteredWallets(Array.isArray(response) ? response : []);
        } catch (error) {
            console.error('Error fetching wallets:', error);
        } finally {
            setLoading(false);
        }
    };
    

    // واکشی داده‌ها در بارگذاری اولیه
    useEffect(() => {
        fetchData();
    }, []);

    // فیلتر کردن کیف پول‌ها بر اساس متن جستجو
    useEffect(() => {
        const filteredData = wallets.filter(wallet =>
            wallet.wallet_id.toString().includes(searchText) || 
            wallet.wallet_name.includes(searchText)
        );
        setFilteredWallets(filteredData);
    }, [searchText, wallets]);

    // تعریف ستون‌ها
    const columns = [
        {
            title: 'شناسه کیف پول',
            dataIndex: 'wallet_id',
            key: 'wallet_id',
            align: 'center',
        },
        {
            title: 'نام کیف پول',
            dataIndex: 'wallet_name',
            key: 'wallet_name',
            align: 'center',
        },
        {
            title: 'موجودی کیف پول',
            dataIndex: 'wallet_balance',
            key: 'wallet_balance',
            align: 'center',
            render: (text) => `$${text}`, // فرمت موجودی به دلار
        },
        {
            title: 'نوع کیف پول',
            dataIndex: 'wallet_type',
            key: 'wallet_type',
            align: 'center',
        },
        {
            title: 'وضعیت',
            dataIndex: 'visa',
            key: 'visa',
            align: 'center',
            render: (text) => text === 1 ? 
                <CheckCircleOutlined style={{ color: 'green' }} /> : 
                <CloseOutlined style={{ color: 'red' }} />,
        },
    ];

    // تابع برای مدیریت کلیک روی ردیف
    const handleRowClick = (record) => {
        setSelectedWallet(record);
        setIsModalVisible(true);
    };

    // تابع برای بستن مودال
    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedWallet(null);
    };

    return (
        <div>
            <Input
                placeholder="جستجو با شناسه یا نام کیف پول"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ marginBottom: '20px', width: '300px' }}
            />

            <Spin spinning={loading}>
                <Table
                    columns={columns}
                    dataSource={filteredWallets}
                    rowKey="wallet_id"
                    pagination={{ pageSize: 10 }}
                    style={{ fontFamily: 'shabnam' }}
                    onRow={(record) => ({
                        onClick: () => handleRowClick(record),
                        style: { cursor: 'pointer' },
                    })}
                />
            </Spin>

            <Modal
                title="جزئیات کیف پول"
                visible={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
            >
                <p>شناسه کیف پول: {selectedWallet?.wallet_id}</p>
                <p>نام کیف پول: {selectedWallet?.wallet_name}</p>
                <p>موجودی کیف پول: ${selectedWallet?.wallet_balance}</p>
                <p>نوع کیف پول: {selectedWallet?.wallet_type}</p>
                <p>وضعیت: {selectedWallet?.visa === 1 ? 'فعال' : 'غیرفعال'}</p>
            </Modal>
        </div>
    );
};

export default WalletsTableAntd;
