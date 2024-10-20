import React, { Component } from 'react';
function WalletManageMent(){


    return(
        <div className="row d-flex justify-content-between align-items-center">
        <div className="col-auto">
            <input type='text' placeholder='جستجو' className='form-control'></input>
        </div>
        <div className="col-auto">
            <button className='btn btn-primary'>تعریف کیف پول جدید</button>
        </div>
    </div>
    )
}
export default WalletManageMent;