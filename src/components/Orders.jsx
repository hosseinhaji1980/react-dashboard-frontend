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
        console.log(data);
        setRows(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleEditClick = (index) => () => {
    console.log(index)
    setRowModesModel({ ...rowModesModel, [index]: { mode: GridRowModes.Edit } });
  };

  const handleDeleteClick = (id) => async () => {
    try {
      await getProductList.deleteData(id);
      setRows(rows.filter(row => row.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
const orderStatus=[
  {orderstatus:'accepted',title:'تکمیل شده'},
  {orderstatus:'inOrder',title:'در حال انتظار'},
  {orderstatus:'doing',title:'در حال انجام'},
  {orderstatus:'rejected',title:'رد شده'},


]
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
      // type: 'singleSelect',
      // valueOptions: ['Market', 'Finance', 'Development'],
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
    // {
    //   field: 'orderstatus',
    //   headerName: 'وضعیت سفارش',
    //   width: 220,
    //   headerAlign: 'center',
    //   editable: true,
    //   headerClassName: 'super-app-theme--header fs-5',
    //   sortable: false,
    //   filterable: false,
    //   cellClassName: (params) => `cell-${params.value}`, 

    //   renderCell: (params) => {
    //     let icon;
    //     switch (params.value) {
    //       case 'accepted':
    //         icon = <DoneAllIcon />;
    //         break;
    //       case 'inOrder':
    //         icon = <AccessTimeIcon />;
    //         break;
    //       case 'doing':
    //         icon = <CheckCircleIcon />;
    //         break;
    //       case 'rejected':
    //         icon = <CancelIcon />;
    //         break;
    //       default:
    //         icon = null;
    //     }
    //     return icon;
    //   },
    // }
     {
  field: 'orderstatus',
  headerName: 'وضعیت سفارش',
  width: 220,
  headerAlign: 'center',
  editable: true,
  headerClassName: 'super-app-theme--header fs-5',
  sortable: false,
  filterable: false,
  renderCell: (params) => (
    <FormControl fullWidth>
      <Select
        value={params.value}
        onChange={(event) => {
          // اعمال تغییرات مربوط به تغییر مقدار combobox
          const newValue = event.target.value;
          console.log(newValue);
        }}
        displayEmpty
      >
        <MenuItem value="accepted">
          <DoneAllIcon />
        </MenuItem>
        <MenuItem value="inOrder">
          <AccessTimeIcon />
        </MenuItem>
        <MenuItem value="doing">
          <CheckCircleIcon />
        </MenuItem>
        <MenuItem value="rejected">
          <CancelIcon />
        </MenuItem>
      </Select>
    </FormControl>
  ),
},
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 180,
      headerClassName: 'super-app-theme--header fs-5',
      headerAlign:'center',

      cellClassName: 'actions',
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
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
  <DataGrid
    rows={rows}
    columns={columns}
    editMode="row"
    rowModesModel={rowModesModel}
    onRowModesModelChange={setRowModesModel}
    getRowClassName={(params) =>
      params.rowIndex % 2 === 0 ? 'MuiDataGrid-evenRow' : 'MuiDataGrid-oddRow'

    }
  />
</Box>




  );
}


