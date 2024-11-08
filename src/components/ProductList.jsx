import React, { useState, useEffect } from 'react';
import { Table, Button, Select, Popconfirm, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Pagination from 'react-bootstrap/Pagination';
import getProductList from '../services/getProductListApi';

const { Option } = Select;

const ProductList = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [editingRowKey, setEditingRowKey] = useState('');
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchCategory, setSearchCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productData, categoryData] = await Promise.all([
          getProductList.getData(),
          getProductList.getCategories(),
        ]);
        setRows(productData);
        setCategories(categoryData);
        setFilteredRows(productData);
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

  const handleSearch = () => {
    const filteredData = rows.filter((item) => {
      const titleMatch = item.title.includes(searchTitle);
      const categoryMatch = searchCategory ? item.category_id === searchCategory : true;
      return titleMatch && categoryMatch;
    });
    setFilteredRows(filteredData);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchTitle('');
    setSearchCategory('');
    setFilteredRows(rows);
    setCurrentPage(1);
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
      title: 'عنوان محصول',
      dataIndex: 'title',
      key: 'title',
      editable: true,
      render: (text, record) => {
        const editing = isEditing(record);
        return editing ? (
          <Input
            value={record.title}
            onChange={(e) => handleInputChange(record.productCode, 'title', e.target.value)}
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
            <Button onClick={() => save(record.productCode)} type="primary" style={{ marginRight: 8 }}>
              ذخیره
            </Button>
            <Popconfirm title="می خواهید انصراف دهید؟" onConfirm={cancel}>
              <Button>انصراف</Button>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Button icon={<EditOutlined />} onClick={() => edit(record)} style={{ marginRight: 8 }}>
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

  const totalPages = Math.ceil(filteredRows.length / pageSize);
  const getPaginationItems = () => {
    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
      if (
        number === 1 ||
        number === totalPages ||
        (number >= currentPage - 1 && number <= currentPage + 1)
      ) {
        paginationItems.push(
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </Pagination.Item>
        );
      } else if (
        (number === currentPage - 2 && number > 1) ||
        (number === currentPage + 2 && number < totalPages)
      ) {
        paginationItems.push(<Pagination.Ellipsis key={`ellipsis-${number}`} />);
      }
    }
    return paginationItems;
  };

  const currentRows = filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="عنوان محصول"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          style={{ width: 200, marginRight: 8 }}
        />
        <Select
          placeholder="دسته‌بندی"
          value={searchCategory}
          onChange={(value) => setSearchCategory(value)}
          style={{ width: 200, marginRight: 8 }}
        >
          <Option value="">همه دسته‌ها</Option>
          {categories.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.title}
            </Option>
          ))}
        </Select>
        <Button type="primary" onClick={handleSearch} style={{ marginRight: 8 }}>
          جستجو
        </Button>
        <Button onClick={handleClearFilters}>پاک کردن فیلتر</Button>
      </div>
      <Table dataSource={currentRows} columns={columns} rowKey="productCode" pagination={false} />
      <Pagination>
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {getPaginationItems()}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages} />
      </Pagination>
    </div>
  );
};

export default ProductList;
