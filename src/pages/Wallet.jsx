import React, { Component } from 'react';
import WalletMange from '../components/WalletManageMent';
import WalletsTableAntd from '../components/WalletTbl';
function Wallet(){
    return(
        <div className="wallet">
        <div className="row">

        <h1>
        کیف پول
        </h1>
        </div>
<div className="row">

        <WalletMange/>
</div>
<div className="row">
<WalletsTableAntd/>
</div>
        </div>)
}
export default Wallet;