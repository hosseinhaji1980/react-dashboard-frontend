import axios from 'axios';
const SalesReport = {
  getData: async (period) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/sales/report/${period}`);
      console.log(response.data);
      return response.data

    } catch (error) {
      throw new Error('خطا در دریافت اطلاعات');
    }
  }
};

export default SalesReport;
