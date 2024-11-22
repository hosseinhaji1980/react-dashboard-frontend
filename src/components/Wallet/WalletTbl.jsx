import React, { useState, useEffect } from 'react';
import { Table, Input, Spin, Checkbox, Button } from 'antd';
import { CheckCircleOutlined, CloseOutlined } from '@ant-design/icons';
import walletsService from '../../services/walletsService'; // فرض کنید این تابع برای دریافت داده‌ها است

const WalletsTableAntd = () => {
    const [wallets, setWallets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredWallets, setFilteredWallets] = useState([]);
    const [filters, setFilters] = useState({}); // برای نگهداری فیلترهای فعال

    // دریافت داده‌ها
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await walletsService.getList();
            setWallets(response.data);
            setFilteredWallets(response.data);
        } catch (error) {
            console.error('Error fetching wallets:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // مدیریت تغییرات فیلترها
    const handleFilterChange = (columnKey, selectedValues) => {
        const newFilters = { ...filters, [columnKey]: selectedValues };
        setFilters(newFilters);

        // فیلتر داده‌ها بر اساس تمام فیلترهای فعال
        const filteredData = wallets.filter(wallet =>
            Object.keys(newFilters).every(key =>
                newFilters[key].length === 0 || newFilters[key].includes(wallet[key]?.toString())
            )
        );
        setFilteredWallets(filteredData);
    };

    // ساخت مقادیر یونیک برای هر ستون
    const getUniqueValues = (key) => {
        const values = Array.from(new Set(filteredWallets.map(wallet => wallet[key]?.toString())));
        return values.sort();
    };

    // ستون‌های جدول
    const columns = [
        {
            title: 'شناسه کیف پول',
            dataIndex: 'wallet_id',
            key: 'wallet_id',
            align: 'center',
            filterDropdown: () => (
                <div style={{ padding: 8, maxHeight: 200, overflowY: 'auto' }}>
                    {getUniqueValues('wallet_id').map(value => (
                        <div key={value}>
                            <Checkbox
                                onChange={(e) =>
                                    handleFilterChange(
                                        'wallet_id',
                                        e.target.checked
                                            ? [...(filters.wallet_id || []), value]
                                            : (filters.wallet_id || []).filter(item => item !== value)
                                    )
                                }
                                checked={filters.wallet_id?.includes(value)}
                            >
                                {value}
                            </Checkbox>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            title: 'نام کیف پول',
            dataIndex: 'wallet_name',
            key: 'wallet_name',
            align: 'center',
            filterDropdown: () => (
                <div style={{ padding: 8, maxHeight: 200, overflowY: 'auto' }}>
                    {getUniqueValues('wallet_name').map(value => (
                        <div key={value}>
                            <Checkbox
                                onChange={(e) =>
                                    handleFilterChange(
                                        'wallet_name',
                                        e.target.checked
                                            ? [...(filters.wallet_name || []), value]
                                            : (filters.wallet_name || []).filter(item => item !== value)
                                    )
                                }
                                checked={filters.wallet_name?.includes(value)}
                            >
                                {value}
                            </Checkbox>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            title: 'موجودی کیف پول',
            dataIndex: 'wallet_balance',
            key: 'wallet_balance',
            align: 'center',
            render: (text) => `$${text}`,
            filterDropdown: () => (
                <div style={{ padding: 8, maxHeight: 200, overflowY: 'auto' }}>
                    {getUniqueValues('wallet_balance').map(value => (
                        <div key={value}>
                            <Checkbox
                                onChange={(e) =>
                                    handleFilterChange(
                                        'wallet_balance',
                                        e.target.checked
                                            ? [...(filters.wallet_balance || []), value]
                                            : (filters.wallet_balance || []).filter(item => item !== value)
                                    )
                                }
                                checked={filters.wallet_balance?.includes(value)}
                            >
                                ${value}
                            </Checkbox>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            title: 'نوع کیف پول',
            dataIndex: 'wallet_type',
            key: 'wallet_type',
            align: 'center',
            filterDropdown: () => (
                <div style={{ padding: 8, maxHeight: 200, overflowY: 'auto' }}>
                    {getUniqueValues('wallet_type').map(value => (
                        <div key={value}>
                            <Checkbox
                                onChange={(e) =>
                                    handleFilterChange(
                                        'wallet_type',
                                        e.target.checked
                                            ? [...(filters.wallet_type || []), value]
                                            : (filters.wallet_type || []).filter(item => item !== value)
                                    )
                                }
                                checked={filters.wallet_type?.includes(value)}
                            >
                                {value}
                            </Checkbox>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            title: 'وضعیت',
            dataIndex: 'visa',
            key: 'visa',
            align: 'center',
            render: (text) =>
                text === 1 ? (
                    <CheckCircleOutlined style={{ color: 'green' }} />
                ) : (
                    <CloseOutlined style={{ color: 'red' }} />
                ),
            filterDropdown: () => (
                <div style={{ padding: 8, maxHeight: 200, overflowY: 'auto' }}>
                    {getUniqueValues('visa').map(value => (
                        <div key={value}>
                            <Checkbox
                                onChange={(e) =>
                                    handleFilterChange(
                                        'visa',
                                        e.target.checked
                                            ? [...(filters.visa || []), value]
                                            : (filters.visa || []).filter(item => item !== value)
                                    )
                                }
                                checked={filters.visa?.includes(value)}
                            >
                                {value === '1' ? 'فعال' : 'غیرفعال'}
                            </Checkbox>
                        </div>
                    ))}
                </div>
            ),
        },
    ];

    return (
        <div>
            <Spin spinning={loading}>
                <Table
                    columns={columns}
                    dataSource={filteredWallets}
                    rowKey="wallet_id"
                    pagination={{ pageSize: 10 }}
                    style={{ fontFamily: 'shabnam' }}
                />
            </Spin>
        </div>
    );
};

export default WalletsTableAntd;
