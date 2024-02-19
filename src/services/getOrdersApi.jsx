import axios from 'axios';

const getOrderList = {
  getData: async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders/getOrdersList');
      return response.data.data;
    } catch (error) {
      throw new Error('خطا در دریافت اطلاعات');
    }
  }
};
async function deleteOrder(orderId) {
  try {
    console.log(orderId);
    // آدرس API موردنظر
    const apiUrl = `http://localhost:5000/api/orders/deleteOrder/${orderId}`;
    
    // ارسال درخواست DELETE به سرور
    const response = await axios.delete(apiUrl);

    // اگر درخواست با موفقیت انجام شود، پاسخ را برگردانید
    return response.data;
  } catch (error) {
    // در صورت بروز خطا، آن را چاپ کنید
    console.error('Error deleting order:', error);
    throw error; // برای ادامه پردازش خطاها
  }
}
export default getOrderList;
