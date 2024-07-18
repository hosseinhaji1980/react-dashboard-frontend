import axios from 'axios';

const getOrderList = {
  getData: async ({from,to}) => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders/getOrdersList');
      console.log(response.data.data.slice(from,to));
      
      return new Promise((resolve,reject)=>{
      
      const ordersData=response.data.data.slice(from,to);

      resolve({
        count:response.data.data.length,
        data:ordersData
      })
    })






      // return ordersData;
    } catch (error) {
      throw new Error('خطا در دریافت اطلاعات');
    }
  }
};

export default getOrderList;
