import React, { useState, useEffect } from 'react';
import {
    FaTh,
    FaBars,
    FaShoppingBag,
    FaThList,
    FaSignOutAlt,
    FaCog,
    FaClipboardList,
    FaUsers,
    FaFileInvoiceDollar,
    FaInfoCircle,
    FaReceipt
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import '../App.css';
import paymentReceipts from '../services/paymentReceipts';

const Sidebar = ({ children, onLogout }) => {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    const [count, setCount] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await paymentReceipts.getData();
                console.log(response);
                if (response && response.length > 0) {
                    setCount(response[0].count); // مقدار count از response
                }
            } catch (err) {
                setError(err.message);
                console.error("خطا در دریافت داده:", err);
            }
        };

        fetchData();
    }, []);

    const menuItem = [
        {
            path: "/dashboard",
            name: "داشبورد",
            icon: <FaTh />
        },
        {
            path: "/orders",
            name: "سفارشات",
            icon: <FaShoppingBag />
        },
        {
            path: "/productList",
            name: "لیست محصولات",
            icon: <FaThList />
        },
        {
            path: "/customer-functional",
            name: "عملکرد مشتریان",
            icon: <FaUsers />
        },
        {
            path: "/customer-receipts",
            name: "رسیدهای مشتریان",
            icon: <FaReceipt />,
            badge: count // نمایش مستقیم مقدار count
        },
        {
            path: "/admin-orders",
            name: "سفارشات ادمین",
            icon: <FaClipboardList />
        },
        {
            path: "/settings",
            name: "تنظیمات",
            icon: <FaCog />
        },
        {
            path: "/billing",
            name: "حسابداری",
            icon: <FaFileInvoiceDollar />
        },
        {
            path: "/about",
            name: "درباره ما",
            icon: <FaInfoCircle />
        }
    ];

    return (
        <div className={`container-fluid ${isOpen ? "open" : "closed"}`}>
            <div className="sidebar">
                <div className="top_section">
                    <div className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {menuItem.map((item, index) => (
                    <NavLink to={item.path} key={index} className="link" activeClassName="active">
                        <div className="icon">
                            {item.icon}
                        </div>
                        <div className="link_text">{isOpen ? item.name : ""}</div>
                        {item.badge > 0 && (
                            <span className="badge">{item.badge}</span>
                        )}
                    </NavLink>
                ))}

                <div className="link" onClick={onLogout}>
                    <div className="icon"><FaSignOutAlt /></div>
                    <div className="link_text">{isOpen ? "خروج" : ""}</div>
                </div>
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;
