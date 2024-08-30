
import React, { useState, useEffect } from 'react';
import { Table, Button, Select, Popconfirm, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Pagination from 'react-bootstrap/Pagination';
import getProductList from '../services/getProductListApi';

const { Option } = Select;

export default function ProductList() {
  const [rows, setRows] = useState([]);
  const [editingRowKey, setEditingRowKey] = useState('');
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productData, categoryData] = await Promise.all([
          getProductList.getData(),
          getProductList.getCategories(),
        ]);
        setRows(productData);
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const isEditing = (record) => record.productCode === editingRowKey;

  const edit = (record) => {
    setEditingRowKey(record.productCode);
  };

  const cancel = () => {
    setEditingRowKey('');
  };

  const save = async (key) => {
    try {
      const row = rows.find((item) => key === item.productCode);
      await getProductList.updateProduct(row.productCode, row);
      setEditingRowKey('');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDelete = async (key) => {
    try {
      await getProductList.deleteProduct(key);
      setRows(rows.filter((row) => row.productCode !== key));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleCategoryChange = (key, value) => {
    setRows(rows.map((row) => (row.productCode === key ? { ...row, category_id: value } : row)));
  };

  const handleInputChange = (key, dataIndex, value) => {
    setRows(rows.map((row) => (row.productCode === key ? { ...row, [dataIndex]: value } : row)));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1); // بازنشانی به صفحه اول پس از تغییر تعداد ردیف‌ها
  };

  const columns = [
    {
      title: 'کد محصول',
      dataIndex: 'productCode',
      key: 'productCode',
      editable: true,
      render: (text, record) => {
        const editing = isEditing(record);
        return editing ? (
          <Input
            value={record.productCode}
            onChange={(e) => handleInputChange(record.productCode, 'productCode', e.target.value)}
            className='edit'
          />
        ) : (
          text
        );
      },
    },
    {
      title: 'پلتفرم',
      dataIndex: 'platForm',
      key: 'platForm',
      editable: true,
      render: (text, record) => {
        const editing = isEditing(record);
        return editing ? (
          <Input
            value={record.platForm}
            onChange={(e) => handleInputChange(record.productCode, 'platForm', e.target.value)}
            className='edit'
          />
        ) : (
          text
        );
      },
    },
    {
      title: 'قیمت به دلار',
      dataIndex: 'productPrice',
      key: 'productPrice',
      editable: true,
      render: (text, record) => {
        const editing = isEditing(record);
        return editing ? (
          <Input
            value={record.productPrice}
            onChange={(e) => handleInputChange(record.productCode, 'productPrice', e.target.value)}
            className='edit'
          />
        ) : (
          text
        );
      },
    },
    {
      title: 'قیمت به تومان',
      dataIndex: 'tomanPrice',
      key: 'tomanPrice',
      editable: true,
      render: (text, record) => {
        const editing = isEditing(record);
        return editing ? (
          <Input
            value={record.tomanPrice}
            onChange={(e) => handleInputChange(record.productCode, 'tomanPrice', e.target.value)}
            className='edit'
          />
        ) : (
          text
        );
      },
    },
    {
      title: 'دسته‌بندی محصول',
      dataIndex: 'category',
      key: 'category',
      editable: true,
      render: (_, record) => {
        const editing = isEditing(record);
        return editing ? (
          <Select
            defaultValue={record.category_id || ''}
            onChange={(value) => handleCategoryChange(record.productCode, value)}
            style={{ width: '100%' }}
            className='edit'
          >
            {categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.title}
              </Option>
            ))}
          </Select>
        ) : (
          categories.find((cat) => cat.id === record.category_id)?.title || ''
        );
      },
    },
    {
      title: 'عملیات',
      key: 'actions',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              onClick={() => save(record.productCode)}
              type="primary"
              style={{ marginRight: 8 }}
            >
              ذخیره
            </Button>
            <Popconfirm title="می خواهید انصراف دهید؟" onConfirm={cancel}>
              <Button>انصراف</Button>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Button
              icon={<EditOutlined />}
              onClick={() => edit(record)}
              style={{ marginRight: 8 }}
            >
              ویرایش
            </Button>
            <Popconfirm title="می خواهید محصول موردنظر حذف شود؟" onConfirm={() => handleDelete(record.productCode)}>
              <Button icon={<DeleteOutlined />} danger>
                حذف
              </Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const currentRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const totalPages = Math.ceil(rows.length / pageSize);
  const paginationItems = [];

  // نمایش صفحات اولیه
  for (let number = 1; number <= Math.min(2, totalPages); number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
        {number}
      </Pagination.Item>
    );
  }

  // اضافه کردن ... برای صفحات وسط
  if (totalPages > 5 && currentPage > 3) {
    paginationItems.push(<Pagination.Ellipsis key="start-ellipsis" />);
  }

  // نمایش صفحات وسط (که نزدیک به صفحه جاری هستند)
  for (let number = Math.max(3, currentPage - 1); number <= Math.min(totalPages - 2, currentPage + 1); number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
        {number}
      </Pagination.Item>
    );
  }

  // اضافه کردن ... برای صفحات وسط
  if (totalPages > 5 && currentPage < totalPages - 2) {
    paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" />);
  }

  // نمایش صفحات انتهایی
  for (let number = Math.max(totalPages - 1, 3); number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <span>تعداد ردیف‌ها در هر صفحه: </span>
        <Select defaultValue={5} onChange={handlePageSizeChange} style={{ width: 120 }}>
          <Option value={5}>5</Option>
          <Option value={10}>10</Option>
          <Option value={15}>15</Option>
          <Option value={20}>20</Option>
        </Select>
      </div>
      <Table
        dataSource={currentRows}
        columns={columns}
        rowKey="productCode"
        pagination={false} // غیرفعال کردن صفحه‌بندی پیش‌فرض
      />
      <Pagination>
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
        />
        {paginationItems}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : currentPage)}
          disabled={currentPage >= totalPages}
        />
      </Pagination>
    </div>
  );
}
