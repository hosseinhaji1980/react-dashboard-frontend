import React from 'react';
import ReactApexChart from 'react-apexcharts';

class SparkChart extends React.Component {
  constructor(props) {
    super(props);

    const sparklineData = [10, 20, 30, 40, 30, 20, 50, 10, 60, 30, 25, 40];

    this.state = {
      series: [{
        data: this.randomizeArray(sparklineData)
      }],
      options: {
        chart: {
          type: 'area',
          height: 160,
          sparkline: {
            enabled: true
          },
        },
        stroke: {
          curve: 'straight'
        },
        fill: {
          opacity: 0.3,
        },
        yaxis: {
          min: 0
        },
        colors: ['#DCE6EC'],
        title: {
          text: '$424,652',
          offsetX: 0,
          style: {
            fontSize: '24px',
          }
        },
        subtitle: {
          text: 'Sales',
          offsetX: 0,
          style: {
            fontSize: '14px',
          }
        }
      },
    };
  }

  randomizeArray(data) {
    const newData = [...data];
    for (let i = newData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newData[i], newData[j]] = [newData[j], newData[i]];
    }
    return newData;
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <div id="chart-spark1">
              <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={160} />
            </div>
          </div>
          {/* Add other chart components here */}
        </div>
      </div>
    );
  }
}

export default SparkChart;
