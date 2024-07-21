import axios from 'axios';

const FetchSales = {
  getData: (period) => {
    const API_URL = process.env.REACT_APP_API_URL;

    return axios.get(`http://localhost:5000/api/sales/report/${period}`);
  },
};

export default FetchSales;
