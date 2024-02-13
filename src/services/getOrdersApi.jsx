import axios from 'axios';

const getOrderList = {
  getData: async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/orders/getOrdersList');
      return response.data;
    } catch (error) {
      throw new Error('خطا در دریافت اطلاعات');
    }
  }
};

export default getOrderList;
