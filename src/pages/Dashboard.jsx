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

const Dashboard = () => {
  const [OrderStatistics, setOrderStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrderStatistics = async () => {
      try {
        const data = await ApiService.getOrderStatistics();
        console.log(data);
        setOrderStatistics(data);
      } catch (error) {
        console.error('Error fetching order statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    getOrderStatistics();
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
    title: 'آمار  سفارشات تلگرام',
    index: 3
  };
  const apiData = {
    background: 'bg-info',
    title: 'سفارشات pgemshop',
    index: 2
  };

  const segments = [
    { width: OrderStatistics ? (OrderStatistics.accepted_orders / OrderStatistics.total_orders) * 100 : 0, color: 'success', label: 'سفارشات تایید شده', value: OrderStatistics ? OrderStatistics.accepted_orders : 0 },
    { width: OrderStatistics ? (OrderStatistics.doing_orders / OrderStatistics.total_orders) * 100 : 0, color: 'warning', label: 'سفارشات در حال انجام', value: OrderStatistics ? OrderStatistics.doing_orders : 0 },
    { width: OrderStatistics ? (OrderStatistics.inOrder_orders / OrderStatistics.total_orders) * 100 : 0, color: 'secondary', label: 'سفارشات در انتظار', value: OrderStatistics ? OrderStatistics.inOrder_orders : 0 },
    { width: OrderStatistics ? (OrderStatistics.rejected_orders / OrderStatistics.total_orders) * 100 : 0, color: 'danger', label: 'سفارشات رد شده', value: OrderStatistics ? OrderStatistics.rejected_orders : 0 }
  ];

  const total_orders = OrderStatistics ? OrderStatistics.total_orders : 0;
  const accepted_orders = OrderStatistics ? OrderStatistics.accepted_orders : 0;
  const inOrder_orders = OrderStatistics ? OrderStatistics.inOrder_orders : 0;
  const rejected_orders = OrderStatistics ? OrderStatistics.rejected_orders : 0;
  const doing_orders = OrderStatistics ? OrderStatistics.doing_orders : 0;

  return (
    <div className="container">
      <div className="row justify-content-between align-items-center bg-white mb-2 rounded ">
        <div className="col-xl-12 col-md-12 col-12 mb-5 justify-content-center align-items-center mt-2">
          <div className="card h-100 justify-content-around">
            <div className="card-body justify-content-around">
              <h4 className="mb-0 fs-5">تعداد سفارشات روز</h4>
              <div className="row row-cols-lg-5  my-8 mb-4">
                <div className="col d-flex justify-content-around text-center text-info">
                  <div>
                    <h5 className="mb-3 fs-5 mt-3 justify-content-around">کل سفارشات</h5>
                    <div className="lh-1">
                      <h4 className="fs-5 fw-bold mb-0 ">100%</h4>
                      <span className="text-center fs-5">{total_orders}</span>
                    </div>
                  </div>
                </div>
                <div className="col text-center text-success">
                  <h5 className="mb-3 fs-5 mt-3 ">انجام شده</h5>
                  <div className="lh-1">
                    <h4 className="fs-5 fw-bold mb-0 ">
                      {total_orders !== 0 ? ((accepted_orders / total_orders) * 100).toFixed(2) : '0.00'}%
                    </h4>
                    <span>{accepted_orders}</span>
                  </div>
                </div>
                <div className="col text-center text-warning">
                  <h5 className="mb-3 fs-5 mt-3 ">در حال انجام</h5>
                  <div className="lh-1">
                    <h4 className="fs-5 fw-bold mb-0">
                      {total_orders !== 0 ? ((doing_orders / total_orders) * 100).toFixed(2) : '0.00'}%
                    </h4>
                    <span className="fs-5">{doing_orders}</span>
                  </div>
                </div>
                <div className="col text-center text-secondary">
                  <h5 className="mb-3 fs-5 mt-3 ">در انتظار</h5>
                  <div className="lh-1">
                    <h4 className="fs-5 fw-bold mb-0 ">
                      {total_orders !== 0 ? ((inOrder_orders / total_orders) * 100).toFixed(2) : '0.00'}%
                    </h4>
                    <span className="fs-5">{inOrder_orders}</span>
                  </div>
                </div>
                <div className="col text-center  text-danger">
                  <h5 className="mb-3 fs-5 mt-3 text-danger">رد شده</h5>
                  <div className="lh-1">
                    <h4 className="fs-5 fw-bold mb-0 ">
                      {total_orders !== 0 ? ((rejected_orders / total_orders) * 100).toFixed(2) : '0.00'}%
                    </h4>
                    <span className="fs-5">{rejected_orders}</span>
                  </div>
                </div>
              </div>
              <ProgressBar segments={segments} />
            </div>
          </div>
        </div>
        <div className="row rounded">
          <h4 className="fs-5">میانگین زمان انجام سفارش</h4>
          <div className="card-body text-center"></div>
          <div className="row mt-2 bg-light rounded mb-2  border mx-2">
        <Gauge />  
      </div>
        </div>
        <div className="row justify-content-between align-items-center bg-white mb-2 rounded mx-1">
          <div className="col-xl-8 border rounded-2 bg-light mb-3 mt-3">
            <div className="row justify-content-between align-content-center pb-0 mx-1 mt-3">
              <div className="col-4"> <CustomersApi data={botData} /></div>
              <div className="col-4"> <CustomersApi data={instaData} /></div>
              <div className="col-4"> <CustomersApi data={apiData} /></div>
              <hr className="mt-3"></hr>
            </div>
            <div className="row mt-1 mx-1">
              <h4>وضعیت سفارشات مشتریان</h4>
            </div>
            <div className="row bg-white mt-3 mx-1">
              <CustomersOrdersStatistics data={OrderStatistics ? OrderStatistics.customersData : []} />
            </div>
          </div>
          <div className="col-xl-4">
            <LineChart />
            <SaleCard />
          </div>
        </div>
        <div className="row mt-2  g-3 align-items-center rounded mb-2 bg-white mx-1">
          <h4 className="fs-5">عملکرد کارکنان</h4>
          <AdminsFunctional />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
