import axios from 'axios';

const bestSellingProduct = {
    getbestSellingProduct: async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products/best-selling-roduct');
        return response.data;
      } catch (error) {
        throw new Error('خطا در دریافت اطلاعات');
      }
    }
  };
  
  export default bestSellingProduct;
  