import React, { useState, useEffect } from 'react';
import SourceOrdersApi from '../../services/SourceOrdersApi';

const OrdersData = () => {
    useEffect(() => {
        SourceOrdersApi.getOrdersData()
            .then(data => {
            })
            .catch(error => {
                console.error('خطا در دریافت اطلاعات:', error);
            });
    }, []);


};

export default OrdersData;
