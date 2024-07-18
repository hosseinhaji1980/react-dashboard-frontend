import React, { useState, useEffect } from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { FcSalesPerformance } from 'react-icons/fc';
import GradientLine from '../GradientLineChart';
import BestSellingProductComponent from '../BestSellingProduct';
import JDate from '../Date/Jdate';
import PeriodButtons from './PeriodButtons';
import FetchSales from '../../services/sales/fetchSales';

const SalesCard = () => {
  const [period, setPeriod] = useState('daily');
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FetchSales.getData(period);
        setSalesData(response.data.data || []);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchData();
  }, [period]);

  // Extract today's sales from salesData
  const todaysSales = salesData.length > 0 ? salesData[salesData.length - 1].total_sales : 0;
  const formattedSales = new Intl.NumberFormat('fa-IR').format(todaysSales) + ' تومان';

  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card card overflow-hidden mb-4">
            <div className="card-body p-4">
              <div className="row">
                <div className="col">
                  {/* <PeriodButtons setPeriod={setPeriod} /> */}
                </div>
              </div>
              <div className="card-subtitle fw-normal text-body-secondary mt-3">
                <h6><JDate /></h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
      </div>
      <div className="row d-flex">
        <div className="col-sm-6 mb-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h6>تعداد مشتریان</h6>
                <div className="bg-primary bg-opacity-25 text-primary rounded fs-5 p-2 ms-1">
                  <FaUserFriends />
                </div>
              </div>
              <div>
                158
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 mb-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h6>میزان فروش امروز</h6>
                <div className="bg-primary bg-opacity-25 text-primary rounded fs-5 p-2 ms-1">
                  <FcSalesPerformance />
                </div>
              </div>
              <div>
                <h5>{formattedSales}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <BestSellingProductComponent />
      </div>
    </div>
  );
};

export default SalesCard;
