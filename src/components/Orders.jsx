import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import getOrderList from '../services/getOrdersApi';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TablePagination from '@mui/material/TablePagination';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
// import CancelIcon from '@mui/icons-material/Cancel';

import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import getProductList from '../services/getProductListApi'; // Assuming the file containing the API function is in the same directory
import { FormControl, MenuItem, Select } from '@mui/material';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';


import { useDemoData } from '@mui/x-data-grid-generator';
import { darken, lighten, styled } from '@mui/material/styles';




function EditToolbar({ setRows }) {

  
  const handleClick = async () => {
    try {
      const data = await getOrderList.getData();

      setRows(data.map(item => ({ ...item, isNew: true })));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function GridExample() {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const getBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.7) : lighten(color, 0.7);

const getHoverBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getSelectedBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

const getSelectedHoverBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.4) : lighten(color, 0.4);
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

  const handleEditClick = (id) => () => {
    console.log(id)
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleDeleteClick = (orderId) => async () => {
    try {
      await getProductList.deleteData(orderId);
      setRows(rows.filter(row => row.orderid !== orderId));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  const columns = [
    { field: 'orderid', headerName: 'شماره سفارش', width: 220, editable: true,     headerAlign:'center',
    headerClassName: 'super-app-theme--header',
    style: {
      textAlign: 'left'
    }  },
    
    {
      field: 'dateaccept',
      headerName: 'زمان ثبت سفارش',
      type: 'text',
      width: 180,
      editable: true,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',



    },
    {
      field: 'ordercompletiontime',
      headerName: 'زمان تکمیل سفارش',
      width: 220,
      type: 'text',
      headerAlign:'center',

      editable: true,

      headerClassName: 'super-app-theme--header',

    },
    
    {
      field: 'orderdate',
      headerName: 'زمان سفارش',
      width: 220,
      type: 'text',
      headerAlign:'center',

      editable: true,
      // type: 'singleSelect',
      // valueOptions: ['Market', 'Finance', 'Development'],
      headerClassName: 'super-app-theme--header',

    },
   
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
    let backgroundColor,icon;
    switch (params.value) {
      case 'accepted':
        text = 'تکمیل شده';
        backgroundColor = '#B4FF93'; 
        icon=<DoneAllIcon />;
        break;
        case 'inOrder':
          text = 'در انتظار تایید';
          icon=<AccessTimeIcon />;
          backgroundColor = '#ffeb3b'; 
          break;
          case 'doing':
            text = 'در حال انجام';
            icon=<CheckCircleIcon />;
            backgroundColor = '#2196f3'; 
            break;
            case 'rejected':
              text = 'رد شده';
              icon=<CancelIcon />;
        backgroundColor = '#f44336';
        break;
      default:
        text = '';
        backgroundColor = '#ffffff'; 
    }
    return (
      <div style={{ backgroundColor, textAlign: 'center', padding: '6px', borderRadius: '6px' }}>
    {text} <span style={{ color: 'white' ,padding:'3px',textAlign:'center' }}>{icon}</span>

      </div>
    );
  },
  
//   renderCell: (params) => (
//    // در renderCell برای وضعیت سفارش
// <FormControl fullWidth>

// <MenuItem value="accepted" style={{ backgroundColor: getBackgroundColorByStatus('inOrder') }}>
//   تکمیل شده
//   {/* <DoneAllIcon /> */}
// </MenuItem>

//     <MenuItem value="inOrder" style={{ backgroundColor: getBackgroundColorByStatus('inOrder') }}>
//       در انتظار تایید        
//       {/* <AccessTimeIcon /> */}
//     </MenuItem>
//     <MenuItem value="doing" style={{ backgroundColor: getBackgroundColorByStatus('doing')}}>
//       در حال انجام
//       {/* <CheckCircleIcon /> */}
//     </MenuItem>
//     <MenuItem value="rejected" style={{ backgroundColor: getBackgroundColorByStatus('rejected') }}>
//       رد شده
//       {/* <CancelIcon /> */}
//     </MenuItem>
// </FormControl>
  // ),
},
{
  field: 'actions',
  type: 'actions',
  headerName: 'Actions',
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
      
      // onClick={() =>console.log(params.row.orderid)}

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
    
    '&  .super-app-theme--row:nth-of-type(odd)':{
      backgroundcolor: 'red'
    },
    '& .MuiDataGrid-cell:hover': {
      color: 'info.main',
    },
    '& .super-app-theme--header': {
      backgroundColor: '#180350',
      color:'white'
    },
    '& .MuiDataGrid-row:nth-of-type(odd)': {
      backgroundColor: '#F4FDE7',
      fontFamily:'shabnam'
    },
    '& .MuiDataGrid-row:nth-of-type(even)': {
      backgroundColor: 'white',
      fontFamily:'shabnam'

    },
    '& .actions': {
      color: 'text.secondary',
    },
    '& .textPrimary': {
      color: 'text.primary'
    },
  }}>
    
    <>
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
{/* <TablePagination
  labelRowsPerPage=''
  /> */}
  <Stack spacing={2}>
  <Pagination count={10} variant="outlined" shape="rounded" style={{ padding: '10px', display:'absloute',margin:'-50px 300px',alignItems:'center',}} />
  </Stack>
</>

</Box>




  );
}


