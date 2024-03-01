// require('dotenv').config();
import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import About from "./pages/About.jsx";
import Analytics from "./pages/Analytics.jsx";
import Comment from "./pages/Comment.jsx";
import Orders from "./pages/Orders.jsx";
import ProductList from "./pages/ProductList.jsx";
import Settings from "./pages/Settings.jsx";
import Billing from "./pages/Billing.jsx";

class App extends Component {
  state = {};
  render() {
    return (
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path="/" element={<Dashboard />} />{" "}
            <Route path="/dashboard" element={<Dashboard />} />{" "}
            <Route path="/about" element={<About />} />{" "}
            <Route path="/comment" element={<Comment />} />{" "}
            <Route path="/analytics" element={<Analytics />} />{" "}
            <Route path="/orders" element={<Orders />} />{" "}
            <Route path="/productList" element={<ProductList />} />{" "}
            <Route path="/settings" element={<Settings />} />{" "}
            <Route path="/billing" element={<Billing />} />{" "}
          </Routes>{" "}
        </Sidebar>{" "}
      </BrowserRouter>
    );
  }
}

export default App;
