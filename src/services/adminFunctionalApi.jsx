import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_TOKEN;

const AdminFunctional = {
    getData: async () => {
      try {
        const response = await axios.get(`${API_URL}/admins/get-admin-functional`,{
          headers: {
            Authorization: `Bearer ${token}` // جایگذاری توکن خود به جای yourToken
        }
        });
        return response.data.data;
      } catch (error) {
        throw new Error('خطا در دریافت اطلاعات');
      }
    }
  };
  
  export default AdminFunctional;
  