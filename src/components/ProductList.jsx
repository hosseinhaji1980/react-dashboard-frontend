// import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import './styles.css';
import React, { useCallback, useMemo, useState,useEffect } from 'react';
import getProductList from '../services/getProductListApi';

const ProductList = () => {
  const [rows, setRows] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    { headerName: "قیمت به دلار", field: "productPrice" },
    { headerName: "قیمت به تومان", field: "tomanPrice" },
    { headerName: "پلتفرم", field: "platForm" },
    { headerName: "عنوان", field: "title" },
    { headerName: "کد  محصول", field: "productCode" }
  ]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductList.getData();
        console.log(`RESPONSE DATA IS ${ response}`);
        setRows(response);
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

export default ProductList;
