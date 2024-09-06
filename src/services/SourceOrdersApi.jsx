import axios from 'axios';
const token = process.env.REACT_APP_TOKEN;

const API_URL = process.env.REACT_APP_API_URL;
const SourceOrdersApi = {
  getOrdersData: async () => {
    try {
    const response = await axios.get(`${API_URL}/orders/ordersData`,{
      headers: {
        Authorization: `Bearer ${token}` // جایگذاری توکن خود به جای yourToken
    }
    });
    console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error('خطا در دریافت اطلاعات');
    }
  }
};

export default SourceOrdersApi;
