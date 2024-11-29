import React, { useState, useEffect } from 'react';
import { Button, Input, Select, message } from 'antd';
import OrdersTable from './OrdersTable';
import ApiComponent from './ApiComponent';
import Box from '@mui/material/Box';

const { Option } = Select;

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchOrderNumber, setSearchOrderNumber] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const statusOptions = [
    { id: 'pending', title: 'در انتظار' },
    { id: 'processing', title: 'در حال پردازش' },
    { id: 'completed', title: 'تکمیل شده' },
    { id: 'cancelled', title: 'لغو شده' },
  ];

  const fetchData = async (page, pageSize, filters) => {
    try {
      const params = {
        page,
        pageSize,
        ...filters,
      };
      const response = await ApiComponent.getData(params);
      setOrders(response.data);
      setTotalCount(response.totalCount);
    } catch (error) {
      console.error('Error fetching data:', error);
      message.error('خطا در بارگذاری اطلاعات');
    }
  };

  useEffect(() => {
    fetchData(currentPage, rowsPerPage, { orderNumber: searchOrderNumber, status: searchStatus });
  }, [currentPage, rowsPerPage, searchOrderNumber, searchStatus]);

  const handleSearch = () => {
    fetchData(1, rowsPerPage, { orderNumber: searchOrderNumber, status: searchStatus });
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchOrderNumber('');
    setSearchStatus('');
    fetchData(1, rowsPerPage, {});
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  return (
    <Box>
      <Box style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
        <Input
          placeholder="شماره سفارش"
          value={searchOrderNumber}
          onChange={(e) => setSearchOrderNumber(e.target.value)}
          style={{ width: 200 }}
        />
        <Select
          placeholder="وضعیت"
          value={searchStatus}
          onChange={(value) => setSearchStatus(value)}
          style={{ width: 200 }}
        >
          <Option value="">همه وضعیت‌ها</Option>
          {statusOptions.map((status) => (
            <Option key={status.id} value={status.id}>
              {status.title}
            </Option>
          ))}
        </Select>
        <Button type="primary" onClick={handleSearch}>
          جستجو
        </Button>
        <Button onClick={handleClearFilters}>پاک کردن فیلتر</Button>
      </Box>
      <OrdersTable
        orders={orders}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        totalCount={totalCount}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Box>
  );
};

export default OrdersPage;
