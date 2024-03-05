import axios from 'axios';

const SalesReport = {
  getData: async (period) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/sales/report/${period}`);

      if (!response.data || !response.data.data || response.data.data.length === 0) {
        throw new Error('داده‌های معتبری یافت نشدند');
      }

      const data = response.data.data;
      let order_year;

      switch (period) {
        case 'daily':
          order_year = data.map(item => item.order_date);
          return {
            total_sales: data.map(item => item.total_sales),
            order_date: order_year
          };
        case 'weekly':
          order_year = data.map(item => item.week);
          return {
            total_sales: data.map(item => item.total_sales),
            week: order_year
          };
        case 'monthly':
          order_year = data.map(item => item.order_year);
          return {
            total_sales: data.map(item => item.total_sales),
            order_year: order_year,
            order_month: data.map(item => item.order_month)
          };
        case 'yearly':
          order_year = data.map(item => item.order_year);
          return {
            total_sales: data.map(item => item.total_sales),
            order_year: order_year
          };
        default:
          throw new Error('دوره معتبری مشخص نشده است');
      }
    } catch (error) {
      throw new Error('خطا در دریافت اطلاعات');
    }
  }
};

export default SalesReport;
