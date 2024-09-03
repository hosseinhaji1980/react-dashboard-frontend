import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_TOKEN;

const DeleteOrder = async (orderId) => {
    try {

        const response = await axios.delete(`${API_URL}/orders/deleteOrder/${orderId}`,{
            headers: {
                Authorization: `Bearer ${token}` // جایگذاری توکن خود به جای yourToken
            }  
        });
        return JSON.stringify(response.data);
    } catch (error) {
        console.log(error);
    }
}

export default DeleteOrder;
