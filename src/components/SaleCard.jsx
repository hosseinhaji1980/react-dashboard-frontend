import React from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { FcSalesPerformance } from 'react-icons/fc';
import GradientLine from './GradientLineChart';
import BestSellingProductComponent from './BestSellingProduct';
const SalesCard = () => {
  return (
    <div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card card overflow-hidden mb-4">
            <div className="card-body p-4">
              <div className="row">
                <div className="col">
                  <h5 className="card-title fs-4 fw-semibold">میزان فروش</h5>
                </div>
                <div className="col text-end text-primary fs-4 fw-semibold">
                  163,000 تومان
                </div>
              </div>
              <div className="card-subtitle fw-normal text-body-secondary mt-3">
                <h6>چهارشنبه مورخ 1402/12/11</h6>
                    <GradientLine/>
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
                1,582,225
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <BestSellingProductComponent/>

      </div>
    </div>
  );
};

export default SalesCard;
