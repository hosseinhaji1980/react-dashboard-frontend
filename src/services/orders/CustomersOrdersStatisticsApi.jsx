import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const cutstomersorderstatistics = {
    getData: async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders/cutstomersorderstatistics');
      return response.data;
    } catch (error) {
      throw new Error('خطا در دریافت اطلاعات');
    }
  }
};
export default cutstomersorderstatistics;
