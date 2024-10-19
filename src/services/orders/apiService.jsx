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

    static async getOrdersByStatus(status, page = 1, limit = 10) {
        try {
            const response = await axios.get(`${API_URL}/orders/get-orders-by-status`, {
                params: {
                    status: status,  // Changed from `orderStatus` to `status` to match the backend
                    page: page,
                    limit: limit
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching orders with status ${status}:`, error);
            throw error;
        }
    }
    
    
    
}

export default ApiService;