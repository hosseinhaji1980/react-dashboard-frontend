import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import getProductList from '../services/getProductListApi'; 

function EditToolbar({ setRows }) {
  const handleClick = async () => {
    try {
      const data = await getProductList.getData();
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

export default function ProductList() {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductList.getData();
        setRows(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleDeleteClick = (id) => async () => {
    try {
      await getProductList.deleteData(id);
      setRows(rows.filter(row => row.ID !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const columns = [
    { field: 'productCode', 
      headerName: 'کد محصول', 
      width: 180, 
      editable: true,      
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'platForm',
      headerName: 'پلتفرم',
      type: 'text',
      width: 180,
      editable: true,
      cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
    },
    {
      field: 'productPrice',
      headerName: 'قیمت به دلار',
      width: 220,
      type: 'number',
      editable: true,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'tomanPrice',
      headerName: 'قیمت به تومان',
      width: 220,
      type: 'number',
      editable: true,
      headerClassName: 'super-app-theme--header fs-5',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 180,
      headerClassName: 'super-app-theme--header fs-5',
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
        height: 500,
        width: '100%',
        boxShadow: 12,
        borderColor: 'primary.light',
        color: 'white',
        backgroundColor: 'white',
        fontFamily: 'shabnam',
        '& .MuiDataGrid-cell:hover': {
          color: 'info.main',
        },
        '& .super-app-theme--header': {
          backgroundColor: '#0322',
        },
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
        '& .even-row': {
          backgroundColor: 'white',
        },
        '& .odd-row': {
          backgroundColor: 'gray',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        getRowId={(row) => row.ID} // Specify the custom id field
      />
    </Box>
  );
}
