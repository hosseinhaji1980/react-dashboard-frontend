import React, { useState } from 'react';
import { Box, Pagination, Select, MenuItem } from '@mui/material';

function AppPagination({ totalCount, currentPage, onPageChange, onRowsPerPageChange }) {
  const [page, setPage] = useState(currentPage);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = event.target.value;
    setRowsPerPage(newRowsPerPage);
    setPage(1); // Reset page to 1 when changing rows per page
    onRowsPerPageChange(newRowsPerPage); // Notify parent component about rows per page change
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    onPageChange(newPage); // Notify parent component about page change
  };

  return (
    
    <Box display="flex" justifyContent="center" alignItems="center">
      <Pagination
        count={Math.ceil(totalCount / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
      />
      <Select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={25}>25</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={100}>100</MenuItem>
      </Select>
    </Box>
  );
}

export default AppPagination;
