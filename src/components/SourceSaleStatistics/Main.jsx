import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { RiInstagramFill } from "react-icons/ri";
import { SiTelegram, SiStrapi } from "react-icons/si";
import SourceOrdersApi from '../../services/orders/SourceOrdersApi';
import { FaCheck, FaHourglassHalf, FaPlay } from "react-icons/fa6";
import { PiToteSimpleFill } from "react-icons/pi";
import { TbPlayerEjectFilled } from "react-icons/tb";

const iconByIndex = (index) => {
    switch (index) {
        case 0:
            return <SiTelegram className="fs-1 icon-large text-center mb-3" />;
        case 1:
            return <RiInstagramFill className="fs-1 icon-large text-center mb-3" />;
        case 2:
            return <SiStrapi className="fs-1 icon-large text-center mb-3 " />;
        case 3:
            return <SiTelegram className="fs-1 icon-large text-center mb-3 " />;
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
        <div className="col">
            <div className={`card ${data.background} text-white text-opacity-75 h-100`}>
                <div className="card-body text-center d-flex flex-column justify-content-center">
                    <h6 className="fs-6 fw-semibold mb-3">{data.title}</h6>
                    <div className="text-center">
                        {iconByIndex(data.index)}
                    </div>
                    {loading ? (
                        <p>در حال بارگذاری...</p>
                    ) : (
                        <>
                            {ordersData && ordersData.length > data.index && (
                                <div className="row d-flex justify-content-between text-center">
                                    <div className="d-flex flex-wrap justify-content-center align-items-center w-100">
                                        <div className="d-flex flex-column align-items-center mx-1" title="کل سفارشات">
                                            <PiToteSimpleFill />
                                            <h6 className='mt-2'>{ordersData[data.index].total_orders}</h6>
                                        </div>
                                        <div className="vr mx-1"></div>
                                        <div className="d-flex flex-column align-items-center mx-1" title="سفارشات تایید شده">
                                            <FaCheck />
                                            <h6 className='mt-2'>{ordersData[data.index].accepted_orders}</h6>
                                        </div>
                                        <div className="vr mx-1"></div>
                                        <div className="d-flex flex-column align-items-center mx-1" title="سفارشات رد شده">
                                            <TbPlayerEjectFilled />
                                            <h6 className='mt-2'>{ordersData[data.index].rejected_orders}</h6>
                                        </div>
                                        <div className="vr mx-1"></div>
                                        <div className="d-flex flex-column align-items-center mx-1 " title="سفارشات در انتظار">
                                            <FaHourglassHalf />
                                            <h6 className='mt-2'>{ordersData[data.index].inOrder_orders}</h6>
                                        </div>
                                        <div className="vr mx-1"></div>
                                        <div className="d-flex flex-column align-items-center mx-1" title="سفارشات در حال انجام">
                                            <FaPlay />
                                            <h6 className='mt-2'>{ordersData[data.index].doing_orders}</h6>
                                        </div>
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
