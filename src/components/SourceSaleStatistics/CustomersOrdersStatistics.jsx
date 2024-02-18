import '../../App.css';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import cutstomersorderstatistics from '../../services/CustomersOrdersStatisticsApi';

function CustomersOrdersStatistics() {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cutstomersorderstatistics.getData()
            .then(response => {
                setChartData(response.data); 
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    const options = {
        chart: {
            type: 'bar',
            height: chartData.length * 50 + 100
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '80%'
            }
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '12px',
                colors: ['#000']
            }
        },
        xaxis: {
            categories: chartData.map(item => item.data.name),
            labels: {
                style: {
                    padding: 10
                }
            }
        },
        yaxis: {
            title: {
                text: 'Customers',
                style: {
                    fontSize: '14px'
                }
            }
        },
        colors: ['#77B6EA', '#545454', '#FEB019'],
        legend: {
            position: 'top'
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    height: chartData.length * 100 + 100
                }
            }
        }]
    };

    const series = [{
        name: 'Accepted Orders',
        data: chartData.map(item => parseInt(item.data.accepted_orders))
    }, {
        name: 'Rejected Orders',
        data: chartData.map(item => parseInt(item.data.rejected_orders))
    }, {
        name: 'Doing Orders',
        data: chartData.map(item => parseInt(item.data.doing_orders))
    }];

    return (
        <div style={{ height: '300px' }}>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="bar" height={chartData.length * 50 + 100} />
            </div>
        </div>
    );
}

export default CustomersOrdersStatistics;
