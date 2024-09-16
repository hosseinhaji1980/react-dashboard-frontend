import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import getOrderList from '../services/getOrdersApi';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CancelIcon from '@mui/icons-material/Close';
import { DataGrid, GridToolbarContainer, GridActionsCellItem } from '@mui/x-data-grid';
import { Pagination, Stack } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DeleteOrder from '../services/orders/DeleteOrderApi';
import AppPagination from './AppPagination1';

function Orders() {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    totalCount: 0,
    fromIndex: 0,
    toIndex: 0,
  });
  
  const [rowToDelete, setRowToDelete] = useState(null);
  const rowCount = 20;

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  function formatDateTimeFromDatabase(dateTimeString) {
    const [datePart, timePart] = dateTimeString.split(' ');
    const [year, month, day] = datePart.split('-');
    const [hour, minute, second] = timePart.split(':');
    const formattedDateTimeString = `${hour}:${minute}:${second} _ ${year}-${month}-${day}`;
    return formattedDateTimeString;
  }

  // Function to handle delete confirmation
  const handleDeleteConfirm = async () => {
    try {
      if (rowToDelete) {
        await DeleteOrder(rowToDelete);
        setRows(rows.filter(row => row.orderid !== rowToDelete));
        setRowToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  // Function to handle delete request
  const handleDeleteClick = (orderId) => {
    return () => {
      setRowToDelete(orderId);
    };
  };

  // Function to close delete confirmation dialog
  const handleCloseDialog = () => {
    setRowToDelete(null);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const from = (currentPage - 1) * rowCount;
      const to = from + rowCount;
      const data = await getOrderList.getData({ from: from, to: to });
      setRows(data.rows);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEditClick = (orderId) => () => {
    setRowModesModel({ ...rowModesModel, [orderId]: { mode: 'edit' } });
  };

  // Function to copy cell value to clipboard
  const handleCellClick = (params) => {
    const cellValue = params.value;
    if (cellValue) {
      navigator.clipboard.writeText(cellValue)
        .then(() => {
          console.log('Copied to clipboard:', cellValue);
        })
        .catch((error) => {
          console.error('Error copying to clipboard:', error);
        });
    }
  };

  const columns = [
    { field: 'orderid', headerName: 'شماره سفارش', width: 220, editable: true, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
    { field: 'dateaccept', headerName: 'زمان تایید سفارش', type: 'text', width: 180, editable: true, cellClassName: 'super-app-theme--cell', headerClassName: 'super-app-theme--header', headerAlign: 'center', renderCell: (params) => formatDateTimeFromDatabase(params.value) },
    { field: 'ordercompletiontime', headerName: 'زمان تکمیل سفارش', width: 220, type: 'text', headerAlign: 'center', editable: true, headerClassName: 'super-app-theme--header', renderCell: (params) => formatDateTimeFromDatabase(params.value) },
    { field: 'orderdate', headerName: 'زمان ثبت سفارش', width: 220, type: 'text', headerAlign: 'center', editable: true, headerClassName: 'super-app-theme--header', renderCell: (params) => formatDateTimeFromDatabase(params.value) },
    {
      field: 'orderstatus',
      headerName: 'وضعیت سفارش',
      width: 220,
      headerAlign: 'center',
      editable: true,
      renderCell: (params) => {
        let text;
        let backgroundColor, icon;
        switch (params.value) {
          case 'accepted':
            text = 'تکمیل شده';
            backgroundColor = '#77d2b3';
            icon = <DoneAllIcon />;
            break;
          case 'inOrder':
            text = 'در انتظار تایید';
            icon = <AccessTimeIcon />;
            backgroundColor = '#ffeb3b';
            break;
          case 'doing':
            text = 'در حال انجام';
            icon = <CheckCircleIcon />;
            backgroundColor = '#2196f3';
            break;
          case 'rejected':
            text = 'رد شده';
            icon = <CancelIcon />;
            backgroundColor = '#f44336';
            break;
          default:
            text = '';
            backgroundColor = '#ffffff';
        }
        return (
          <div style={{ backgroundColor, textAlign: 'center', padding: '6px', borderRadius: '6px' }}>
            {text} <span style={{ color: 'white', padding: '3px', textAlign: 'center' }}>{icon}</span>
          </div>
        );
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'عملیات',
      width: 180,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEditClick(params.row.orderid)}
          color="success"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteClick(params.row.orderid)()}
          color="error"
        />,
      ],
    },
  ];

  return (
    <Box
      sx={{
        height: 'calc(100vh - 50px)',
        width: '100%',
        boxShadow: 12,
        '& .super-app-theme--header': {
          backgroundColor: '#180350',
          color: 'white'
        },
        '& .MuiDataGrid-row:nth-of-type(odd)': {
          backgroundColor: '#F4FDE7'
        },
        '& .MuiDataGrid-row:nth-of-type(even)': {
          backgroundColor: 'white'
        }
      }}
    >
      {/* Display delete confirmation dialog */}
      <Dialog open={Boolean(rowToDelete)} onClose={handleCloseDialog}>
        <DialogTitle>آیا از حذف این رکورد اطمینان دارید؟</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">خیر</Button>
          <Button onClick={handleDeleteConfirm} color="primary">بله</Button>
        </DialogActions>
      </Dialog>
      <DataGrid
  rows={rows}
  columns={columns}
  onRowClick={console.log('hello')}
  onCellDoubleClick={(params) => {
    if (params.value) {
      navigator.clipboard.writeText(params.value)
        .then(() => {
          console.log(`Copied to clipboard: ${params.value}`);
        })
        .catch((error) => {
          console.error('Failed to copy to clipboard', error);
        });
    }
  }}
  editMode="row"
  pageSizeOptions={[5, 10, 25, 50, 100]}
  pagination={{ pageSize: 10, page: currentPage - 1 }}
  rowModesModel={rowModesModel}
  onRowModesModelChange={setRowModesModel}
/>

      <Stack spacing={2}>
        <AppPagination
          onDataReceived={setRows}
          from={(currentPage - 1) * rowCount}
          to={(currentPage - 1) * rowCount + rowCount}
        />
      </Stack>
    </Box>
  );
}

export default Orders;
