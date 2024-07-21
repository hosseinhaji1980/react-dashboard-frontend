import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const getProductList = {
  getData: async () => {
    try {
      const response = await axios.get(`${API_URL}/products/getProductList`);
      return response.data.data;
    } catch (error) {
      throw new Error('خطا در دریافت اطلاعات');
    }
  }
};

export default getProductList;
