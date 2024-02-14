import React, { useState, useEffect } from 'react';
import AdminFunctional from '../../services/adminFunctionalApi';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';

// const gridStyle = { minHeight: 550 };

// const columns = [
//   { name: 'admin_id', header: 'Admin ID' },
//   { name: 'completed_orders', header: 'Completed Orders', type: 'number'},
//   { name: 'in_doing', header: 'In Progress', type: 'number' },
//   { name: 'rejected_orders', header: 'Rejected Orders', type: 'number' },
//   { name: 'avg_completion_time', header: 'Average Completion Time', type: 'number'}
// ];

// const AdminsFunctional = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await AdminFunctional.getData();
//         setData(response);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <ReactDataGrid
//       idProperty="admin_id"
//       style={gridStyle}
//       columns={columns}
//       dataSource={data}
//       className='m-4 text-center'
//     />
//   );
// };

// export default AdminsFunctional;
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

//nested data is ok, see accessorKeys in ColumnDef below
const data = [
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Joe',
      lastName: 'Doe',
    },
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Vandy',
    },
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    name: {
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    },
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
  },
];

const AdminsFunctional = () => {
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name.firstName', //access nested data with dot notation
        header: 'First Name',
        size: 150,
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
        size: 150,
      },
      {
        accessorKey: 'address', //normal accessorKey
        header: 'Address',
        size: 200,
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 150,
      },
      {
        accessorKey: 'state',
        header: 'State',
        size: 150,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return <MaterialReactTable table={table} />;
};

export default AdminsFunctional;
