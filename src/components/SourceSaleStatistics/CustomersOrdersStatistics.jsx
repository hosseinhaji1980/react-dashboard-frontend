
// import React, { useState, useEffect } from 'react';
// // import ReactApexChart from 'apexcharts';
// import cutstomersorderstatistics from '../../services/CustomersOrdersStatisticsApi';
// import ReactDOM from 'react-dom';
// import ReactApexChart from 'react-apexcharts';

// function CustomersOrdersStatistics() {
//     const [chartData, setChartData] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         cutstomersorderstatistics.getData()
//             .then(response => {
//                 console.log(response);
//                 setChartData(response); // Set the received data
//                 setLoading(false); // Set loading to false after receiving the data
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//                 setLoading(false);
//             });
//     }, []);

//   const [series] = useState([
//     {
//       name: 'سفارشات تایید شده',
//       data: [44, 55, 41, 37, 22, 43, 21]
//     },
//     {
//       name: 'سفارشات رد شده',
//       data: [53, 32, 33, 52, 13, 43, 32]
//     },
//     {
//       name: 'سفارشات در حال انجام',
//       data: [12, 17, 11, 9, 15, 11, 20]
//     },
//     {
//       name: 'سفارشات در انتظار تایید',
//       data: [9, 7, 5, 8, 6, 9, 4]
//     },
//     // {
//     //   name: 'Reborn Kid',
//     //   data: [25, 12, 19, 32, 25, 24, 10]
//     // }
//   ]);

//   const [options] = useState({
//     chart: {
//       type: 'bar',
//       height: 350,
//       stacked: true,
//       stackType: '100%'
//     },
//     plotOptions: {
//       bar: {
//         horizontal: true
//       }
//     },
//     stroke: {
//       width: 1,
//       colors: ['#fff']
//     },
//     title: {
//       text: '100% Stacked Bar'
//     },
//     xaxis: {
//     //   categories: ['mogo','pgemshop','ahmed','alireza','hossein','hamed','jafar']
//       categories:this.response.map(el=>el.name);
//     },
//     tooltip: {
//       y: {
//         formatter: function (val) {
//           return val + 'K';
//         }
//       }
//     },
//     fill: {
//       opacity: 1
//     },
//     legend: {
//       position: 'top',
//       horizontalAlign: 'left',
//       offsetX: 40
//     }
//   });

//   return (
//     <div>
//       <div id="chart">
//         <ReactApexChart options={options} series={series} type="bar" height={350} />
//       </div>
//       <div id="html-dist"></div>
//     </div>
//   );
// }

// // const domContainer = document.querySelector('#app');
// // ReactDOM.render(<CustomersOrdersStatistics />, domContainer);
// export default CustomersOrdersStatistics; // این خط را اضافه کنید


import React, { useState, useEffect } from 'react';
import cutstomersorderstatistics from '../../services/CustomersOrdersStatisticsApi';
import ReactDOM from 'react-dom';
import ReactApexChart from 'react-apexcharts';

function CustomersOrdersStatistics() {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cutstomersorderstatistics.getData()
            .then(response => {
                console.log(response.data);
                setChartData(response); 
                
                setLoading(false); // Set loading to false after receiving the data
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    // Check if chartData is null or undefined before using it
    const categories = chartData ? chartData.map(el => el.name) : [];
    console.log(`category ${categories}`);

    const [options] = useState({
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            stackType: '100%'
        },
        plotOptions: {
            bar: {
                horizontal: true
            }
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        title: {
            text: '100% Stacked Bar'
        },
        xaxis: {
            categories: categories // Use categories variable here
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + 'K';
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
    });

    return (
        <div>
            <div id="chart">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ReactApexChart options={options} series={chartData} type="bar" height={350} />
                )}
            </div>
            <div id="html-dist"></div>
        </div>
    );
}

export default CustomersOrdersStatistics;
