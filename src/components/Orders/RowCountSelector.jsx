import React from 'react';
import { Select, MenuItem } from '@mui/material';

function RowCountSelector({ rowsPerPage, handleChangeRowsPerPage }) {
  return (
    <Select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
      <MenuItem value={5}>5</MenuItem>
      <MenuItem value={10}>10</MenuItem>
      <MenuItem value={25}>25</MenuItem>
      <MenuItem value={50}>50</MenuItem>
      <MenuItem value={100}>100</MenuItem>
    </Select>
  );
}

export default RowCountSelector;
