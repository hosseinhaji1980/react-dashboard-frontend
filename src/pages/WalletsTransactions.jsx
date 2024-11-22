import React, { Component } from 'react';
import WalletChargeForm from '../components/Wallet/WalletChargeForm';
import TransactionsDetail from '../components/Wallet/TransactionsDetail';
const WalletsTransaction=()=>{
    return(
        <div className="container bg-white rounded-1 p-4 shadow-sm">
            <div className="row">
                <WalletChargeForm/>
            </div>
           
            <div className="row">
                <TransactionsDetail/>;
            </div>
            </div>
    )
}
export default WalletsTransaction;