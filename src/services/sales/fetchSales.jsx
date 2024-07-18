import axios from 'axios';

const FetchSales = {
  getData: (period) => {
    return axios.get(`http://localhost:5000/api/sales/report/${period}`);
  },
};

export default FetchSales;
