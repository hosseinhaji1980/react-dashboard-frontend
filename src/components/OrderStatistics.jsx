import React, { useState, useEffect } from "react";
import ApiService from "../services/orders/apiService";
import { ClipLoader } from "react-spinners";
import ProgressBar from "../components/ProgressBar";

const OrderStatus = () => {
  const [orderStatistics, setOrderStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderStatistics = async () => {
      try {
        const data = await ApiService.getOrderStatistics();
        setOrderStatistics(data);
      } catch (error) {
        console.error("Error fetching order statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderStatistics();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    );
  }

  const total_orders = orderStatistics ? orderStatistics.total_orders : 0;
  const accepted_orders = orderStatistics ? orderStatistics.accepted_orders : 0;
  const inOrder_orders = orderStatistics ? orderStatistics.inOrder_orders : 0;
  const rejected_orders = orderStatistics ? orderStatistics.rejected_orders : 0;
  const doing_orders = orderStatistics ? orderStatistics.doing_orders : 0;

  const segments = [
    { width: orderStatistics ? (orderStatistics.accepted_orders / orderStatistics.total_orders) * 100 : 0, color: "success", label: "سفارشات تایید شده", value: accepted_orders },
    { width: orderStatistics ? (orderStatistics.doing_orders / orderStatistics.total_orders) * 100 : 0, color: "warning", label: "سفارشات در حال انجام", value: doing_orders },
    { width: orderStatistics ? (orderStatistics.inOrder_orders / orderStatistics.total_orders) * 100 : 0, color: "secondary", label: "سفارشات در انتظار", value: inOrder_orders },
    { width: orderStatistics ? (orderStatistics.rejected_orders / orderStatistics.total_orders) * 100 : 0, color: "danger", label: "سفارشات رد شده", value: rejected_orders },
  ];

  return (
    <div className="card h-100 justify-content-around">
      <div className="card-body justify-content-around">
        <h4 className="mb-0 fs-5">تعداد سفارشات روز</h4>
        <div className="row row-cols-lg-5 my-8 mb-4">
          <div className="col d-flex justify-content-around text-center text-info">
            <div>
              <h5 className="mb-3 fs-5 mt-3 justify-content-around">کل سفارشات</h5>
              <div className="lh-1">
                <h4 className="fs-5 fw-bold mb-0">100%</h4>
                <span className="text-center fs-5">{total_orders}</span>
              </div>
            </div>
          </div>
          <div className="col text-center text-success">
            <h5 className="mb-3 fs-5 mt-3">انجام شده</h5>
            <div className="lh-1">
              <h4 className="fs-5 fw-bold mb-0">{total_orders !== 0 ? ((accepted_orders / total_orders) * 100).toFixed(2) : "0.00"}%</h4>
              <span>{accepted_orders}</span>
            </div>
          </div>
          <div className="col text-center text-warning">
            <h5 className="mb-3 fs-5 mt-3">در حال انجام</h5>
            <div className="lh-1">
              <h4 className="fs-5 fw-bold mb-0">{total_orders !== 0 ? ((doing_orders / total_orders) * 100).toFixed(2) : "0.00"}%</h4>
              <span className="fs-5">{doing_orders}</span>
            </div>
          </div>
          <div className="col text-center text-secondary">
            <h5 className="mb-3 fs-5 mt-3">در انتظار</h5>
            <div className="lh-1">
              <h4 className="fs-5 fw-bold mb-0">{total_orders !== 0 ? ((inOrder_orders / total_orders) * 100).toFixed(2) : "0.00"}%</h4>
              <span className="fs-5">{inOrder_orders}</span>
            </div>
          </div>
          <div className="col text-center text-danger">
            <h5 className="mb-3 fs-5 mt-3 text-danger">رد شده</h5>
            <div className="lh-1">
              <h4 className="fs-5 fw-bold mb-0">{total_orders !== 0 ? ((rejected_orders / total_orders) * 100).toFixed(2) : "0.00"}%</h4>
              <span className="fs-5">{rejected_orders}</span>
            </div>
          </div>
        </div>
        <ProgressBar segments={segments} />
      </div>
    </div>
  );
};

export default OrderStatus;
