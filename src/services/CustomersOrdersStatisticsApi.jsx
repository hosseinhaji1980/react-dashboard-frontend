import axios from 'axios';
const cutstomersorderstatistics = {
    getCutstomersorderstatistics: async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/orders/cutstomersorderstatistics');
      return response.data;
    } catch (error) {
      throw new Error('خطا در دریافت اطلاعات');
    }
  }
};
export default cutstomersorderstatistics;
