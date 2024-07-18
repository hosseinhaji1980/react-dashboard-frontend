import React, { Component } from "react";
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

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OrderStatistics: null,
      loading: true
    };
  }

  componentDidMount() {
    this.getOrderStatistics();
  }

  getOrderStatistics() {
    ApiService.getOrderStatistics()
      .then(OrderStatistics => {
        this.setState({ OrderStatistics, loading: false });
      })
      .catch(error => {
        console.error('خطا در دریافت اطلاعات:', error);
        this.setState({ loading: false });
      });
  }

  handleAverageOrderTimeChange = (averageOrderTime) => {
    this.setState({ averageOrderTime });
  };

  render() {
    const { OrderStatistics, loading } = this.state;

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
            <div class="card h-100 justify-content-around">
              <div class="card-body justify-content-around">
                <h4 class="mb-0 fs-5">تعداد سفارشات روز</h4>
                <div class="row row-cols-lg-5  my-8 mb-4">
                  <div class="col d-flex justify-content-around text-center text-info">
                    <div>
                      <h5 class="mb-3 fs-5 mt-3 justify-content-around">کل سفارشات</h5>
                      <div class="lh-1">
                        <h4 class="fs-5 fw-bold mb-0 ">100%</h4>
                        <span className=" text-center fs-5">{total_orders}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col text-center text-success ">
                    <h5 class="mb-3 fs-5 mt-3 ">انجام شده</h5>
                    <div class="lh-1">
                      <h4 class="fs-5 fw-bold  mb-0 ">
                        {total_orders !== 0 ? ((accepted_orders / total_orders) * 100).toFixed(2) : '0.00'}%
                      </h4>
                      <span >{accepted_orders}</span>
                    </div>
                  </div>
                  <div class="col text-center text-warning">
                    <h5 class="mb-3 fs-5 mt-3 ">در حال انجام</h5>
                    <div class="lh-1">
                      <h4 class="fs-5 fw-bold  mb-0">
                        {total_orders !== 0 ? ((doing_orders / total_orders) * 100).toFixed(2) : '0.00'}%
                      </h4>
                      <span class="fs-5" >{doing_orders}</span>
                    </div>
                  </div>
                  <div class="col text-center text-secondary">
                    <h5 class="mb-3 fs-5 mt-3 ">در انتظار</h5>
                    <div class="lh-1">
                      <h4 class="fs-5 fw-bold  mb-0 ">
                        {total_orders !== 0 ? ((inOrder_orders / total_orders) * 100).toFixed(2) : '0.00'}%
                      </h4>
                      <span class="fs-5">{inOrder_orders}</span>
                    </div>
                  </div>
                  <div class="col text-center  text-danger">
                    <h5 class="mb-3 fs-5 mt-3 text-danger">رد شده</h5>
                    <div class="lh-1">
                      <h4 class="fs-5 fw-bold mb-0 ">
                        {total_orders !== 0 ? ((rejected_orders / total_orders) * 100).toFixed(2) : '0.00'}%
                      </h4>
                      <span class="fs-5">{rejected_orders}</span>
                    </div>
                  </div>
                </div>
                <ProgressBar segments={segments} />
                <div>
                  {/* <OrderStatistics /> */}
                </div>
              </div>
            </div>
          </div>
          <div className="row rounded">
            <h4 className="fs-5">میانگین زمان انجام سفارش</h4>
            <div className="card-body text-center"></div>
            <div className="col-xl-4 col-md-6 col-sm-12 justify-content-between align-items-center bg-light mb-5 rounded text-center">
              <h6>میانگین زمانی انجام سفارشات روزانه</h6>
              <Gauge period="daily" />
            </div>
            <div className="col-xl-4 col-md-6 col-sm-12 justify-content-between align-items-center bg-light mb-5 rounded text-center">
              <h6>میانگین زمانی انجام سفارشات هفتگی</h6>
              <Gauge period="weekly" />
            </div>
            <div className="col-xl-4 col-md-6 col-sm-12 justify-content-between align-items-center bg-light mb-5 rounded text-center">
              <h6>میانگین زمانی انجام سفارشات ماهانه</h6>
              <Gauge period="monthly" />
            </div>
          </div>
          <div className="row mt-2 bg-light g-3  rounded mb-2 bg-white border">
            <div className="col-xl-8 border rounded-2 bg-light mb-3 ">
              <div className="row justify-content-between align-content-center m-2 pb-0">
                <div className="col-4"> <CustomersApi data={botData} /></div>
                <div className="col-4"> <CustomersApi data={instaData} /></div>
                <div className="col-4"> <CustomersApi data={apiData} /></div>
                <hr className="mt-3"></hr>
              </div>
              <div className="row mt-1 mx-1">
                <h4>وضعیت سفارشات مشتریان</h4>
              </div>
              <div className="row bg-white mt-3 mx-1">
                <CustomersOrdersStatistics />
              </div>
            </div>
            <div className="col-xl-4">
              <LineChart />
              <SaleCard />
            </div>
          </div>
          <div className="row mt-2 bg-light g-3 align-items-center rounded mb-2 bg-white">
            <h4 className="fs-5">عملکرد کارکنان</h4>
            <AdminsFunctional />
          </div>
          <div className="row mt-2 bg-light g-3 align-items-center rounded mb-2">
            <div className="col border mx-2">
              <LineChart />
            </div>
            <div className="col border mx-2">
              <BarChart />
            </div>
            <div className="col border mx-2">
              <PieChart />
            </div>
          </div>
          <div className="row">
            <SalesChart />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
