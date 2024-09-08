import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_TOKEN;

export const fetchOrdersByCustomerAndDateRange = async (customerName, startDate, endDate, orderStatus) => {    
    const response = await fetch(`${API_URL}/orders/ordersByCustomerAndDateRange?customerName=${customerName}&startDate=${startDate}&endDate=${endDate}&orderStatus=${orderStatus}`,{
      headers: {
        Authorization: `Bearer ${token}`, // اضافه کردن توکن در هدر
    }
    });
    
    if (!response.ok) {
      throw new Error('Error fetching orders');
    }
    
    const data = await response.json();
    return data.data;
  };
  