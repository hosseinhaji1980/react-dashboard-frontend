// import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import './styles.css';
import React, { useCallback, useMemo, useState,useEffect } from 'react';
import getOrderList from '../services/getOrdersApi';
const GridExample = () => {
  const [rows, setRows] = useState([]); // استفاده از useState برای مدیریت داده‌های دریافتی از API
  const [columnDefs, setColumnDefs] = useState([
    { headerName: "شماره سفارش", field: "orderid" },
    { headerName: "تاریخ سفارش", field: "orderdate" },
    { headerName: "تاریخ تکمیل سفارش", field: "ordercompletiontime" },
    { headerName: "تاریخ پذیرش سفارش", field: "dateaccept" },
    { headerName: "شماره مشتری", field: "chatid" }
  ]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOrderList.getData();
        const data = await response; // اطلاعات ارسال شده از سمت سرور
        setRows(data);
        setRows(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const pageSizeElement = document.querySelector('.ag-paging-page-size .ag-label');
    if (pageSizeElement) {
      pageSizeElement.textContent = 'اندازه سطر در هر صفحه:';
    }
  }, []);
  
  const defaultColDef = useMemo(() => {
    return {
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      width: 100,
      filter: true,
      flex: 1,
      minWidth: 100,
    };
  }, []);
  const isFullWidthRow = useCallback((params) => {
    return params.rowNode.data.fullWidth;
  }, []);
  return (
    // Container with theme & dimensions
    <div
    // style={gridStyle}
    className={
      "ag-theme-quartz"
    }
  >
    <AgGridReact
      rowData={rows}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      pagination={true}
      paginationPageSize={10}
      paginationPageSizeSelector={[10, 20, 50]}
      domLayout={'autoHeight'}
      isFullWidthRow={isFullWidthRow}
      // fullWidthCellRenderer={fullWidthCellRenderer}
    />
  </div>









  );
}

export default GridExample;
