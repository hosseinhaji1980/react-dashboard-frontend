import axios from 'axios';

const getProductList = {
  getData: async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products/getProductList');
      return response.data.data;
    } catch (error) {
      throw new Error('خطا در دریافت اطلاعات');
    }
  }
};

export default getProductList;
