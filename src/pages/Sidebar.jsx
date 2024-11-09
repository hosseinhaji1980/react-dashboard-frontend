import React, { useState, useEffect } from 'react';
import {
    FaTh, FaBars, FaShoppingBag, FaCog, FaFileInvoiceDollar, FaInfoCircle, FaSignOutAlt,
    FaThList, FaUsers, FaReceipt, FaClipboardList, FaPercentage, FaWallet,
    FaMoneyCheckAlt, FaExchangeAlt, FaUserCog, FaGraduationCap, FaChevronLeft, FaChevronDown
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import '../App.css';
import '../css/Sidebar.css';
import paymentReceipts from '../services/paymentReceipts';

const Sidebar = ({ children, onLogout }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState(null); // Track the active submenu
    const [count, setCount] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await paymentReceipts.getData();
                if (response && response.length > 0) {
                    setCount(response[0].count);
                }
            } catch (err) {
                setError(err.message);
            }
        };
        fetchData();
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const toggleSubMenu = (menuName) => {
        setActiveMenu(activeMenu === menuName ? null : menuName);
    };

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
            badge: count
        },
        {
            path: "/admin-orders",
            name: "سفارشات ادمین",
            icon: <FaClipboardList />
        },
        {
            name: "مدیریت",
            icon: <FaCog />,
            chevron: isOpen && (activeMenu === "مدیریت" ? <FaChevronDown /> : <FaChevronLeft />),
            subMenu: [
                { path: "/settings/discount", name: "تعیین تخفیف همکاران", icon: <FaPercentage /> },
                { path: "/settings/create-wallet", name: "تعریف کیف پول", icon: <FaWallet /> },
                { path: "/settings/wallet", name: "مشاهده کیف پول", icon: <FaMoneyCheckAlt /> },
                { path: "/settings/charge-wallet", name: "شارژ و برداشت کیف پول", icon: <FaExchangeAlt /> },
                { path: "/settings/traksactions", name: "مشاهده تراکنش های کیف پول", icon: <FaExchangeAlt /> },
                { path: "/settings/users", name: "کاربران", icon: <FaUserCog /> },
                { path: "/settings/orders-status", name: "وضعیت های سفارش", icon: <FaGraduationCap /> },
                { path: "/settings/users", name: "وضعیت سفارشات", icon: <FaUserCog /> },
                { path: "/settings/educational-items", name: "آیتم های آموزشی", icon: <FaGraduationCap /> }
            ]
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
                        <FaBars onClick={toggleSidebar} />
                    </div>
                </div>
                {menuItem.map((item, index) => (
                    <div key={index}>
                        {item.subMenu ? (
                            <div className="link" onClick={() => toggleSubMenu(item.name)}>
                                <div className="icon">{item.icon}</div>
                                <div className="link_text">
                                    {isOpen ? item.name : ""}
                                    {item.badge !== undefined && item.badge > 0 && (
                                        <span className="badge">{item.badge}</span>
                                    )}
                                </div>
                                {item.chevron && <div className="chevron">{item.chevron}</div>}
                            </div>
                        ) : (
                            <NavLink to={item.path || "#"} className="link">
                                <div className="icon">{item.icon}</div>
                                <div className="link_text">
                                    {isOpen ? item.name : ""}
                                    {item.badge !== undefined && item.badge > 0 && (
                                        <span className="badge">{item.badge}</span>
                                    )}
                                </div>
                            </NavLink>
                        )}
                        {item.subMenu && activeMenu === item.name && isOpen && (
                            <div className="submenu">
                                {item.subMenu.map((subItem, subIndex) => (
                                    <NavLink to={subItem.path} key={subIndex} className="link">
                                        <div className="icon">{subItem.icon}</div>
                                        <div className="link_text">{subItem.name}</div>
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>
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
