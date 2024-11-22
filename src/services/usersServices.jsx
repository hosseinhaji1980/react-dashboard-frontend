import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_TOKEN;
const usersService = {
    getList: async () => {
        try {
            const response = await axios.get(`${API_URL}/users/get-list`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });            
              
              return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    deleteUser: async (userId) => {
        try {
            const response = await axios.delete(`${API_URL}/users/${userId}`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }); 
              return response;    
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    },

    updateUser: async (userId, updatedData) => {
        try {
            const response = await axios.put(`${API_URL}/users/${userId}`, updatedData, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }); 
            return response.data;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    },
    addCredit: async (creditData) => {
        try {
          const response = await axios.post(`${API_URL}/users/add-credit`, creditData, {
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
};

export default usersService;
