import React, { useState, useEffect } from "react";
import {
    CircularGauge, Scale, Label, RangeContainer, Range, Title, Font, Export,
} from 'devextreme-react/circular-gauge';
import ApiService from '../services/apiService';

const Gauge = () => {
    const [averageOrderTime, setAverageOrderTime] = useState(null);

    useEffect(() => {
        fetchAverageOrderTime();
    }, []);

    const fetchAverageOrderTime = () => {
        ApiService.fetchAverageOrderTime()
            .then(averageOrderTime => {
                setAverageOrderTime(averageOrderTime);
            })
            .catch(error => {
                console.error('خطا در دریافت اطلاعات:', error);
            });
    };

    const convertToHoursMinutes = (time) => {
        const minutes = Math.round(parseFloat(time));
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} ساعت و ${remainingMinutes} دقیقه`;
    };

    return (
        <div>
            <CircularGauge id="gauge" value={averageOrderTime }>
                <Scale startValue={0} endValue={200} tickInterval={10}>
                    <Label useRangeColors={true} />
                </Scale>
                <RangeContainer palette="Pastel">
                    <Range startValue={0} endValue={50} color="#228B22" />
                    <Range startValue={50} endValue={100} color="#FFD700" />
                    <Range startValue={100} endValue={200} color="red" />
                </RangeContainer>
                <Export enabled={false} />
            </CircularGauge>
            {averageOrderTime && (
                <span className="text-center">میانگین برابر است با {convertToHoursMinutes(averageOrderTime)}</span>
            )}
        </div>
    );
};


export default Gauge;
