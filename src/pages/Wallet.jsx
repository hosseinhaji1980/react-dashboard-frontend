import React, { Component } from 'react';
import WalletsTableAntd from '../components/Wallet/WalletTbl';
import CreateWallet from '../components/Wallet/CreateWallet';
import WalletBalanceTable from '../components/Wallet/WalletBalances';
function Wallet(){
    return(
        <div className="wallet">
        <div className="row">

        <h1>
        کیف پول
        </h1>
        </div>
<div className="row">
        <CreateWallet/>

</div>
<div className="row">
<WalletsTableAntd/>
</div>
<div className="row">
        <WalletBalanceTable/>
</div>
        </div>)
}
export default Wallet;