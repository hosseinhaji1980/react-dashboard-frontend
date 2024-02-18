

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import AdminFunctional from '../../services/adminFunctionalApi';
import { DataGrid, GridToolbarContainer, GridActionsCellItem } from '@mui/x-data-grid';
import { Pagination, Stack } from '@mui/material';



function AdminsFunctional() {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AdminFunctional.getData();
        setRows(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


 
  const columns = [
    { 
      field: 'username', 
      headerName: 'نام اپراتور', 
      width: 220, 
      type: 'text', 
      headerAlign: 'center', 
      editable: true, 
      headerClassName: 'super-app-theme--header' ,
      hide: true

    },
    // { 
    //   field: 'admin_id', 
    //   headerName: 'شماره ادمین', 
    //   width: 220, 
    //   editable: true, 
    //   headerAlign: 'center', 
    //   headerClassName: 'super-app-theme--header', 
    //   style: { textAlign: 'center' } ,
    //   hidden: true,
    //   hideable: true
    // },
    { 
      field: 'avg_completion_time', 
      headerName: 'میانیگین انجام سفارش', 
      type: 'text', 
      width: 180, 
      editable: true, 
      cellClassName: 'super-app-theme--cell', 
      headerClassName: 'super-app-theme--header', 
      headerAlign: 'center' 
    },
    { 
      field: 'completed_orders', 
      headerName: 'سفارشات تکمیل شده', 
      width: 220, 
      type: 'text', 
      headerAlign: 'center', 
      editable: true, 
      headerClassName: 'super-app-theme--header' 
    },
    { 
      field: 'in_doing', 
      headerName: 'سفارشات در حال انجام', 
      width: 220, 
      type: 'text', 
      headerAlign: 'center', 
      editable: true, 
      headerClassName: 'super-app-theme--header', 
      renderCell: (params) => (
        <div style={ { backgroundColor: params.value > 0 ? 'yellow' : '', padding: '6px', borderRadius: '6px' }}>
          {params.value}
        </div>
      ),
    },
    { 
      field: 'rejected_orders', 
      headerName: 'سفارشات رد شده', 
      width: 220, 
      type: 'text', 
      headerAlign: 'center', 
      editable: true, 
      headerClassName: 'super-app-theme--header' 
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

      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.username}

        editMode="row"
        // pageSizeOptions={[5, 10, 25,50,100]}
        // initialState={{
        //   pagination: {
        //     paginationModel: { pageSize: 25, page: 0 },
        //   },
        // }}
        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        getRowClassName={(params) =>
          params.rowIndex % 2 === 0 ? 'MuiDataGrid-evenRow' : 'MuiDataGrid-oddRow'
        }
      />
      {/* <Stack spacing={2}>
        <Pagination count={10} variant="outlined" shape="rounded" style={{ padding: '10px', display:'absloute',margin:'-50px 300px',alignItems:'center',}} />
      </Stack> */}
    </Box>
  );
}

export default AdminsFunctional;
