import axios from 'axios';

<<<<<<< HEAD
const API_URL = 'http://localhost:5000'; 
=======
const API_URL = 'http://localhost:5000'; // Change this to your backend API URL
>>>>>>> c2e931d10dc6b322c92231673c311fb94ed5090a

class ApiService {
    static async fetchAverageOrderTime(period) {
        try {
            console.log(`Fetching average order time for period: ${period}`);
            const response = await axios.get(`${API_URL}/api/orders/average-order-time`, {
                params: { period }
            });
            console.log(`Response data for ${period}:`, response.data);
            return response.data.averageOrderTimes[0].average_order_time;
        } catch (error) {
            console.error('Error fetching average order time:', error);
            throw error;
        }
    }

    static async getOrderStatistics() {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
    
        try {
            const response = await fetch(`${API_URL}/api/orders/orderStatistics`, requestOptions);
            const result = await response.json();
            return result;
        } catch (error) {
            console.log('خطا در دریافت اطلاعات:', error);
            throw new Error('خطا در تبدیل داده');
        }
    }
}

export default ApiService;
