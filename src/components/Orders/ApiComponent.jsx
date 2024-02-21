import axios from 'axios';

const ApiComponent = {
    getData: async (from, to) => {
        const response = await fetch('http://localhost:5000/api/orders/getOrdersList');
      const data = await response.json();
      return data;
    }
  };
  export default ApiComponent;
  
  