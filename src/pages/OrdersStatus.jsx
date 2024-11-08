import React, { Component } from 'react';
import CreateStatus from '../components/Orders/Status/CreateStatus';
import ViewStatuses from '../components/Orders/Status/ViewStatuses';
const OrdersStatus=()=>{
    
    return (
        <div className="container bg-light rounded-2">
      <h2 className='mt-3'>اضافه کردن وضعیت سفارش</h2>
      
          <div className="row mt-3">
            <ViewStatuses/>
          </div>
        </div>
      );
}
export default OrdersStatus;