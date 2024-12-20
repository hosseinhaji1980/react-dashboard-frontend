import React from 'react';
import statusService from '../../../services/orders/status/statusService';
import { Form, Input, Button, Row, Col, message } from 'antd';

const CreateStatus = ({ onStatusAdded }) => {
    const onFinish = (values) => {
        statusService.addOrderStatus(values)
          .then(response => {
            if (response.status === 200) {
              message.success('وضعیت سفارش با موفقیت اضافه شد.');
              onStatusAdded(); // or alternatively, add the new status to statuses directly here.
            }
          })
          .catch(error => {
            message.error('در اضافه کردن وضعیت سفارش مشکلی پیش آمد.');
          });
      };
      

  return (
    <div className="row">
      <Form
        layout="vertical"
        onFinish={onFinish}
        style={{ width: '100%' }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="نام وضعیت"
              name="statusName"
              rules={[{ required: true, message: 'لطفاً نام وضعیت را وارد کنید' }]}
            >
              <Input placeholder="نام وضعیت سفارش" />
            </Form.Item>
          </Col>
          
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="توضیحات"
              name="description"
            >
              <Input.TextArea rows={3} placeholder="توضیحات وضعیت" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ marginTop: '30px' }}>
                اضافه کردن وضعیت
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateStatus;
