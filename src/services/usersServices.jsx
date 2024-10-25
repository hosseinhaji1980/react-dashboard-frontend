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
              });            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    deleteUser: async (userId) => {
        try {
            await axios.delete(`${API_URL}/${userId}`);
            console.log(`User with ID ${userId} deleted successfully.`);
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    },

    // در صورت نیاز می‌توانید توابع دیگری مانند updateUser را برای ویرایش اطلاعات کاربر اضافه کنید
    updateUser: async (userId, updatedData) => {
        try {
            const response = await axios.put(`${API_URL}/${userId}`, updatedData);
            console.log(`User with ID ${userId} updated successfully.`);
            return response.data;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }
};

export default usersService;
