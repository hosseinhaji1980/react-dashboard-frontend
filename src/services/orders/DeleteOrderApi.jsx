import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const DeleteOrder = async (orderId) => {
    console.log(`order id for delete is ${orderId}`);
    try {
        const response = await axios.delete(`http://localhost:5000/api/orders/deleteOrder/${orderId}`);
        console.log(JSON.stringify(response.data));
    } catch (error) {
        console.log(error);
    }
}

export default DeleteOrder;
