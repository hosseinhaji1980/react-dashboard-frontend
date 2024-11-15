import React, {useState,useEffect, Component } from 'react';
import Transactions from '../components/Wallet/TransactionsTbl';
const WalletsTransaction=()=>{
    return(
        <div className="container">
            <h1>تراکنش های کیف پول</h1>
<div className="row">
    <Transactions/>
</div>
        </div>
    )
}
export default WalletsTransaction;