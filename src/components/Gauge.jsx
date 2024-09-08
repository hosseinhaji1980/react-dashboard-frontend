import React, { useState, useEffect } from 'react';
import { CircularGauge, Scale, Label, RangeContainer, Range, Export } from 'devextreme-react/circular-gauge';
import ApiService from './../services/orders/apiService';

const Gauge = ({ period, value }) => {
    const convertToHoursMinutes = (time) => {
        const minutes = Math.round(time);
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours} ساعت و ${remainingMinutes} دقیقه`;
    };

    const additionalPercentage = 10;
    const newAverageOrderTime = value ? value * (1 + additionalPercentage / 100) : 0;

    const rangeWidth = newAverageOrderTime / 5;
    const ranges = Array.from({ length: 5 }, (_, i) => ({
        startValue: i * rangeWidth,
        endValue: (i + 1) * rangeWidth,
        color: ['#228B22', '#FFD700', 'orange', 'red', '#8B0000'][i],
    }));

    return (
        <div>
            <CircularGauge id={`gauge-${period}`} value={value}>
                <Scale startValue={0} endValue={newAverageOrderTime + 50} tickInterval={10}>
                    <Label useRangeColors={true} />
                </Scale>
                <RangeContainer palette="Pastel">
                    {ranges.map((range, index) => (
                        <Range key={index} startValue={range.startValue} endValue={range.endValue} color={range.color} />
                    ))}
                </RangeContainer>
                <Export enabled={false} />
            </CircularGauge>
            {value !== null && (
                <span className="text-center">
                    میانگین برابر است با {convertToHoursMinutes(value)}
                </span>
            )}
        </div>
    );
};

const Gauges = () => {
    const [averageOrderTimes, setAverageOrderTimes] = useState({ daily: null, weekly: null, monthly: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAverageOrderTimes = async () => {
            try {
                const data = await ApiService.fetchAverageOrderTimes();
                setAverageOrderTimes(data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching average order times');
                setLoading(false);
            }
        };

        fetchAverageOrderTimes();
    }, []);

    if (loading) {
        return <div>در حال بارگذاری...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="row ">

            <div className="col-xl-4 col-md-6 col-sm-12 justify-content-between align-items-center bg-light mb-5 rounded text-center">
                <h6 className='mt-3'>میانگین زمانی انجام سفارشات روزانه</h6>
                <Gauge period="daily" value={averageOrderTimes.daily} />
            </div>
            <div className="col-xl-4 col-md-6 col-sm-12 justify-content-between align-items-center bg-light mb-5 rounded text-center">
                <h6 className='mt-3'>میانگین زمانی انجام سفارشات هفتگی</h6>
                <Gauge period="weekly" value={averageOrderTimes.weekly} />
            </div>
            <div className="col-xl-4 col-md-6 col-sm-12 justify-content-between align-items-center bg-light mb-5 rounded text-center">
                <h6 className='mt-3'>میانگین زمانی انجام سفارشات ماهانه</h6>
                <Gauge period="monthly" value={averageOrderTimes.monthly} />
            </div>
        </div>
    );
};

export default Gauges;
