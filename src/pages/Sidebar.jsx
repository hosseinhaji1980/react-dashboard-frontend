import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
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
import { IoSettingsOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import '../App.css';

const Sidebar = ({ children, onLogout }) => {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
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
            name: "رسیدهای پرداختی مشتریان",
            icon: <FaReceipt />
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
                        <div className="icon">{item.icon}</div>
                        <div className="link_text">{isOpen ? item.name : ""}</div>
                    </NavLink>
                ))}
                <div className="link" onClick={onLogout}>
                    <div className="icon"><FaSignOutAlt  /></div>
                    <div className="link_text">{isOpen ? "خروج" : ""}</div>
                </div>
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;
