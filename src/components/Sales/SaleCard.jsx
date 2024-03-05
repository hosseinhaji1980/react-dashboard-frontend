import React,{useState} from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { FcSalesPerformance } from 'react-icons/fc';
import GradientLine from '../GradientLineChart';
import BestSellingProductComponent from '../BestSellingProduct';
import moment from 'moment';
import JDate from '../Jdate';
import PeriodButtons from './PeriodButtons';
const SalesCard = () => {

  // تابعی که برای تنظیم وضعیت period از داخل PeriodButtons فراخوانی می‌شود

    moment.locale('fa', {
      week: {
        dow: 1,
      },
    });
const currentDate = new Date();

  const formattedDate = moment(currentDate).format('dddd jYYYY/jMM/jDD');
  const data = [31, 40, 28, 51, 42, 109, 100]; // Your data object


  return (
    <div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card card overflow-hidden mb-4">
            <div className="card-body p-4">
              <div className="row">
                <div className="col">
                <PeriodButtons/>
                  {/* <h5 className="card-title fs-4 fw-semibold">میزان فروش</h5> */}
                </div>
                {/* <div className="col text-end text-primary fs-4 fw-semibold">
                  163,000 تومان
                <span></span>
                </div> */}

              </div>
              <div className="card-subtitle fw-normal text-body-secondary mt-3">
                <h6><JDate date={formattedDate} /></h6>
                {/* <GradientLine data={data} /> */}
                {/* <GradientLine /> */}

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
