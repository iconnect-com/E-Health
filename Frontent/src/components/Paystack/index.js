import React, { useEffect, useState, useCallback } from 'react';
import './index.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Logo from '../../assets/LandingPage.png';
import { useNavigate } from 'react-router-dom';
import { useAddPayments } from 'src/modules/Patient/Hooks';
import { LoadingButton } from '@mui/lab';
import { useIsMutating } from '@tanstack/react-query';

const Paystack = ({ user, datas, app, appId, open, onClose, onPaymentSuccess }) => {
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const navigate = useNavigate();
  const isLoading = useIsMutating();

  const { mutate, refs } = useAddPayments({
    onSuccess: () => {
      navigate('/');
    },
  });

  const AuthUrl = refs?.authorizationUrl;

  useEffect(() => {
    if (user) {
      setName(user.fullname);
      setEmail(user.email);
      setPhone(user.phone || '09160409957');
    }
    if (datas) {
      setAmount(datas * 100);
    }
  }, [user, datas]);

  const handlePaystackCloseAction = () => {};

  const [formData, setFormData] = useState({
    email: user?.email,
    appointment_type: [
      {
        name: app?.appointment_type,
        id: appId,
        price: amount,
      },
    ],
    amount: amount,
  });

  useEffect(() => {
    setFormData({
      email: user?.email,
      appointment_type: [
        {
          name: app?.appointment_type,
          id: appId,
          price: amount,
        },
      ],
      amount: amount,
    });
  }, [amount, app?.appointment_type, appId, user?.email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 0,
    p: 4,
  };

  const handlePaystackSuccessAction = useCallback(
    (reference) => {
      onPaymentSuccess(reference);
      onClose();
    },
    [onPaymentSuccess, onClose]
  );

  useEffect(() => {
    if (AuthUrl) {
      const handler = window.PaystackPop.setup({
        key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
        email: user?.email,
        amount: amount,
        ref: new Date().getTime().toString(),
        onClose: handlePaystackCloseAction,
        callback: function (response) {
          handlePaystackSuccessAction(response);
        },
      });

      handler.openIframe();
    }
  }, [AuthUrl, amount, handlePaystackSuccessAction, user?.email]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="App">
          <div className="container">
            <div className="item">
              <div className="overlay-effect"></div>
              <img className="item-image" src={Logo} alt="product" />
              <div className="item-details">
                <p className="item-details__title">{appId}</p>
                <p className="item-details__amount">NGN {datas}</p>
              </div>
            </div>
            <div className="checkout">
              <div className="checkout-form">
                <div className="checkout-field">
                  <label>Name</label>
                  <input type="text" id="name" value={name} readOnly />
                </div>
                <div className="checkout-field">
                  <label>Email</label>
                  <input type="text" id="email" value={email} readOnly />
                </div>
                <div className="checkout-field">
                  <label>Phone</label>
                  <input type="text" id="phone" value={phone} readOnly />
                </div>
                <LoadingButton
                  loading={isLoading > 0}
                  onClick={handleSubmit}
                  className="paystack-button"
                >
                  {' '}
                  Pay Now
                </LoadingButton>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
export default Paystack;
