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
  export const fetchOrderNotes = async (orderId) => {
    try {
      const response = await axios.get(`${API_URL}/orders/get-notes/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      return response.data.data;
    } catch (error) {
      console.error('Error fetching order notes:', error);
      throw new Error('Error fetching order notes');
    }
  };
  export const updateOrderStatus = async (orderId) => {
    try {
      const response = await axios.get(`${API_URL}/orders/get-notes/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      return response.data.data;
    } catch (error) {
      console.error('Error fetching order notes:', error);
      throw new Error('Error fetching order notes');
    }
  };