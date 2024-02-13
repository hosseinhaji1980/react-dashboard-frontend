import axios from 'axios';

const AdminFunctional = {
    getData: async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admins/get-admin-functional');
        return response.data.data;
      } catch (error) {
        throw new Error('خطا در دریافت اطلاعات');
      }
    }
  };
  
  export default AdminFunctional;
  