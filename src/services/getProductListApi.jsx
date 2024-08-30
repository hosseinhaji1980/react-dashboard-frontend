// getProductListApi.js

import axios from 'axios';

const API_URL = 'http://localhost:5000'; // آدرس API خود را اینجا وارد کنید

const getData = async () => {
  const response = await axios.get(`${API_URL}/api/products/getProductList`);
  return response.data.data;
};

const getCategories = async () => {
  const response = await axios.get(`${API_URL}/api/products/getCategories`);
  return response.data.data;
};

const updateProduct = async (id, updatedProduct) => {
  const { productCode, ...rest } = updatedProduct;
  const response = await axios.put(`${API_URL}/api/products/updateProduct/${id}`, rest, {
      headers: {
          'Content-Type': 'application/json'
      }
  });
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/api/products/deleteProduct/${id}`);
  return response.data;
};

export default {
  getData,
  getCategories,
  updateProduct,
  deleteProduct
};
