import React, { useEffect, useState } from 'react';
import { Box, Pagination, Select, MenuItem } from '@mui/material';
import getOrdersApi from '../services/getOrdersApi';


function AppPagination(props) {
    const { from, to, onDataReceived } = props;
    const [pagination, setPagination] = useState({
        count: 0,
        from: from,
        to: to
    });
    const [rowsPerPage, setRowsPerPage] = useState(10); // تعداد سطرهای نمایش داده شده در هر صفحه

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getOrdersApi.getData({ from: pagination.from, to: pagination.to });
                console.log(`app pagination ${data.count} and from ${pagination.from} and to ${pagination.to}`);
                setPagination(prevState => ({
                    ...prevState,
                    count: data.count
                }));
                // onDataReceived(data.data); // ارسال اطلاعات جدید به کامپوننت والد

                // console.log(`app pagination ${data.data}`);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    // }, [pagination.from, pagination.to, onDataReceived]);
    }, []);

    const handlePageChange = (event, page) => {
        const newFrom = (page - 1) * rowsPerPage;
        const newTo = (page - 1) * rowsPerPage + rowsPerPage;
        setPagination({ ...pagination, from: newFrom, to: newTo });
    };

    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = event.target.value;
        const currentPage = Math.ceil(pagination.from / newRowsPerPage) + 1;
        const newFrom = (currentPage - 1) * newRowsPerPage;
        const newTo = (currentPage - 1) * newRowsPerPage + newRowsPerPage;
        setPagination({ ...pagination, from: newFrom, to: newTo });
        setRowsPerPage(newRowsPerPage);
    };

    return (
        <Box justifyContent="center" alignItems="center" display="flex" sx={{ margin: "20px 0px" }} margiin="20px">
            <Pagination
                count={Math.ceil(pagination.count / rowsPerPage)}
                onChange={handlePageChange}
                page={Math.ceil(pagination.from / rowsPerPage) + 1}
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
