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
  },
  getTransactions: async (userId = null) => {
    try {
        const url = userId 
            ? `${API_URL}/wallets/wallet-transactions/${userId}` // در صورت وجود userId
            : `${API_URL}/wallets/wallet-transactions`; // در صورت عدم وجود userId

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.data; // فرض بر اینکه داده‌ها در کلید data قرار دارند
    } catch (error) {
        console.error('Error in getTransactions:', error.response || error.message);
        throw new Error('خطا در دریافت تراکنش‌ها');
    }
},
  setTransactions: async (transactionData) => {
    try {
      const response = await axios.post(`${API_URL}/wallets/set-transaction`, transactionData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('خطا در ایجاد کیف پول');
    }
},
getWalletsTransactions: async () => {
  try {
    const response = await axios.get(`${API_URL}/wallets/get-wallets-transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.data;
  } catch (error) {
    throw new Error('خطا در ایجاد کیف پول');
  }
}
,
getWalletsBalance: async (wallet_id = null) => {
  try {
    const url = wallet_id 
    ? `${API_URL}/wallets/get-wallets-balance?wallet_id=${wallet_id}` 
    : `${API_URL}/wallets/get-wallets-balance`; 
  
  const response = await axios.get(url, {
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
