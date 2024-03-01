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
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OrderStatistics: null
    };
  }

  componentDidMount() {
    this.getOrderStatistics();
  }

  getOrderStatistics() {
    ApiService.getOrderStatistics()
      .then(OrderStatistics => {
        this.setState({ OrderStatistics });
      })
      .catch(error => {
        console.error('خطا در دریافت اطلاعات:', error);
      });
  }
  // تابع برای دریافت مقدار از کامپوننت فرزند
  handleAverageOrderTimeChange = (averageOrderTime) => {
    this.setState({ averageOrderTime });
  };
  render() {
    const instaData = {
      background: 'bg-danger',
      title: 'آمار سفارشات اینستاگرام',
      index:1
  };
    const botData = {
      background: 'bg-primary',
      title: 'آمار  سفارشات تلگرام',
      index:0

  };
    const apiData = {
      background: 'bg-info',
      title: 'آمار  سفارشات همکاران',
      index:2


  };
    const { OrderStatistics } = this.state;
    const segments = [
      { width: OrderStatistics ? (OrderStatistics.accepted_orders / OrderStatistics.total_orders) *100 : 0, color: 'success', label: 'سفارشات تایید شده', value: OrderStatistics ? OrderStatistics.accepted_orders : 0 },
      { width: OrderStatistics ? (OrderStatistics.doing_orders / OrderStatistics.total_orders) *100 : 0, color: 'warning', label: 'سفارشات در حال انجام', value: OrderStatistics ? OrderStatistics.doing_orders : 0 },
      { width: OrderStatistics ? (OrderStatistics.inOrder_orders / OrderStatistics.total_orders) *100 : 0, color: 'secondary', label: 'سفارشات در انتظار', value: OrderStatistics ? OrderStatistics.inOrder_orders : 0 },
      { width: OrderStatistics ? (OrderStatistics.rejected_orders / OrderStatistics.total_orders) *100 : 0, color: 'danger', label: 'سفارشات رد شده', value: OrderStatistics ? OrderStatistics.rejected_orders : 0 }
    ];
    const total_orders = this.state.OrderStatistics ? this.state.OrderStatistics.total_orders : 0;
    const accepted_orders = this.state.OrderStatistics ? this.state.OrderStatistics.accepted_orders : 0;
    const inOrder_orders = this.state.OrderStatistics ? this.state.OrderStatistics.inOrder_orders : 0;
    const rejected_orders = this.state.OrderStatistics ? this.state.OrderStatistics.rejected_orders : 0;
    const doing_orders = this.state.OrderStatistics ? this.state.OrderStatistics.doing_orders : 0;
    return (
      
        <div className="container">




          
          <div className="row justify-content-between align-items-center bg-white mb-2 rounded">
            <div className="col-xl-9 col-md-12 col-12 mb-5 justify-content-center align-items-center ">
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
                  {/* <div class="mt-6 mb-3">

                <div className="progress-bar bg-info" role="progressbar" aria-label="Segment one" style={{width: "35%"}} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                <div className="progress-bar bg-success" role="progressbar" aria-label="Segment two" style={{width: "40%"}} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                <div className="progress-bar bg-warning" role="progressbar" aria-label="Segment three" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>

                  </div> */}
               
 

                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 col-sm-12 justify-content-between align-items-center bg-light mb-5 rounded">
              <div className="row rounded">
                <div className="card h-100">
            <div className="card-body text-center">

                            <h4 className="fs-5">میانگین زمان انجام سفارش</h4>
            </div>
                </div>
                <Gauge  />
                          <span>{this.average}</span> 
              </div>
              <div></div>
            </div>
            
          </div>

            <div className="row mt-2 bg-light g-3  rounded mb-2 bg-white">
            <div className="col-xl-4">
              <SaleCard/>
            </div>
            <div className="col-xl-8 border rounded-2 bg-light mb-3 ">
              <div className="row justify-content-between align-content-center m-2 pb-0">
                
                <div className="col-4"> <CustomersApi  data={botData}/></div> 
                <div className="col-4"> <CustomersApi data={instaData}/></div>
                <div className="col-4"> <CustomersApi  data={apiData}/></div> 
           
            
              </div>
<div className="row bg-white mt-3">
  <h4>وضعیت سفارشات مشتریان</h4>
            <CustomersOrdersStatistics/>
</div>
            </div>
          </div>

        <div className="row mt-2 bg-light g-3 align-items-center rounded mb-2 bg-white">
        <h4 className="fs-5">عملکرد کارکنان</h4>

          <AdminsFunctional/>
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

        </div>
      

    );
  }
}

export default Dashboard;
