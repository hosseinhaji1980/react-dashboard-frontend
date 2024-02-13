import React, { useState, useEffect } from 'react';
import ApexCharts from 'apexcharts';
import SourceOrdersApi from '../../services/CustomersOrdersStatisticsApi';

const CustomersOrdersStatisticsApi = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        SourceOrdersApi.getCutstomersorderstatistics()
            .then(response => {
                const myArray = [];
                console.log(response);
                myArray.push( response);
                // const rawData = [
                //     {
                //         "name": "Pgemshop",
                //         "data": {
                //             "accepted_orders": "7281",
                //             "rejected_orders": "1537",
                //             "doing_orders": "0",
                //             "inOrder_orders": "0",
                //             "total_accepted_amount": "1344222500"
                //         }
                //     },
                //     {
                //         "name": "رضا میری 2",
                //         "data": {
                //             "accepted_orders": "1290",
                //             "rejected_orders": "123",
                //             "doing_orders": "0",
                //             "inOrder_orders": "0",
                //             "total_accepted_amount": "92662500"
                //         }
                //     }
                // ];
                
                // const series = response.slice(0, 6).map(item => ({
                //     name: item.name,
                //     data: [
                //         parseInt(item.data.accepted_orders)/10,
                //         parseInt(item.data.rejected_orders)/10,
                //         parseInt(item.data.doing_orders)/10,
                //         parseInt(item.data.inOrder_orders)/10,
                //         parseInt(item.data.total_accepted_amount)/10
                //     ]
                // }));
                const series = response.slice(0, 6).map(item => ({
                    name: item.name,
                    data: [
                        parseInt(item.data.accepted_orders) / 10,
                        parseInt(item.data.rejected_orders) / 10,
                        parseInt(item.data.doing_orders) / 10,
                        parseInt(item.data.inOrder_orders) / 10,
                        parseInt(item.data.total_accepted_amount) / 10
                    ]
                }));
                
                
                console.log(series);
                setChartData(series);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching chart data:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!loading && chartData) {
            const series = chartData.map(item => ({
                name: item.name,
                data: [
                    parseInt(item.data.accepted_orders),
                    parseInt(item.data.rejected_orders),
                    parseInt(item.data.doing_orders),
                    parseInt(item.data.inOrder_orders),
                    parseInt(item.data.total_accepted_amount)
                ]
            }));
            
            console.log(series);
            
            const options = {
                series: series,
                chart: {
                    type: 'bar',
                    height: 350,
                    stacked: true,
                    stackType: '100%'
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                    },
                },
                stroke: {
                    width: 1,
                    colors: ['#fff']
                },
                title: {
                    text: '100% Stacked Bar'
                },
                xaxis: {
                    categories: ['Accepted Orders', 'Rejected Orders', 'Doing Orders', 'In Order Orders', 'Total Accepted Amount']
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val + "K"
                        }
                    }
                },
                fill: {
                    opacity: 1
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'left',
                    offsetX: 40
                }
            };
    
            const chart = new ApexCharts(document.querySelector("#chart1"), options);
            chart.render();
        }
    }, [loading, chartData]);
    
     
    return (
        <div id="chart1">
            {loading && <p>Loading...</p>}
        </div>
    );
}

export default CustomersOrdersStatisticsApi;












