import React, { useEffect, useState } from 'react';
import { Table, Input, Spin, Button, Form, Modal, Select, message } from 'antd';
import usersService from '../services/usersServices';
import walletsService from '../services/walletsService';

const UsersCredit = () => {
  const { Option } = Select;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);
  const [allocatedAmount, setAllocatedAmount] = useState(0);


  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await usersService.getList();
      if (Array.isArray(response.data)) {
        setUsers(response.data);
        setFilteredUsers(response.data);
      } else {
        console.error('Expected an array but received:', response);
        setUsers([]);
        setFilteredUsers([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWallets = async () => {
    try {
      setLoading(true);
      const response = await walletsService.getList();
      setWallets(response.data);
    } catch (error) {
      message.error('خطا در دریافت اطلاعات کیف پول‌ها');
    } finally {
      setLoading(false);
    }
  };

  const fetchWalletBalance = async (wallet_id) => {
    try {
      const response = await walletsService.getWalletsBalance(wallet_id);
      const walletData = response?.data?.[0];
      if (walletData) {
        setWalletBalance(walletData.total_balance); // مجموع کل کیف پول
      } else {
        setWalletBalance(0);
      }
    } catch (error) {
      console.error('Error in fetchWalletBalance:', error);
      message.error('خطا در دریافت موجودی کیف پول');
    }
  };
  


  useEffect(() => {
    fetchData();
  }, []);

  const showModal = (userId) => {
    setSelectedUserId(userId);
    fetchWallets();
    setIsModalVisible(true);
  };

  const handleWalletChange = (value) => {
    setSelectedWallet(value);
    fetchWalletBalance(value); // دریافت موجودی کیف پول
  };

  const handleOk = () => {
    if (allocatedAmount > walletBalance) {
      message.error('مبلغ تخصیصی نمی‌تواند از موجودی کیف پول بیشتر باشد.');
      return;
    }
    if (allocatedAmount <= 0) {
      message.error('مبلغ تخصیصی باید بیشتر از صفر باشد.');
      return;
    }
  
    // انجام عملیات تخصیص
    setIsModalVisible(false);
    setAllocatedAmount(0); // مقدار تخصیصی را بازنشانی کنید
    const creditData = {
      user_id: selectedUserId,
      wallet_id: selectedWallet,
      amount: allocatedAmount
    };
    usersService.addCredit(creditData);
    message.success(
      `کیف پول ${selectedWallet} برای کاربر ${selectedUserId} با مبلغ ${allocatedAmount} تخصیص داده شد!`
    );
  };
  
  
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedWallet(null);
    setWalletBalance(null);
    setAllocatedAmount(0);
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
      title: 'عملیات',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <Button type="primary" onClick={() => showModal(record.id)}>
          تخصیص اعتبار
        </Button>
      ),
    },
  ];

  return (
    <div className="row">
      <h2>تخصیص اعتبار به کاربران</h2>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          style={{ fontFamily: 'shabnam' }}
        />
      </Spin>

      {/* Modal */}
      <Modal
        title="انتخاب کیف پول"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="تایید"
        cancelText="لغو"
      >
        <Form layout="vertical">
          <Form.Item label="انتخاب کیف پول">
            <Select
              placeholder="انتخاب کیف پول"
              onChange={handleWalletChange}
              loading={loading}
              value={selectedWallet}
            >
              {wallets.map((wallet) => (
                <Option key={wallet.wallet_id} value={wallet.wallet_id}>
                  {wallet.wallet_name}
                </Option>
              ))}
            </Select>

          </Form.Item>
          <Form.Item label="مبلغ تخصیصی به کاربر">
  <Input
    type="number"
    value={allocatedAmount}
    onChange={(e) => setAllocatedAmount(Number(e.target.value))}
    placeholder="مبلغ را وارد کنید"
  />
</Form.Item>

          {walletBalance !== null && (
            <Form.Item label="مجموع موجودی کیف پول">
              <Input value={`${walletBalance} `} disabled />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default UsersCredit;
