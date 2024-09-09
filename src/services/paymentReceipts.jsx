
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL 
const token = process.env.REACT_APP_TOKEN;

const getData = async () => {
  const response = await axios.get(`${API_URL}/payment-receipts/getdata`,{
    headers: {
      Authorization: `Bearer ${token}` 
  }
  });
  return response.data.data;
};
export default {
    getData
   
  };