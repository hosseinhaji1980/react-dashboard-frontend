import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_TOKEN;

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
};
const getOrderStatuses = async () => { 
    try {
        const response = await axios.get(`${API_URL}/status/order-statuses`, config);
        return response.data;
      } catch (error) {
        console.error("خطا در دریافت لیست وضعیت سفارشات:", error);
        throw error;
      }
    };

    const addOrderStatus = async (statusData) => {
        try {
            console.log(statusData);
            const response = await axios.post(`${API_URL}/status/order-statuses`, statusData, config);
            return response.data;
          } catch (error) {
            console.error("خطا در اضافه کردن وضعیت سفارش:", error);
            throw error;
          }
    };
    const updateOrderStatus = async (id, updatedData) => { 
        try {
            const response = await axios.put(`${API_URL}/status/order-statuses/${id}`, updatedData, config);
            return response.data;
          } catch (error) {
            console.error("خطا در ویرایش وضعیت سفارش:", error);
            throw error;
          } 
        
        
    };
    const deleteOrderStatus = async (id) => { 
        
        try {
            const response = await axios.delete(`${API_URL}/status/order-statuses/${id}`, config);
            return response.data;
          } catch (error) {
            console.error("خطا در حذف وضعیت سفارش:", error);
            throw error;
          }
    };
    
    export default {
        getOrderStatuses,
        addOrderStatus,
        updateOrderStatus,
        deleteOrderStatus
      };