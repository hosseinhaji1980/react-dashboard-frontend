import React, { useEffect, useState } from 'react';
import { Modal, Select } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchOrderNotes, updateOrderStatus } from './../services/orders/Orders'; // فرض می‌کنیم که تابع updateOrderStatus دارید

const { Option } = Select;

const ReportModal = ({ visible, onClose, orderData }) => {
  const [orderNotes, setOrderNotes] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(orderData?.orderstatus || '');

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return '';
    const [datePart, timePart] = dateTimeString.split(' ');
    return `${timePart} _ ${datePart}`;
  };

  useEffect(() => {
    const fetchNotes = async () => {
      if (orderData && orderData.orderid) {
        try {
          const response = await fetchOrderNotes(orderData.orderid);
          setOrderNotes(response);
        } catch (error) {
          console.error('Error fetching order notes:', error);
        }
      }
    };

    fetchNotes();
  }, [orderData]);

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
  };

  const handleUpdateStatus = async () => {
    if (orderData && orderData.orderid && selectedStatus) {
      try {
        await updateOrderStatus(orderData.orderid, selectedStatus);
        console.log('Order status updated successfully');
        // Optionally, you can close the modal or show a success message
      } catch (error) {
        console.error('Error updating order status:', error);
      }
    }
  };

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={1080}
    >
      {orderData && (
        <div>
          <div className="order-details mb-3">
            <h5 className="mb-0">شماره سفارش: {orderData.orderid}</h5>
          </div>
          <div className="row mb-3">
            <div className="col-6 d-flex justify-content-end">
              <Select
                value={selectedStatus}
                onChange={handleStatusChange}
                style={{ width: 180 }}
              >
                <Option value="در حال انجام">در حال انجام</Option>
                <Option value="تکمیل شده">تکمیل شده</Option>
                <Option value="لغو شده">لغو شده</Option>
                <Option value="در انتظار">در انتظار</Option>
                {/* اضافه کردن وضعیت‌های بیشتر در صورت نیاز */}
              </Select>
              <button className='btn btn-primary ms-2' onClick={handleUpdateStatus}>تغییر وضعیت سفارش</button>
            </div>
            <div className="col-6 d-flex justify-content-start">
              <button className='btn btn-danger'>ارسال پیامک</button>
            </div>
          </div>
          <div className="row">
            {/* بقیه بخش‌های فرم */}
            <div className="col-4 pe-2">
              <div className="bg-light border rounded p-3">
                <h4 className='mb-3'>اطلاعات سفارش</h4>
                <p><strong>کد محصول:</strong> {orderData.productcode}</p>
                <p><strong>پلتفرم:</strong> {orderData.platform}</p>
                <p><strong>نام کاربر:</strong> {orderData.username}</p>
                <p><strong>ایمیل:</strong> {orderData.email}</p>
                <p><strong>زمان تایید سفارش:</strong> {formatDateTime(orderData.dateaccept)}</p>
                <p><strong>زمان تکمیل سفارش:</strong> {formatDateTime(orderData.ordercompletiontime)}</p>
                <p><strong>زمان ثبت سفارش:</strong> {formatDateTime(orderData.orderdate)}</p>
                <p><strong>وضعیت سفارش:</strong> {orderData.orderstatus}</p>
              </div>
            </div>
            <div className="col-4 px-2">
              <div className="bg-light border rounded p-3">
                <h4 className='mb-3'>اطلاعات مشتری</h4>
                <p><strong>نام مشتری:</strong> {orderData.customername}</p>
                <p><strong>شماره تماس:</strong> {orderData.phone}</p>
                <p><strong>آدرس:</strong> {orderData.address}</p>
              </div>
            </div>
            <div className="col-4 ps-2">
              <div className="bg-light border rounded p-3">
                <h4 className='mb-3'>یادداشت‌ها</h4>
                {orderNotes.length > 0 ? (
                  orderNotes.map((note, index) => (
                    <div key={index} className={`mb-2 ${index % 2 === 0 ? 'note-even' : 'note-odd'}`}>
                      <p className='mx-2 mt-1'><strong>تاریخ:</strong> {formatDateTime(note.time)}</p>
                      <p className='mx-2 mt-1'>{note.message}</p>
                    </div>
                  ))
                ) : (
                  <p>یادداشتی برای این سفارش وجود ندارد.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ReportModal;
