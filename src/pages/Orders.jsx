import React, { Component } from 'react'
// import Orders from '../components/Orders';
import Orders from '../components/Orders';

class Product extends Component {
    state = {  } 
    render() { 
        return (
            <div>
                {/* <Orders /> */}
                <h1>سفارشات</h1>

<Orders/>
            </div>
        );
    }
}
 
export default Product;