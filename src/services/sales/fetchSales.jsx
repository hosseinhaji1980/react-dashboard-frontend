import axios from 'axios';
const token = process.env.REACT_APP_TOKEN;

const API_URL = process.env.REACT_APP_API_URL;
const FetchSales = {
  getData: (period) => {

  return axios.get(`${API_URL}/sales/report/${period}`,{
    headers: {
      Authorization: `Bearer ${token}` // جایگذاری توکن خود به جای yourToken
  }
  });
  },
};

export default FetchSales;
