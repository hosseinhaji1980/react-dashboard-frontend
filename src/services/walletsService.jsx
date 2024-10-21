import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_TOKEN;

const walletsService = {
  // تابع برای دریافت لیست کیف‌پول‌ها
  getList: async () => {
    try {
      const response = await axios.get(`${API_URL}/wallets/get-list`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('خطا در دریافت اطلاعات');
    }
  },

  // تابع برای ایجاد کیف‌پول جدید
  createWallet: async (walletData) => {
    console.log(walletData);
    try {
      const response = await axios.post(`${API_URL}/wallets/create-wallet`, walletData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('خطا در ایجاد کیف پول');
    }
  }
};

export default walletsService;
