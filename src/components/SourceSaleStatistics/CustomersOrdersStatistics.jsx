import '../../App.css';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import cutstomersorderstatistics from '../../services/CustomersOrdersStatisticsApi';
import { Margin } from '@mui/icons-material';

function CustomersOrdersStatistics() {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cutstomersorderstatistics.getData()
            .then(response => {
                console.log(response);
                setChartData(response);
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
            fontFamily:'shabnam',
            fontSize:'10px',
            // type: 'bar',
            stacked: true,
            // stackType: "100%",
            height: chartData.length * 50 + 100
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '90%',
                position: 'top'


            }
        },
        dataLabels: {
            enabled: true,
            offsetX: 10,
            
            style: {
                fontSize: '12px',
                colors: ['#000'],
                

            },
            

        },
        legend: {
            onItemClick: {
              toggleDataSeries: true
            },
            onItemHover: {
                highlightDataSeries: true
              },
          },
        xaxis: {
            categories: chartData.map(item => item.data.name),
            labels: {
                style: {
                        fontSize: '12px'
                }
            }
        },
        yaxis: {
            labels: {
                offsetX: -100,
                style: {
                    fontSize: '12px'
            }

                
              },
              
        },
        grid: {
            padding: {
              left: 0,
              right: 0
            }
          },
        colors: ['#198754', '#ffc107', '#6c757d','#dc3545'],
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
        name: 'سفارشات تایید شده',
        data: chartData.map(item => parseInt(item.data.accepted_orders))
    }, 
    {
        name: 'سفارشات در حال انجام',
        data: chartData.map(item => parseInt(item.data.doing_orders))
    
    }, 
    
    {
        name: 'سفارشات در انتظار تایید',
        data: chartData.map(item => parseInt(item.data.inOrder_orders))
    },
    {
        name: 'سفارشات رد شده',
        data: chartData.map(item => parseInt(item.data.rejected_orders))
    }
];

    return (
        <div style={{ height: '300px' }}>
            <div className="card-body">
            <div id="chart" className='col-12 mx-2 p-1'>
                <ReactApexChart options={options} series={series} type="bar" height={chartData.length * 50 + 100} />
            </div>
            </div>
            
        </div>
    );
}

export default CustomersOrdersStatistics;
