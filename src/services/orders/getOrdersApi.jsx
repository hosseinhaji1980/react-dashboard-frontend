import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_TOKEN;

const getOrderList = {
  getData: async (from, to) => {
    const response = await fetch(`${API_URL}/orders/getOrdersList`,{
      headers: {
        Authorization: `Bearer ${token}` // جایگذاری توکن خود به جای yourToken
    }
      
    });
  const data = await response.json();
  return data;
}
};
export default getOrderList;
