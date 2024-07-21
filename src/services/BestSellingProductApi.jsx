import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const bestSellingProduct = {
    getbestSellingProduct: async () => {
      try {
        const response = await axios.get(`${API_URL}/products/best-selling-roduct`);

        return response.data;
      } catch (error) {
        throw new Error('خطا در دریافت اطلاعات');
      }
    }
  };
  
  export default bestSellingProduct;
  