import axios from 'axios';
const SalesReport = {
  getData: async (period) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/sales/report/${period}`);

      if (!response.data || !response.data.data || response.data.data.length === 0) {
        throw new Error('داده‌های معتبری یافت نشدند');
      }
      const data = response.data.data;
      return data
    } catch (error) {
      throw new Error('خطا در دریافت اطلاعات');
    }
  }
};
export default SalesReport;
