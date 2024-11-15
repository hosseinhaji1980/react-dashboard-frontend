import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderDetail } from '../../services/orders/Orders';

const OrderDetails = () => {
    const { orderId } = useParams(); // دریافت orderId از URL
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // هوک برای ناوبری به صفحه قبلی

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                setLoading(true);
                const response = await getOrderDetail(orderId); // فراخوانی API
                if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                    setOrderDetails(response.data[0]); // اولین آیتم آرایه را انتخاب کنید
                } else {
                    setError('هیچ جزئیاتی برای این سفارش یافت نشد.');
                }
            } catch (error) {
                setError('خطا در دریافت جزئیات سفارش');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    const handleBackClick = () => {
        navigate(-1); // هدایت به صفحه قبلی
    };

    if (loading) return <div>در حال بارگذاری...</div>;
    if (error) return <div>خطا: {error}</div>;

    return (
        <div className="container mt-4 bg-white">
            <h1>جزئیات سفارش</h1>
            <button onClick={handleBackClick} className="btn btn-primary mb-4">بازگشت</button>
            {orderDetails ? (
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="d-flex justify-content-between">
                            <span className="fw-bold">شماره سفارش:</span>
                            <span>{orderDetails.orderid}</span>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="d-flex justify-content-between">
                            <span className="fw-bold">وضعیت:</span>
                            <span>{orderDetails.orderstatus}</span>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="d-flex justify-content-between">
                            <span className="fw-bold">مبلغ:</span>
                            <span>{orderDetails.price}</span>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="d-flex justify-content-between">
                            <span className="fw-bold">تاریخ سفارش:</span>
                            <span>{orderDetails.orderdate}</span>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="d-flex justify-content-between">
                            <span className="fw-bold">تاریخ تایید:</span>
                            <span>{orderDetails.dateaccept}</span>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="d-flex justify-content-between">
                            <span className="fw-bold">مقدار:</span>
                            <span>{orderDetails.quantity}</span>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="d-flex justify-content-between">
                            <span className="fw-bold">محصول:</span>
                            <span>{orderDetails.productcode}</span>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="d-flex justify-content-between">
                            <span className="fw-bold">منبع:</span>
                            <span>{orderDetails.source}</span>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="d-flex justify-content-between">
                            <span className="fw-bold">نام کاربری:</span>
                            <span>{orderDetails.username}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <p>هیچ اطلاعاتی یافت نشد.</p>
            )}
        </div>
    );
};

export default OrderDetails;
