import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Chart from "../components/Chart";
import Gauge from "../components/Gauge";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import ProgressBar from '../components/ProgressBar';
import ApiService from '../services/orders/apiService';
import SaleCard from '../components/Sales/SaleCard';
import CustomersApi from '../components/SourceSaleStatistics/Main';
import CustomersOrdersStatistics from "../components/SourceSaleStatistics/CustomersOrdersStatistics";
import AdminsFunctional from "../components/Dashboard/AdminsFunctional";
import SalesChart from './../components/Sales/SalesChart';
import MyComponent from '../components/Barchart/MyComponent';
import { ClipLoader } from 'react-spinners';
import OrderStatistics from '../components/OrderStatistics'; // Import کامپوننت جداگانه

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // شبیه‌سازی زمان بارگذاری برای نمایش اسپینر
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    );
  }

  const instaData = {
    background: 'bg-danger',
    title: 'آمار سفارشات اینستاگرام',
    index: 1
  };
  const botData = {
    background: 'bg-primary',
    title: 'آمار سفارشات تلگرام',
    index: 3
  };
  const apiData = {
    background: 'bg-info',
    title: 'سفارشات pgemshop',
    index: 2
  };

  return (
    <div className="container">
      <div className="row">
        <OrderStatistics /> {/* استفاده از کامپوننت OrderStatistics */}
      </div>
  
        <div className="row rounded mt-3 bg-light">
          <h4 className="fs-5 mt-3">میانگین زمان انجام سفارش</h4>
          <Gauge />

        </div>
        <div className="row rounded mt-3 bg-light">
          <div className="col-6 col-xl-4 col-md-12">
        <LineChart />

          </div>
          <div className="col-12 col-xl-4 col-md-12"></div>
          <div className="col-12 col-xl-4 col-md-12"></div>

        </div>
        <div className="row justify-content-between align-items-center bg-white mb-2 rounded mt-3">
          <div className="col-xl-8 border rounded-2 bg-light mb-3 mt-3">
            <div className="row justify-content-center align-content-center pb-0 mx-1 mt-3">
            <h4 className="fs-5 mt-3">میانگین زمان انجام سفارش</h4>

            <div className="col-12 col-md-6 col-auto"> <CustomersApi data={botData} /></div>
            {/* <div className="col-12 col-md-6 col-auto"> <CustomersApi data={instaData} /></div> */}
            <div className="col-12 col-md-6 col-auto"> <CustomersApi data={apiData} /></div> 

            </div>
            <div className="row mt-3  bg-light">
              <h4>وضعیت سفارشات مشتریان</h4>
            </div>
            <div className="row bg-white mt-3 ">
              <CustomersOrdersStatistics data={[]} />
            </div>
          </div>
          <div className="col-xl-4">
            <LineChart />
            <SaleCard />
          </div>
        </div>
        <div className="row mt-3  align-items-center rounded mb-2 bg-white">
          <h4 className="fs-5 mt-3">عملکرد کارکنان</h4>
          <AdminsFunctional />
        </div>
    </div>
  );
};

export default Dashboard;
