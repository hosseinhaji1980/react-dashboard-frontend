import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import "./App.css";
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
import 'bootstrap/dist/css/bootstrap.min.css';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

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

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <Sidebar onLogout={handleLogout}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/comment" element={<Comment />} />
        <Route path="/customer-functional" element={<CustomerFunctional />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/productList" element={<ProductList />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/admin-orders" element={<AdminOrders />} />
        <Route path="/customer-receipts" element={<CustomerReceipts />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Sidebar>
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
