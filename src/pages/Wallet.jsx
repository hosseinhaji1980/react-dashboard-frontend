import React, { Component } from 'react';
import WalletMange from '../components/Wallet/WalletManageMent';
import WalletsTableAntd from '../components/Wallet/WalletTbl';
import CreateWallet from '../components/Wallet/CreateWallet';
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
        </div>)
}
export default Wallet;