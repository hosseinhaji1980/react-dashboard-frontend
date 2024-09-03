import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_TOKEN;

const SourceOrdersApi = {
  getOrdersData: async () => {
    try {
      const response = await axios.get(`${API_URL}/orders/ordersData`,{
        headers: {
          Authorization: `Bearer ${token}` // جایگذاری توکن خود به جای yourToken
      }
      });
      return response.data;
    } catch (error) {
      throw new Error('خطا در دریافت اطلاعات');
    }
  }
};

export default SourceOrdersApi;
