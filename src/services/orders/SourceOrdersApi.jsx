import axios from 'axios';

const SourceOrdersApi = {
  getOrdersData: async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders/ordersData');
      return response.data;
    } catch (error) {
      throw new Error('خطا در دریافت اطلاعات');
    }
  }
};

export default SourceOrdersApi;
