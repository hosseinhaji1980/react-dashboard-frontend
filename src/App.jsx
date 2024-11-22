import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from "./pages/Sidebar";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import CustomerFunctional from "./pages/CustomerFunctional";
import Comment from "./pages/Comment";
import Orders from "./pages/Orders";
import ProductList from "./pages/ProductList";
import Settings from "./pages/Settings";
import Billing from "./pages/Billing";
import Login from "./pages/Login";
import AdminOrders from "./pages/AdminOrders";
import CustomerReceipts from './pages/CustomerReceipts';
import Discount from './pages/Discount';
import Wallet from './pages/Wallet';
import CreateWallet from './components/Wallet/CreateWallet';
import OrdersStatus from './pages/OrdersStatus';
import WalletsTransactions from './pages/WalletsTransactions';
import User from "./pages/Users";
import OrderDetails from './components/Orders//OrderDetails';
import UsersCredit from "./pages/UsersCredit";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [hamburgerVisible, setHamburgerVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
        setHamburgerVisible(true);
      } else {
        setIsSidebarOpen(true);
        setHamburgerVisible(false);
      }
    };

    checkScreenSize();

    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }

    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, [location]);

  useEffect(() => {
    const lastVisitedPage = localStorage.getItem("lastVisitedPage");
    if (lastVisitedPage && isLoggedIn) {
      navigate(lastVisitedPage);
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('ownerid');
    setIsLoggedIn(false);
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <>
      {hamburgerVisible && (
        <button className="hamburger-menu" onClick={toggleSidebar}>
          ☰
        </button>
      )}
      <Sidebar 
        onLogout={handleLogout} 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar}
      >
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/comment" element={<Comment />} />
          <Route path="/customer-functional" element={<CustomerFunctional />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/discount" element={<Discount />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/admin-orders" element={<AdminOrders />} />
          <Route path="/customer-receipts" element={<CustomerReceipts />} />
          <Route path="/settings/wallet" element={<Wallet />} />
          <Route path="/settings/wallets-transaction" element={<WalletsTransactions />} />
          <Route path="/settings/users-credit" element={<UsersCredit />} />
          <Route path="/settings/create-wallet" element={<CreateWallet />} />
          <Route path="/settings/users" element={<User />} />
          <Route path="/settings/orders-status" element={<OrdersStatus />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
          <Route path="/orders/:orderId" element={<OrderDetails />} />
        </Routes>
      </Sidebar>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
