import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        telegramId: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('کلمه عبور و تایید کلمه عبور مطابقت ندارند');
            return;
        }
    };

    return (
        <div className="container mt-5 bg-white rounded-0">
            <h2 className="text-center mb-4 mt-4">فرم تعریف کاربر</h2>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="firstName" className="form-label">نام</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="lastName" className="form-label">نام خانوادگی</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="phoneNumber" className="form-label">شماره تلفن</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="telegramId" className="form-label">آیدی تلگرام</label>
                        <input
                            type="text"
                            className="form-control"
                            id="telegramId"
                            name="telegramId"
                            value={formData.telegramId}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="password" className="form-label">کلمه عبور</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="confirmPassword" className="form-label">تایید کلمه عبور</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-4">ثبت</button>
            </form>
        </div>
    );
};

export default UserForm;
