import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'antd'; // ایمپورت مودال از Ant Design
const API_URL = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_TOKEN;

function Discount() {
    const [discount, setDiscount] = useState(''); // مقدار تخفیف
    const [isModalVisible, setIsModalVisible] = useState(false); // وضعیت نمایش مودال
    const [modalMessage, setModalMessage] = useState(''); // پیام داخل مودال

    // تابع برای دریافت مقدار تخفیف از سرور
    useEffect(() => {
        const fetchDiscount = async () => {
            try {
                const response = await axios.get(`${API_URL}/discounts/get-discount`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setDiscount(response.data.discount); // تنظیم مقدار تخفیف
            } catch (error) {
                console.error('Error fetching discount:', error);
            }
        };

        fetchDiscount();
    }, []);

    // تابع برای ارسال مقدار تخفیف ویرایش‌شده به سرور
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${API_URL}/discounts/set-discount`, { discount }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setModalMessage('تخفیف با موفقیت ذخیره شد'); // پیام موفقیت
        } catch (error) {
            console.error('Error saving discount:', error);
            setModalMessage('خطا در ذخیره تخفیف'); // پیام خطا
        } finally {
            setIsModalVisible(true); // نمایش مودال
        }
    };

    // تابع برای بستن مودال
    const handleCloseModal = () => {
        setIsModalVisible(false); // بستن مودال
    };

    return (
        <div className='discount'>
            <h1>تخفیف همکار</h1>
            <form onSubmit={handleSubmit}>
                <label>مقدار تخفیف:</label>
                <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)} // امکان ویرایش مقدار تخفیف
                />
                <button type="submit">ذخیره</button>
            </form>

            {/* مودال برای نمایش پیام */}
            <Modal
                title="پیام"
                visible={isModalVisible}
                onOk={handleCloseModal}
                onCancel={handleCloseModal}
                footer={[
                    <Button key="submit" type="primary" onClick={handleCloseModal}>
                        تایید
                    </Button>
                ]}
            >
                <p>{modalMessage}</p>
            </Modal>
        </div>
    );
}

export default Discount;
