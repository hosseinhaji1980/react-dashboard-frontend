import React, { useState, useEffect } from 'react';
import FetchSales from '../../services/sales/fetchSales';
import numeral from 'numeral';
import GradientLine from '../Barchart/GradientLine'; // Adjust the path accordingly

const PeriodButtons = () => {
  const [period, setPeriod] = useState(null);
  const [activePeriod, setActivePeriod] = useState("روزانه"); // Initial active period

  useEffect(() => {
    fetchData('روزانه');
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const fetchData = async (selectedPeriod) => {
    try {
      const periodValue = {
        'روزانه': 'daily',
        'هفتگی': 'weekly',
        'ماهیانه': 'monthly',
        'سالیانه': 'yearly',
      }[selectedPeriod];

      setActivePeriod(selectedPeriod);

      if (periodValue) {
        const salesData = await FetchSales.getData(periodValue);
        
        // تبدیل مبلغ فروش به عدد
        const formattedData = salesData.map(item => ({
          ...item,
          total_sales: parseInt(item.total_sales)
        }));

        // تبدیل تاریخ فروش به تاریخ
        const formattedDates = salesData.map(item => ({
          ...item,
          week: new Date(item.week).toLocaleDateString('fa-IR')
        }));

        setPeriod(formattedData);
        console.log(period);
        
      }
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };
  
  return (
    <div>
      <div>
        <h4 className='mt-2'>میزان فروش</h4>
        <div className="btn-group" role="group" aria-label="Basic outlined example">
          {['روزانه', 'هفتگی', 'ماهیانه', 'سالیانه'].map((period, index) => (
            <button
              key={index}
              type="button"
              className={`btn btn-outline-primary ${activePeriod === period ? 'active' : ''}`}
              style={{ backgroundColor: activePeriod === period ? 'green' : '' }}
              onClick={() => fetchData(period)}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      {period ? (
        <div>
          <h4 className='mt-2'>{numeral(period.total_sales).format('0,0')} تومان</h4>
          <div>
            <GradientLine dataset={period} />
          </div>
        </div>
      ) : (
        <h5>0 تومان</h5>
      )}
    </div>
  );
};

export default PeriodButtons;
