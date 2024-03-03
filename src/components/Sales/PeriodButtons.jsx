import React, { useState, useEffect } from 'react';
import FetchSales from '../../services/sales/fetchSales';
import numeral from 'numeral';

const PeriodButtons = () => {
    const [period, setPeriod] = useState(null);
    const [clickedPeriod, setClickedPeriod] = useState(null);
    const [activePeriod, setActivePeriod] = useState("روزانه"); // Initial active period

    useEffect(() => {
        // Load daily sales data when the component mounts
        handleClick('روزانه');
    }, []); // Empty dependency array ensures this effect runs only once on mount

    const handleClick = async (clickedPeriod) => {
        try {
            const periodMapping = {
                'روزانه': 'daily',
                'هفتگی': 'weekly',
                'ماهیانه': 'monthly',
                'سالیانه': 'yearly',
            };
            setActivePeriod(clickedPeriod);
            const periodValue = periodMapping[clickedPeriod];

            setClickedPeriod(clickedPeriod);
            if (periodValue) {
                const salesData = await FetchSales.getData(periodValue);
                
                setPeriod(salesData); 
            }
        } catch (error) {
            console.error('Error fetching sales data:', error);
        }
    };
    
    if (period!=null){

      const dataString = JSON.stringify(period[0].data);
      const dataObject = JSON.parse(dataString);
      const totalSalesString = dataObject[0].total_sales;
      const totalSalesNumber = parseInt(totalSalesString);
      console.log(totalSalesNumber);
    
  return (
 <div>
      <div>
        <div className="btn-group" role="group" aria-label="Basic outlined example">
          <button
            type="button"
            className={`btn btn-outline-primary ${activePeriod === 'روزانه' ? 'active' : ''}`}
  style={{ backgroundColor: activePeriod === 'روزانه' ? 'green' : '' }}
  onClick={() => handleClick('روزانه')}
          >
            روزانه
          </button>
          <button
            type="button"
            className={`btn btn-outline-primary ${activePeriod === 'هفتگی' ? 'active' : ''}`}
            style={{ backgroundColor: activePeriod === 'هفتگی' ? 'green' : '' }}

            onClick={() => handleClick('هفتگی')}
          >
            هفتگی
          </button>
          <button
            type="button"
            className={`btn btn-outline-primary ${activePeriod === 'ماهیانه' ? 'active' : ''}`}
            style={{ backgroundColor: activePeriod === 'ماهیانه' ? 'green' : '' }}

            onClick={() => handleClick('ماهیانه')}
          >
            ماهیانه
          </button>
          <button
            type="button"
            className={`btn btn-outline-primary ${activePeriod === 'سالیانه' ? 'active' : ''}`}
            style={{ backgroundColor: activePeriod === 'سالیانه' ? 'green' : '' }}

            onClick={() => handleClick('سالیانه')}
          >
            سالیانه
          </button>
        </div>
      </div>
      <h3 className='mt-2'> میزان فروش </h3>
      {totalSalesNumber != null? (
        <h4 className='mt-2'>{numeral(totalSalesNumber).format('0,0')} تومان</h4>
      ) : (
        <h5> 0 تومان</h5>
      )
      }
    </div>
  );
}
};

export default PeriodButtons;
