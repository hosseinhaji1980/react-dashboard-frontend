import React, { useState } from 'react';
import FetchSales from '../../services/sales/fetchSales';
import numeral from 'numeral';

// const PeriodButtons = ({ onPeriodChange }) => {
const PeriodButtons = () => {
    const [period, setPeriod] = useState(null);
    const [clickedPeriod,setClickedPeriod]=useState(null);
  const handleClick = async (clickedPeriod) => {
    try {
      const periodMapping = {
        'روزانه': 'daily',
        'هفتگی': 'weekly',
        'ماهیانه': 'monthly',
        'سالیانه': 'yearly',
      };
      const periodValue = periodMapping[clickedPeriod];
      console.log(clickedPeriod);
      setClickedPeriod(clickedPeriod);
      if (periodValue) {
        const salesData = await FetchSales.getData(periodValue);
        console.log(`period ${salesData.data}`);
        setPeriod(salesData.data); 
      }
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };
console.log(`sale data ${period}`);
  return (
    <div>
      <div className="btn-group" role="group" aria-label="Basic outlined example">
        <button type="button" className="btn btn-outline-primary" onClick={() => handleClick('روزانه')}>روزانه</button>
        <button type="button" className="btn btn-outline-primary" onClick={() => handleClick('هفتگی')}>هفتگی</button>
        <button type="button" className="btn btn-outline-primary" onClick={() => handleClick('ماهیانه')}>ماهیانه</button>
        <button type="button" className="btn btn-outline-primary" onClick={() => handleClick('سالیانه')}>سالیانه</button>
        
      </div>
      <h3 className='mt-2'> میزان فروش </h3>
      {period > 0 ? (
        <h4 className='mt-2'>{numeral(period).format('0,0')} تومان</h4>
) : <h5> بدون فروش</h5>}

    </div>


  );
};

export default PeriodButtons;
