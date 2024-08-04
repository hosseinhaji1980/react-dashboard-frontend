import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchOrdersByCustomerAndDateRange } from '../../services/orders/Orders';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  ThemeProvider,
  createTheme,
  
} from '@mui/material';
import { styled } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'shabnam, Arial',
  },
});

const DebtCalculator = () => {
  const [customerName, setCustomerName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [orderStatus, setOrderStatus] = useState('all');
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, [customerName, startDate, endDate, orderStatus]);

  const formatNumber = (number) => {
    return new Intl.NumberFormat('fa-IR').format(number);
  };

  const fetchOrders = async () => {
    const start = startDate ? startDate.toISOString().split('T')[0] : '';
    const end = endDate ? endDate.toISOString().split('T')[0] : '';

    try {
      const ordersData = await fetchOrdersByCustomerAndDateRange(customerName, start, end, orderStatus);
      setResults(ordersData);
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('خطا در دریافت اطلاعات سفارشات.');
    }
  };

  const calculateTotals = () => {
    return results.reduce(
      (totals, result) => {
        totals.accepted_orders_count += result.accepted_orders_count || 0;
        totals.accepted_orders_amount +=Number( result.accepted_orders_amount) || 0;
        totals.inOrder_orders_count += result.inOrder_orders_count || 0;
        totals.inOrder_orders_amount +=Number(result.inOrder_orders_amount )|| 0;
        totals.doing_orders_count += result.doing_orders_count || 0;
        totals.doing_orders_amount += Number(result.doing_orders_amount) || 0;
        totals.rejected_orders_count += result.rejected_orders_count || 0;
        totals.rejected_orders_amount += Number(result.rejected_orders_amount) || 0;
        totals.total_orders_count += result.total_orders_count || 0;
        totals.total_orders_amount += Number(result.total_orders_amount) || 0;
        return totals;
      },
      {
        accepted_orders_count: 0,
        accepted_orders_amount: 0,
        inOrder_orders_count: 0,
        inOrder_orders_amount: 0,
        doing_orders_count: 0,
        doing_orders_amount: 0,
        rejected_orders_count: 0,
        rejected_orders_amount: 0,
        total_orders_count: 0,
        total_orders_amount: 0,
      }
    );
  };
// Define a CSS class

const StyledTableRow = styled(TableRow)({
  backgroundColor: '#b9dadd',
  fontWeight: 'bold',
  fontSize: '50px',
});
  const totals = calculateTotals();
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: 2,backgroundColor:'white'}}>
        {/* <Typography variant="h4" gutterBottom>
           بدهی مشتریان
        </Typography> */}
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="نام مشتری"
            value={customerName}
            onChange={e => setCustomerName(e.target.value)}
            fullWidth
          />
        </Box>
        <Box sx={{ marginBottom: 2, display: 'flex', gap: 2 }}>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            dateFormat="yyyy/MM/dd"
            placeholderText="تاریخ شروع را انتخاب کنید"
            isClearable
            customInput={<TextField label="زمان شروع" fullWidth />}
          />
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            dateFormat="yyyy/MM/dd"
            placeholderText="تاریخ پایان را انتخاب کنید"
            isClearable
            customInput={<TextField label="زمان پایان" fullWidth />}
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <FormControl fullWidth>
            <InputLabel>وضعیت سفارش</InputLabel>
            <Select
              value={orderStatus}
              onChange={e => setOrderStatus(e.target.value)}
              label="وضعیت سفارش"
            >
              <MenuItem value="all">تمام سفارشات</MenuItem>
              <MenuItem value="accepted">تایید شده</MenuItem>
              <MenuItem value="inOrder">در انتظار تایید</MenuItem>
              <MenuItem value="doing">در حال انجام</MenuItem>
              <MenuItem value="rejected">رد شده</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#b9dadd', color: 'white' }}>
                <TableCell align="center">نام مشتری</TableCell>
                <TableCell align="center">تعداد سفارشات تایید شده</TableCell>
                <TableCell align="center">جمع مبلغ تایید شده</TableCell>
                <TableCell align="center">تعداد سفارشات در انتظار تایید</TableCell>
                <TableCell align="center">جمع مبلغ سفارشات در انتظار تایید</TableCell>
                <TableCell align="center">تعداد سفارشات در حال انجام</TableCell>
                <TableCell align="center">جمع مبلغ در حال انجام</TableCell>
                <TableCell align="center">تعداد سفارشات رد شده</TableCell>
                <TableCell align="center">جمع مبلغ رد شده</TableCell>
                <TableCell align="center">تعداد کل سفارشات</TableCell>
                <TableCell align="center">جمع کل مبلغ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(results) && results.map((result, index) => (
                <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white' }}>
                  <TableCell align="right">{result.customerName}</TableCell>
                  <TableCell align="center">{formatNumber(result.accepted_orders_count)}</TableCell>
                  <TableCell align="center">{formatNumber(result.accepted_orders_amount)}</TableCell>
                  <TableCell align="center">{formatNumber(result.inOrder_orders_count)}</TableCell>
                  <TableCell align="center">{formatNumber(result.inOrder_orders_amount)}</TableCell>
                  <TableCell align="center">{formatNumber(result.doing_orders_count)}</TableCell>
                  <TableCell align="center">{formatNumber(result.doing_orders_amount)}</TableCell>
                  <TableCell align="center">{formatNumber(result.rejected_orders_count)}</TableCell>
                  <TableCell align="center">{formatNumber(result.rejected_orders_amount)}</TableCell>
                  <TableCell align="center">{formatNumber(result.total_orders_count)}</TableCell>
                  <TableCell align="center">{formatNumber(result.total_orders_amount)}</TableCell>
                </TableRow>
              ))}
    <StyledTableRow>
                    <TableCell align="right">جمع کل</TableCell>
                    <TableCell align="center">{formatNumber(totals.accepted_orders_count)}</TableCell>
                    <TableCell align="center">{formatNumber(totals.accepted_orders_amount)}</TableCell>
                    <TableCell align="center">{formatNumber(totals.inOrder_orders_count)}</TableCell>
                    <TableCell align="center">{formatNumber(totals.inOrder_orders_amount)}</TableCell>
                    <TableCell align="center">{formatNumber(totals.doing_orders_count)}</TableCell>
                    <TableCell align="center">{formatNumber(totals.doing_orders_amount)}</TableCell>
                    <TableCell align="center">{formatNumber(totals.rejected_orders_count)}</TableCell>
                    <TableCell align="center">{formatNumber(totals.rejected_orders_amount)}</TableCell>
                    <TableCell align="center">{formatNumber(totals.total_orders_count)}</TableCell>
                    <TableCell align="center">{formatNumber(totals.total_orders_amount)}</TableCell>
                    </StyledTableRow>

            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ThemeProvider>
  );
};

export default DebtCalculator;
