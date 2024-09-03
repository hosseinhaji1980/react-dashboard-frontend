import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_TOKEN;


class ApiService {
    static async fetchAverageOrderTime(period) {
        try {
            const response = await axios.get(`${API_URL}/orders/average-order-time`, {
                params: { period },
                headers: {
                    Authorization: `Bearer ${token}` // جایگذاری توکن خود به جای yourToken
                }
            });
            
            return response.data.averageOrderTimes[0].average_order_time;
        } catch (error) {
            console.error('Error fetching average order time:', error);
            throw error;
        }
    }

    static async getOrderStatistics() {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: {
                'Authorization': `Bearer ${token}`,
              }
        };
    
        try {
            const response = await fetch(`${API_URL}/orders/orderStatistics`, requestOptions);

            const result = await response.json();
            return result;
        } catch (error) {
            console.log('خطا در دریافت اطلاعات:', error);
            throw new Error('خطا در تبدیل داده');
        }
    }
}

export default ApiService;
