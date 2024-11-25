import React, { Component,useState,useEffect } from 'react';
import walletsService from '../../services/walletsService';
import { Table, Input, Spin, Button, Form, Modal, Select, message } from 'antd';

const WalletsList=()=>{
    const [selectedWallet, setSelectedWallet] = useState(null);
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);

    const fetchWallets = async () => {
        try {
          setLoading(true);
          const response = await walletsService.getList();
          setWallets(response.data);
        } catch (error) {
          message.error('خطا در دریافت اطلاعات کیف پول‌ها');
        } finally {
          setLoading(false);
        }
      };
    return(
        <div className="row"></div>
    )
}
export default WalletsList;