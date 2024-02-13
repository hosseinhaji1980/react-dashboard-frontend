import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    
    FaShoppingBag,
    FaThList
}from "react-icons/fa";
import { IoSettingsOutline
     
} from "react-icons/io5";


import { NavLink } from 'react-router-dom';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(true);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"داشبورد",
            icon:<FaTh/>
        },
        {
            path:"/orders",
            name:"سفارشات",
            icon:<FaShoppingBag/>
        },
        {
            path:"/productList",
            name:"لیست محصولات",
            icon:<FaThList/>
        },
        {
            path:"/analytics",
            name:"آمار",
            icon:<FaRegChartBar/>
        },
        {
            path:"/settings",
            name:"تنظیمات",
            icon:<IoSettingsOutline/>
        },
        {
            path:"/billing",
            name:"حسابداری",
            icon:<FaRegChartBar/>
        },
        
        {
            path:"/about",
            name:"درباره ما",
            icon:<FaUserAlt/>
        }
    ]
    return (
        <div className="container-fluid">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   {/* <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1> */}
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;