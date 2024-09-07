import React, { useState, useEffect } from 'react';
import {
    CircularGauge, Scale, Label, RangeContainer, Range, Export
} from 'devextreme-react/circular-gauge';
import ApiService from '../services/orders/apiService';

const Gauge = ({ period }) => {
    const [averageOrderTime, setAverageOrderTime] = useState(null);

    useEffect(() => {
        fetchAverageOrderTime();
    }, [period]);

    const fetchAverageOrderTime = async () => {
        try {
            const averageTime = await ApiService.fetchAverageOrderTime(period);
            setAverageOrderTime(parseFloat(averageTime));
        } catch (error) {
            console.error('Error fetching average order time:', error);
        }
    };

    const convertToHoursMinutes = (time) => {
        const minutes = Math.round(time);
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours} ساعت و ${remainingMinutes} دقیقه`;
    };

    const additionalPercentage = 10;
    const newAverageOrderTime = averageOrderTime ? averageOrderTime * (1 + additionalPercentage / 100) : 0;

    const range1Start = 0;
    const rangeWidth = newAverageOrderTime / 5;
    const range1End = range1Start + rangeWidth;
    const range2Start = range1End;
    const range2End = range2Start + rangeWidth;
    const range3Start = range2End;
    const range3End = range3Start + rangeWidth;
    const range4Start = range3End;
    const range4End = range4Start + rangeWidth;
    const range5Start = range4End;
    const range5End = range5Start + rangeWidth;

    return (
        <div>
            <CircularGauge id="gauge" value={averageOrderTime}>
                <Scale startValue={0} endValue={newAverageOrderTime + 50} tickInterval={10}>
                    <Label useRangeColors={true} />
                </Scale>
                <RangeContainer palette="Pastel">
                    <Range startValue={range1Start} endValue={range1End} color="#228B22" />
                    <Range startValue={range2Start} endValue={range2End} color="#FFD700" />
                    <Range startValue={range3Start} endValue={range3End} color="orange" />
                    <Range startValue={range4Start} endValue={range4End} color="red" />
                    <Range startValue={range5Start} endValue={newAverageOrderTime} color="#8B0000" />
                </RangeContainer>
                <Export enabled={false} />
            </CircularGauge>
            {averageOrderTime !== null && (
                <span className="text-center">
                    میانگین برابر است با {convertToHoursMinutes(averageOrderTime)}
                </span>
            )}
        </div>
    );
};

export default Gauge;
