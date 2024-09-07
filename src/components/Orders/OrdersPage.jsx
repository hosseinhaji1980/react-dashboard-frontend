import React, { useState, useEffect } from 'react';
import OrdersTable from './OrdersTable';
import ApiComponent from './ApiComponent';
import Box from '@mui/material/Box';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchData = async (from, to) => {
    try {
      const data = await ApiComponent.getData(from, to);
      setOrders(data.data);
      setTotalPages(Math.ceil(data.totalCount / rowsPerPage));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    setTotalPages(Math.ceil(orders.length / rowsPerPage));
  }, [orders, rowsPerPage]);



  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

    const handleRowsPerPageChange = (newRowsPerPage) => {
        setCurrentPage(1);
        setRowsPerPage(newRowsPerPage);
        const from = 0;
        const to = newRowsPerPage;
        fetchData(from, to);
      };
      
  

  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, orders.length);

  return (
<Box >
<Box>
<OrdersTable orders={orders.slice(startRow - 1, endRow)}   fetchDataCallback={fetchData} />
      </Box>
    
    </Box>
  );
}

export default OrdersPage;
