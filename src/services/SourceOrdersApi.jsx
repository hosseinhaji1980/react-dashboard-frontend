import axios from 'axios';
require('dotenv').config();

const API_URL = process.env.REACT_APP_API_URL;
const SourceOrdersApi = {
  getOrdersData: async () => {
    try {
      const response = await axios.get(`${API_URL}/orders/ordersData`);
      return response.data;
    } catch (error) {
      throw new Error('خطا در دریافت اطلاعات');
    }
  }
};

export default SourceOrdersApi;
