// const API_URL = process.env.REACT_APP_API_URL;

// class ApiService {
//     static async fetchAverageOrderTime() {
//         const requestOptions = {
//             method: 'GET',
//             redirect: 'follow'
//         };
    
//         try {
//             const response = await fetch("http://localhost:5000/api/orders/averageOrderTime", requestOptions);
            

//             const result = await response.json();
//             return result.averageOrderTime;
//         } catch (error) {
//             console.log('خطا در دریافت اطلاعات:', error);
//             throw error;
//         }
//     }
    
//     static async getOrderStatistics() {
//         const requestOptions = {
//             method: 'GET',
//             redirect: 'follow'
//         };
    
//         try {
//             const response = await fetch("http://localhost:5000/api/orders/orderStatistics", requestOptions);
//             const result = await response.json();
//             return result;
//         } catch (error) {
//             console.log('خطا در دریافت اطلاعات:', error);
//             throw new Error('خطا در تبدیل داده');
//         }
//     }
//     // static async getProdutList() {
//     //     const requestOptions = {
//     //         method: 'GET',
//     //         redirect: 'follow'
//     //     };
    
//     //     try {
//     //         const response = await fetch("http://localhost:3000/api/products/getProductList", requestOptions);
//     //         const result = await response.json();
//     //         console.log(result);
//     //         return result;
//     //     } catch (error) {
//     //         console.log('خطا در دریافت اطلاعات:', error);
//     //         throw new Error('خطا در تبدیل داده');
//     //     }
//     // }
// }

export default ApiService;


const API_URL = process.env.REACT_APP_API_URL;

class ApiService {
    static async fetchAverageOrderTime() {
       
    
        try {
            const response = await axios.get(`${API_URL}/orders/averageOrderTime`);
            response.data
        } catch (error) {
            console.log('خطا در دریافت اطلاعات:', error);
            throw error;
        }
    }
    
    static async getOrderStatistics() {
    
        try {
            const response = await axios.get(`${API_URL}/orders/orderStatistics`);

            return response.data;
        } catch (error) {
            console.log('خطا در دریافت اطلاعات:', error);
            throw new Error('خطا در تبدیل داده');
        }
    }
    // static async getProdutList() {
    //     const requestOptions = {
    //         method: 'GET',
    //         redirect: 'follow'
    //     };
    
    //     try {
    //         const response = await fetch("http://localhost:3000/api/products/getProductList", requestOptions);
    //         const result = await response.json();
    //         console.log(result);
    //         return result;
    //     } catch (error) {
    //         console.log('خطا در دریافت اطلاعات:', error);
    //         throw new Error('خطا در تبدیل داده');
    //     }
    // }
}

export default ApiService;
