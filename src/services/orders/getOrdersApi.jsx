import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_TOKEN;

const getOrderList = {
  getData: async (from, to) => {
    const response = await fetch(`${API_URL}/orders/getOrdersList`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  },
  
  updateOrderStatus: async (orderId, newStatus) => {
    try {
      const response = await axios.post(`${API_URL}/orders/updateOrderStatus`, {
        orderId,
        status: newStatus
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error updating order status:", error);
      return null;
    }
  }
};

export default getOrderList;
