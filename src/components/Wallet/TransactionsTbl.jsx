import React, { useState, useEffect } from 'react';
import walletsService from '../../services/walletsService';
import { useNavigate } from 'react-router-dom'; // اضافه کردن useNavigate
const Transactions = () => {
    const navigate = useNavigate(); // استفاده از navigate برای هدایت
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    // دریافت userId از localStorage
    useEffect(() => {
        const userid = localStorage.getItem('ownerid');
        setUserId(userid);
    }, []);



    useEffect(() => {
        const fetchTransactions = async () => {
            const userid = localStorage.getItem('ownerid'); // مقدار گرفتن مستقیم
            if (!userid) {
                console.error("userId is null or undefined");
                return;
            }
            setLoading(true); // فعال کردن لودینگ
            try {
                const response = await walletsService.getTransactions(userid);
                setTransactions(response); // ذخیره اطلاعات تراکنش‌ها
            } catch (error) {
                console.error("Failed to fetch transactions:", error);
            } finally {
                setLoading(false); // غیر فعال کردن لودینگ
            }
        };
    
        fetchTransactions();
    }, []);
    const handleRowClick = (orderId) => {
        navigate(`/orders/${orderId}`); // هدایت به صفحه جزئیات سفارش
    };
    

    return (
        <div className="row">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>wallet_name</th>
                            <th>wallet_balance</th>
                            <th>wallet_type</th>
                            <th>orderid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr
                                key={transaction.id}
                                onClick={() => handleRowClick(transaction.orderid)} // اضافه کردن هندلر کلیک
                                style={{ cursor: 'pointer' }} // تغییر نشانگر برای اشاره به قابلیت کلیک
                            >                                
                            <td>{transaction.username}</td>
                                <td>{transaction.withdrawal_amount}</td>
                                <td>{transaction.withdrawal_date}</td>
                                <td>{transaction.wallet_name}</td>
                                <td>{transaction.wallet_balance}</td>
                                <td>{transaction.wallet_type}</td>
                                <td>{transaction.orderid}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Transactions;
