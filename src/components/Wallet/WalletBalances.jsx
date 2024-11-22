import React, { useEffect, useState } from 'react';
import { Table, message, Spin } from 'antd';
import walletsService from '../../services/walletsService';

const WalletBalanceTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await walletsService.getWalletsBalance();
      setData(response.data);
    } catch (error) {
      console.error('Error:', error);
      message.error('خطا در بارگذاری اطلاعات کیف پول‌ها');
    } finally {
      setLoading(false);
    }
  };
  

  const columns = [
    {
      title: 'شناسه کیف پول',
      dataIndex: 'wallet_id',
      key: 'wallet_id',
      align: 'center',
    },
    {
      title: 'موجودی اولیه',
      dataIndex: 'initial_balance',
      key: 'initial_balance',
      align: 'center',
      render: (text) => `${text} `,
    },
    {
      title: 'جمع تراکنش‌ها',
      dataIndex: 'transactions_sum',
      key: 'transactions_sum',
      align: 'center',
      render: (text) => `${text} `,
    },
    {
      title: 'مجموع سفارش‌های تکمیل‌شده',
      dataIndex: 'completed_orders_sum',
      key: 'completed_orders_sum',
      align: 'center',
      render: (text) => `${text.toLocaleString('fa-IR')} `,
    },
    {
      title: 'موجودی کل',
      dataIndex: 'total_balance',
      key: 'total_balance',
      align: 'center',
      render: (text) => (
        <span style={{ fontWeight: 'bold', color: text < 0 ? 'red' : 'green' }}>
      {text.toLocaleString('fa-IR')} {/* برای اعداد فارسی */}
      </span>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>جدول موجودی کیف پول</h2>
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table
          dataSource={data}
          columns={columns}
          rowKey="wallet_id"
          bordered
          pagination={{ pageSize: 10 }}
        />
      )}
    </div>
  );
};

export default WalletBalanceTable;
