import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const bestSellingProduct = {
    getbestSellingProduct: async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/best-selling-product');
        return response.data;
      } catch (error) {
        throw new Error('خطا در دریافت اطلاعات');
      }
    }
  };
  
  export default bestSellingProduct;
  