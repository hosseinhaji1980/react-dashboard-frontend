import React from 'react';
import ProgressBar from './ProgressBar'; // فرضاً اسم فایل کامپوننت progress bar شما ProgressBar است

class OrderStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalOrders: 0,
      completedOrders: 0,
      pendingOrders: 0,
      inProgressOrders: 0,
      rejectedOrders: 0,
    };
  }

  componentDidMount() {
    // در اینجا مقادیر مختلف را از سرور یا دیگر منابع دریافت کرده و به وضعیت (state) این کامپوننت تنظیم کنید.
    // به عنوان مثال:
    this.setState({
      totalOrders: 1000,
      completedOrders: 650,
      pendingOrders: 200,
      inProgressOrders: 100,
      rejectedOrders: 50,
    });
  }

  render() {
    const { totalOrders, completedOrders, pendingOrders, inProgressOrders, rejectedOrders } = this.state;
    const totalPercentage = (completedOrders / totalOrders) * 100;
    const completedPercentage = (completedOrders / totalOrders) * 100;
    const pendingPercentage = (pendingOrders / totalOrders) * 100;
    const inProgressPercentage = (inProgressOrders / totalOrders) * 100;
    const rejectedPercentage = (rejectedOrders / totalOrders) * 100;

    return (
      <div>
        <ProgressBar label="کل سفارشات" value={totalPercentage} />
        <ProgressBar label="سفارشات تکمیل شده" value={completedPercentage} />
        <ProgressBar label="سفارشات در حال انتظار" value={pendingPercentage} />
        <ProgressBar label="سفارشات در حال انجام" value={inProgressPercentage} />
        <ProgressBar label="سفارشات رد شده" value={rejectedPercentage} />
      </div>
    );
  }
}

export default OrderStatistics;
