// getProductListApi.js

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL // آدرس API خود را اینجا وارد کنید
const token = process.env.REACT_APP_TOKEN;

const getData = async () => {
  const response = await axios.get(`${API_URL}/products/getProductList`,{
    headers: {
      Authorization: `Bearer ${token}` // جایگذاری توکن خود به جای yourToken
  }
  });
  return response.data.data;
};

const getCategories = async () => {
  const response = await axios.get(`${API_URL}/products/getCategories`,{
    headers: {
      Authorization: `Bearer ${token}` // جایگذاری توکن خود به جای yourToken
  }
  });
  return response.data.data;
};

const updateProduct = async (id, updatedProduct) => {
  const { productCode, ...rest } = updatedProduct;
  const response = await axios.put(`${API_URL}/products/updateProduct/${id}`, rest, {
      headers: {
          'Content-Type': 'application/json',
          
            Authorization: `Bearer ${token}` // جایگذاری توکن خود به جای yourToken
        
      }
  });
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/products/deleteProduct/${id}`,{
    headers: {
      Authorization: `Bearer ${token}` // جایگذاری توکن خود به جای yourToken
  }
  });
  return response.data;
};

export default {
  getData,
  getCategories,
  updateProduct,
  deleteProduct
};
