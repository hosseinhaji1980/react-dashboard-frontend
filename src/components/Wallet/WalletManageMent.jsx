import React, { useEffect, useState } from 'react';
import walletsService from '../../services/walletsService'; // تغییر نام به walletsService

function WalletManagement() {
    const [walletList, setWalletList] = useState(null); // تغییر نام به walletList

    useEffect(() => {
        const fetchWallets = async () => {
            try {
                const response = await walletsService.getList(); // استفاده از walletsService به جای wallets
                setWalletList(response); // تنظیم داده‌های واکشی شده
            } catch (error) {
                console.error('Error fetching wallet data:', error);
            }
        };

        fetchWallets(); // فراخوانی تابع برای واکشی داده‌ها
    }, []); // افزودن آرایه خالی برای اجرا فقط در بارگذاری اولیه

    return (
        <div className="row d-flex justify-content-between align-items-center bg-light">
            <div className="col-auto">
                <input type='text' placeholder='جستجو' className='form-control'></input>
            </div>
            <div className="col-auto">
                <button className='btn btn-primary'>تعریف کیف پول جدید</button>
            </div>
        </div>
    );
}

export default WalletManagement;
