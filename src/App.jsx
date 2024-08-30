import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Analytics from "./pages/Analytics";
import Comment from "./pages/Comment";
import Orders from "./pages/Orders";
import ProductList from "./pages/ProductList";
import Settings from "./pages/Settings";
import Billing from "./pages/Billing";
import Login from "./pages/Login";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  state = {
    isLoggedIn: false,
  };

  handleLogin = () => {
    this.setState({ isLoggedIn: true });
  };

  handleLogout = () => {
    this.setState({ isLoggedIn: false });
  };

  render() {
    return (
      <BrowserRouter>
        {this.state.isLoggedIn ? (
          <Sidebar onLogout={this.handleLogout}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/comment" element={<Comment />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/productList" element={<ProductList />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </Sidebar>
        ) : (
          <Routes>
            <Route path="/" element={<Login onLogin={this.handleLogin} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </BrowserRouter>
    );
  }
}

export default App;
