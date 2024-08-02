import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
export const fetchOrdersByCustomerAndDateRange = async (customerName, startDate, endDate, orderStatus) => {    
    console.log(customerName);
    const response = await fetch(`${API_URL}/orders/ordersByCustomerAndDateRange?customerName=${customerName}&startDate=${startDate}&endDate=${endDate}&orderStatus=${orderStatus}`);
    
    if (!response.ok) {
      throw new Error('Error fetching orders');
    }
    
    const data = await response.json();
    console.log(data.data);
    return data.data;
  };
  