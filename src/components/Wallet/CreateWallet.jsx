import React, { useState } from 'react';
import { Form, FormGroup, FormLabel, FormControl, Button, Modal } from 'react-bootstrap';
import walletsService from '../../services/walletsService';

const CreateWallet = () => {
  const [formData, setFormData] = useState({
    wallet_name: '',
    wallet_balance: '',
    visa: '1',
    wallet_type: 'دلاری',
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'wallet_balance' ? parseFloat(value) || '' : value,
    }));
  };

  const onFinish = async (e) => {
    e.preventDefault();
    try {
      const response = await walletsService.createWallet(formData);
      // بررسی وضعیت یا پیام موفقیت در پاسخ سرور
      if (response?.status === 200 || response?.status === 201 || response?.data?.success) {
        setFormData({
          wallet_name: '',
          wallet_balance: '',
          visa: '1',
          wallet_type: 'دلاری',
        });
        setModalMessage('کیف پول با موفقیت ایجاد شد.');
        setIsError(false);
      } else {
        throw new Error(response?.data?.message || 'خطا در دریافت پاسخ سرور');
      }
    } catch (error) {
      setModalMessage(error.message || 'خطا در ایجاد کیف پول. لطفاً دوباره تلاش کنید.');
      setIsError(true);
    } finally {
      setShowModal(true); // همیشه مودال نمایش داده شود
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="create wallet bg-white rounded-1 p-4 shadow-sm">
      <Form onSubmit={onFinish} className="mx-2 mt-3">
        <h4 className="text-center mb-4">ایجاد کیف پول جدید</h4>

        <FormGroup>
          <FormLabel className="mt-4">نام کیف پول</FormLabel>
          <FormControl
            name="wallet_name"
            type="text"
            value={formData.wallet_name}
            onChange={handleInputChange}
            required
            placeholder="نام کیف پول را وارد کنید"
          />
        </FormGroup>

        <FormGroup>
          <FormLabel className="mt-4">میزان موجودی</FormLabel>
          <FormControl
            name="wallet_balance"
            type="number"
            value={formData.wallet_balance}
            onChange={handleInputChange}
            required
            placeholder="میزان موجودی کیف پول"
          />
        </FormGroup>

        <div className="row">
          <div className="col-6">
            <FormGroup>
              <FormLabel className="mt-4">ویزا</FormLabel>
              <FormControl
                name="visa"
                as="select"
                value={formData.visa}
                onChange={handleInputChange}
                required
              >
                <option value="1">بله</option>
                <option value="0">خیر</option>
              </FormControl>
            </FormGroup>
          </div>
          <div className="col-6">
            <FormGroup>
              <FormLabel className="mt-4">نوع کیف پول</FormLabel>
              <FormControl
                name="wallet_type"
                as="select"
                value={formData.wallet_type}
                onChange={handleInputChange}
                required
              >
                <option value="دلاری">دلار</option>
                <option value="تومان">تومان</option>
              </FormControl>
            </FormGroup>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <Button type="submit" variant="success" className="mt-4 mb-3">
            ایجاد کیف پول
          </Button>
        </div>
      </Form>

      {/* Modal for Success/Failure Messages */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className={isError ? 'bg-danger text-white' : 'bg-success text-white'}>
          <Modal.Title>{isError ? 'خطا' : 'موفقیت'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant={isError ? 'danger' : 'success'} onClick={handleCloseModal}>
            بستن
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateWallet;
