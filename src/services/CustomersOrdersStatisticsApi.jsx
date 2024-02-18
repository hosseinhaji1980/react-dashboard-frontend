import axios from 'axios';
const cutstomersorderstatistics = {
    getData: async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders/cutstomersorderstatistics');
console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error('خطا در دریافت اطلاعات');
    }
  }
};
export default cutstomersorderstatistics;
