import React, { useState, useEffect } from 'react';
import {
    FaTh,
    FaBars,
    FaShoppingBag,
    FaCog,
    FaFileInvoiceDollar,
    FaInfoCircle,
    FaSignOutAlt,FaThList,FaUsers,
    FaReceipt,FaClipboardList
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import '../App.css';
import paymentReceipts from '../services/paymentReceipts';

const Sidebar = ({ children, onLogout }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState(null); // To track the active menu
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
            badge: count // مقدار count اینجا قرار دارد اما باید به صورت بصری نمایش داده شود
        }
        ,
        {
            path: "/admin-orders",
            name: "سفارشات ادمین",
            icon: <FaClipboardList />
        },
        {
            name: "مدیریت",
            icon: <FaCog />,
            // path: "/settings",
            subMenu: [
                {
                    path: "/settings/discount",
                    name: "تعیین تخفیف همکاران",
                    className:"submenu",
                    icon:<FaCog/>
                },
                {
                    path: "/settings/create-wallet",
                    name: "تعریف کیف پول",
                    className:"submenu",
                    icon:<FaCog/>
                }
                ,
                {
                    path: "/settings/wallet",
                    name: "مشاهده کیف پول",
                    className:"submenu",
                    icon:<FaCog/>
                }
                ,
                {
                    path: "/settings/charge-wallet",
                    name: "شارژ و برداشت کیف پول",
                    className:"submenu",
                    icon:<FaCog/>
                },
                {
                    path: "/settings/traksactions",
                    name: "شارژ و برداشت کیف پول",
                    className:"submenu",
                    icon:<FaCog/>
                }
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
                        <FaBars onClick={() => setIsOpen(!isOpen)} />
                    </div>
                </div>
                {menuItem.map((item, index) => (
    <div key={index}>
        {item.subMenu ? (
            <div className="link" onClick={() => setActiveMenu(activeMenu === item.name ? null : item.name)}>
                <div className="icon">{item.icon}</div>
                <div className="link_text">
                    {isOpen ? item.name : ""}
                    {item.badge !== undefined && item.badge > 0 && (
                        <span className="badge">{item.badge}</span> // نمایش مقدار badge
                    )}
                </div>
            </div>
        ) : (
            <NavLink 
                to={item.path || "#"} 
                className={`link ${activeMenu === item.name ? "active" : ""}`}
            >
                <div className="icon">{item.icon}</div>
                <div className="link_text">
                    {isOpen ? item.name : ""}
                    {item.badge !== undefined && item.badge > 0 && (
                        <span className="badge">{item.badge}</span> // نمایش مقدار badge
                    )}
                </div>
            </NavLink>
        )}
        {item.subMenu && activeMenu === item.name && isOpen && (
            <div className="submenu">
                {item.subMenu.map((subItem, subIndex) => (
                    <NavLink to={subItem.path} key={subIndex} className="link" activeClassName="active">
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