import React, { useState, useEffect } from 'react';
import { Form, InputNumber, Select, Button, message, Spin } from 'antd';
import walletsService from '../../services/walletsService'; 
import setTransactions from '../../services/walletsService'; 

const { Option } = Select;

const WalletChargeForm = () => {
    const [wallets, setWallets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

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
    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const response = await walletsService.getWalletsTransactions(); // فرض کنید این متد لیست کیف پول‌ها را برمی‌گرداند
            setWallets(response);
        } catch (error) {
            message.error('خطا در دریافت اطلاعات کیف پول‌ها');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchWallets(); // فراخوانی اولیه برای کیف پول‌ها
        fetchTransactions(); // فراخوانی اولیه برای تراکنش‌ها
    }, []);

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const response = await setTransactions.setTransactions(values); // ارسال تراکنش جدید
            message.success('تراکنش با موفقیت انجام شد');
            form.resetFields(); // بازنشانی فرم
            await fetchTransactions(); // به‌روزرسانی لیست تراکنش‌ها
        } catch (error) {
            message.error('خطا در انجام تراکنش');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Spin spinning={loading}>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                style={{ maxWidth: 400, margin: '0 auto', fontFamily: 'Shabnam' }}
            >
                <Form.Item
                    name="wallet_id"
                    label="نام کیف پول"
                    rules={[{ required: true, message: 'انتخاب کیف پول الزامی است' }]}
                >
                    <Select placeholder="انتخاب کیف پول" loading={loading}>
                        {wallets.map((wallet) => (
                            <Option key={wallet.wallet_id} value={wallet.wallet_id}>
                                {wallet.wallet_name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="transaction_type"
                    label="نوع عمل"
                    rules={[{ required: true, message: 'انتخاب نوع عمل الزامی است' }]}
                >
                    <Select placeholder="انتخاب نوع عمل">
                        <Option value="deposit">واریز</Option>
                        <Option value="withdraw">برداشت</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="amount"
                    label="مبلغ"
                    rules={[
                        { required: true, message: 'وارد کردن مبلغ الزامی است' },
                        { type: 'number', min: 1, message: 'مبلغ باید بزرگ‌تر از صفر باشد' },
                    ]}
                >
                    <InputNumber
                        placeholder="مبلغ را وارد کنید"
                        style={{ width: '100%' }}
                        min={1}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        ارسال
                    </Button>
                    
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default WalletChargeForm;
