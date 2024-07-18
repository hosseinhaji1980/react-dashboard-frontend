import React, { useState, useEffect } from 'react';
import bestSellingProduct from '../services/sales/BestSellingProductApi';

const BestSellingProductComponent = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await bestSellingProduct.getbestSellingProduct();
        setProduct(data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className='bg-light rounded mx-2'>
          <h2 className='text-center'>محصول پرفروش</h2>
          <p>نام محصول: {product.title}</p>
          <p>جمع فروش: {product.total_orders}</p>
          <p>قیمت محصول(تومان): {new Intl.NumberFormat('fa-IR').format(product.tomanPrice)+ ' تومان'}</p>
          <p>قیمت محصول(دلار): {product.productprice}</p>
        </div>
      )}
    </div>
  );
};

export default BestSellingProductComponent;
