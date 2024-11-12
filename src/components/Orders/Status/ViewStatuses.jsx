import React, { useEffect, useState } from 'react';
import { Table, Button, Input, notification,message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import statusService from '../../../services/orders/status/statusService';
import CreateStatus from './CreateStatus';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderStatuses = () => {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingRow, setEditingRow] = useState(null);

  useEffect(() => {
    fetchOrderStatuses();
  }, []);

  const fetchOrderStatuses = () => {
    setLoading(true);
    statusService.getOrderStatuses()
      .then(response => {
        setStatuses(response.data);
      })
      .catch(error => {
        message.error({
          message: 'خطا',
          description: 'در بارگذاری وضعیت‌های سفارش مشکلی پیش آمد.',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEdit = (record) => {
    setEditingRow(record.id);
  };

  const handleSave = (record) => {
    statusService.updateOrderStatus(record.id, record)
      .then(() => {
        message.success({
          message: 'موفقیت',
          description: 'وضعیت سفارش با موفقیت ویرایش شد.',
        });
        // به‌روز‌رسانی داده‌های محلی بدون نیاز به درخواست مجدد از سرور
        setStatuses(prevStatuses =>
          prevStatuses.map(item =>
            item.id === record.id ? { ...item, ...record } : item
          )
        );
        setEditingRow(null);
      })
      .catch(error => {
        message.error({
          message: 'خطا',
          description: 'در ویرایش وضعیت سفارش مشکلی پیش آمد.',
        });
      });
  };

  const handleDelete = (id) => {
    statusService.deleteOrderStatus(id)
      .then(() => {
        message.success({
          message: 'موفقیت',
          description: 'وضعیت سفارش با موفقیت حذف شد.',
        });
        fetchOrderStatuses();
      })
      .catch(error => {
        message.error({
          message: 'خطا',
          description: 'در حذف وضعیت سفارش مشکلی پیش آمد.',
        });
      });
  };

  const columns = [
    {
      title: 'شناسه وضعیت',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'نام وضعیت',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      render: (text, record) => (
        editingRow === record.id ? (
          <Input
            value={record.title}
            onChange={(e) => {
              const newData = statuses.map((item) => {
                if (item.id === record.id) {
                  return { ...item, title: e.target.value };
                }
                return item;
              });
              setStatuses(newData);
            }}
          />
        ) : (
          text
        )
      ),
    },
    {
      title: 'توضیحات',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      render: (text, record) => (
        editingRow === record.id ? (
          <Input
            value={record.description}
            onChange={(e) => {
              const newData = statuses.map((item) => {
                if (item.id === record.id) {
                  return { ...item, description: e.target.value };
                }
                return item;
              });
              setStatuses(newData);
            }}
          />
        ) : (
          text
        )
      ),
    },
    {
      title: 'عملیات',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <div>
          {editingRow === record.id ? (
            <Button onClick={() => handleSave(record)} type="primary" style={{ marginRight: 8 }}>
              ذخیره
            </Button>
          ) : (
            <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }} type="default">
              <FontAwesomeIcon icon={faEdit} /> ویرایش
            </Button>
          )}
          <Button onClick={() => handleDelete(record.id)} type="danger">
            <FontAwesomeIcon icon={faTrash} /> حذف
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
    <CreateStatus onStatusAdded={fetchOrderStatuses} /> {/* ارسال تابع بازخوانی به عنوان prop */}
      <h2>وضعیت‌های سفارش</h2>
      <Table
        dataSource={statuses}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
      />
    </div>
  );
};

export default OrderStatuses;
