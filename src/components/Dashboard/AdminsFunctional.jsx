import React, { useState, useEffect } from 'react';
import AdminFunctional from '../../services/adminFunctionalApi';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';

const gridStyle = { minHeight: 550 };

const columns = [
  { name: 'admin_id', header: 'Admin ID' },
  { name: 'completed_orders', header: 'Completed Orders', type: 'number'},
  { name: 'in_doing', header: 'In Progress', type: 'number' },
  { name: 'rejected_orders', header: 'Rejected Orders', type: 'number' },
  { name: 'avg_completion_time', header: 'Average Completion Time', type: 'number'}
];

const AdminsFunctional = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AdminFunctional.getData();
        setData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <ReactDataGrid
      idProperty="admin_id"
      style={gridStyle}
      columns={columns}
      dataSource={data}
      className='m-4 text-center'
    />
  );
};

export default AdminsFunctional;
