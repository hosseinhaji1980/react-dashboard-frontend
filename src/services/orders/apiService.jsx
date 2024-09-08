import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_TOKEN;

class ApiService {
    static async fetchAverageOrderTimes() {
        try {
            const response = await axios.get(`${API_URL}/orders/average-order-times`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching average order times:', error);
            throw error;
        }
    }

    static async getOrderStatistics() {
        try {
            const response = await axios.get(`${API_URL}/orders/orderStatistics`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching order statistics:', error);
            throw error;
        }
    }
}

export default ApiService;
