import React, { useState, useEffect } from 'react';
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
import getProductList from '../services/getProductListApi'; 
import { DataGrid, GridToolbarContainer, GridActionsCellItem } from '@mui/x-data-grid';
import { Pagination, Stack } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
function EditToolbar({ setRows }) {
  const handleClick = async () => {
    try {
      const data = await getOrderList.getData();
      setRows(data.map(item => ({ ...item, isNew: true })));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
}

function Orders() {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [rowToDelete, setRowToDelete] = useState(null);
  // Function to handle delete confirmation
  const handleDeleteConfirm = async () => {
    try {
      if (rowToDelete) {
        console.log(rowToDelete.toString());
        await getOrderList.deleteOrder(rowToDelete);
        setRows(rows.filter(row => row.orderid !== rowToDelete));
        setRowToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  // Function to handle delete request
  const handleDeleteClick = (orderId) => {
    setRowToDelete(orderId);
  };

  // Function to close delete confirmation dialog
  const handleCloseDialog = () => {
    setRowToDelete(null);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOrderList.getData();
        setRows(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleEditClick = (orderId) => () => {
    setRowModesModel({ ...rowModesModel, [orderId]: { mode: 'edit' } });
  };

  // const handleDeleteClick = (orderId) => async () => {
  //   try {
  //     await getProductList.deleteData(orderId);
  //     setRows(rows.filter(row => row.orderid !== orderId));
  //   } catch (error) {
  //     console.error('Error deleting data:', error);
  //   }
  // };

  const columns = [
    { field: 'orderid', headerName: 'شماره سفارش', width: 220, editable: true, headerAlign:'center', headerClassName: 'super-app-theme--header', style: { textAlign: 'left' } },
    { field: 'dateaccept', headerName: 'زمان تایید سفارش', type: 'text', width: 180, editable: true, cellClassName: 'super-app-theme--cell', headerClassName: 'super-app-theme--header', headerAlign: 'center' },
    { field: 'ordercompletiontime', headerName: 'زمان تکمیل سفارش', width: 220, type: 'text', headerAlign:'center', editable: true, headerClassName: 'super-app-theme--header' },
    { field: 'orderdate', headerName: 'زمان  ثبت سفارش', width: 220, type: 'text', headerAlign:'center', editable: true, headerClassName: 'super-app-theme--header' },
    {
      field: 'orderstatus',
      headerName: 'وضعیت سفارش',
      width: 220,
      headerAlign: 'center',
      editable: true,
      headerClassName: 'super-app-theme--header fs-5',
      sortable: true,
      filterable: true,
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
      headerClassName: 'super-app-theme--header fs-5',
      headerAlign: 'center',
      cellClassName: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={() => handleEditClick(params.row.orderid)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            const orderId = params.row.orderid;
            handleDeleteClick(orderId)();
          }} 
          color="inherit"
        />,
      ],
    },
  ];

  return (
    
    <Box
    
      sx={{
        height: 'calc(100vh - 100px)',
        width: '100%',
        boxShadow: 12,
        borderColor: 'primary.light',
        color: 'white',
        backgroundColor: 'white',
        fontFamily: 'shabnam',
        '& .super-app-theme--header': {
          backgroundColor: '#180350',
          color: 'white'
        },
        '& .MuiDataGrid-row:nth-of-type(odd)': {
          backgroundColor: '#F4FDE7',
          fontFamily: 'shabnam'
        },
        '& .MuiDataGrid-row:nth-of-type(even)': {
          backgroundColor: 'white',
          fontFamily: 'shabnam'
        },
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary'
        },
      }}>
      {/* Display delete confirmation dialog */}
      <Dialog open={Boolean(rowToDelete)} onClose={handleCloseDialog}>
        <DialogTitle>آیا از حذف این رکورد اطمینان دارید؟</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">خیر</Button>
          <Button onClick={handleDeleteConfirm} color="primary" autoFocus>بله</Button>
        </DialogActions>
      </Dialog>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        pageSizeOptions={[5, 10, 25,50,100]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 25, page: 0 },
          },
        }}

        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        getRowClassName={(params) =>
          params.rowIndex % 2 === 0 ? 'MuiDataGrid-evenRow' : 'MuiDataGrid-oddRow'
        }
      />
      <Stack spacing={2}>
        <Pagination count={10} variant="outlined" shape="rounded" style={{ padding: '10px', display:'absloute',margin:'-50px 300px',alignItems:'center',}} />
      </Stack>
    </Box>
  );
}

export default Orders;
