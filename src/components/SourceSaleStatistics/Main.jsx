import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { RiInstagramFill } from "react-icons/ri";
import { SiTelegram, SiStrapi } from "react-icons/si";
import SourceOrdersApi from '../../services/orders/SourceOrdersApi';
import { FaCheck } from "react-icons/fa6";
import { PiToteSimpleFill } from "react-icons/pi";
import { TbPlayerEjectFilled } from "react-icons/tb";
import { MdStar } from 'react-icons/md';

const iconByIndex = (index) => {
    switch (index) {
        case 0:
            return <SiTelegram className="fs-1 icon-large text-center mb-3" />;
            case 1:
            return <RiInstagramFill className="fs-1 icon-large text-center mb-3" />;
        case 2:
            return <SiStrapi className="fs-1 icon-large text-center mb-3 " />;
        default:
            return null; 
    }
};

const Titleh = ({ data }) => {
    const [ordersData, setOrdersData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        SourceOrdersApi.getOrdersData()
            .then(response => {
                setOrdersData(response);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
                console.log(error);
            });
    }, []);

    return (
        <div>
            <div className={`col card ${data.background}  text-white text-opacity-75`}>
                <div className="card-body text-center">
                    <h6 className='fs-6 fw-semibold mb-3 '>{data.title}</h6>
                    <div className="text-center"> 
                        {iconByIndex(data.index)}
                    </div>
                    {loading ? (
                        <p>در حال بارگذاری...</p>
                    ) : (
                        <>
                            {ordersData && ordersData.length > data.index && (
                                <div className="row d-flex justify-content-between text-center">
                                    <div className='d-flex'>
                                        <span className='mx-1 p-0'><PiToteSimpleFill /></span>
                                        <h6>{ordersData[data.index].total_orders}</h6>
                                        <span className='mx-1 vr'></span>
                                        <span className="space-between-icons  mx-1"><FaCheck /></span> {/* اینجا یک span جداگانه برای فاصله اضافه شده است */}
                                        <h6>{ordersData[data.index].accepted_orders}</h6>
                                        <span className='mx-1 vr'></span>
                                        <span className="space-between-icons  mx-1"><TbPlayerEjectFilled /></span> {/* اینجا یک span جداگانه برای فاصله اضافه شده است */}
                                        <h6>{ordersData[data.index].rejected_orders}</h6>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Titleh;

