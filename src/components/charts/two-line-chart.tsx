import React from 'react';
import { Line } from 'react-chartjs-2';
import { formatNumber } from '../../utils/number';


interface StatePorps {
    graphData: any;
    title?: string
}




export const TwoLineChart = ({ graphData, title }: StatePorps) => {
    const labels = graphData && graphData.map((m: any) => m.month.toUpperCase());
    const numbers = graphData && graphData.map((m: any) => m.data) || [];
    console.log(numbers)
    const data = {
        labels: labels,
        datasets: [
            {
                label: '',
                fill: false,
                lineTension: 0,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: '#74DABF',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#74DABF',
                pointBackgroundColor: '#74DABF',
                pointBorderWidth: 6,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: numbers.map((m: any) => m.delegators || 0)
            },
            {
                label: '',
                fill: false,
                lineTension: 0,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: '#CF4E81',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#CF4E81',
                pointBackgroundColor: '#CF4E81',
                pointBorderWidth: 6,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: numbers.map((m: any) => m.ownDelegation || 0)
            },
            {
                label: '',
                fill: false,
                lineTension: 0,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: '#FFEC29',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#FFEC29',
                pointBackgroundColor: '#FFEC29',
                pointBorderWidth: 6,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: numbers.map((m: any) => m.totalDelegation || 0)
            },
        ]
    };
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        elements: {
            line: {
                tension: 0
            }
        },
        legend: {
            display: false
        },
        title: {
            display: false
        },
        animation: {
            duration: 0
        },
       
        tooltips: {
            xPadding: 10,
            yPadding: 10,
            titleFontFamily:'Montserrat',
            bodyFontFamily:'Montserrat',
            displayColors: false,
            cornerRadius:2,
            callbacks: {
                label: function(tooltipItem: any, data: any) {
                    var label = data.datasets[tooltipItem.datasetIndex].label || '';
                    label += Math.round(tooltipItem.yLabel * 100) / 100;
                    return formatNumber(label, '0a').toUpperCase();
                },
                labelColor: function() {
                    return {
                        borderColor: 'transparent',
                        backgroundColor: 'transparent',
                    };
                },
            }
        },
        scales: {
            yAxes: [
                {
                    stacked: true,
                    gridLines: {
                        display: true,
                        color: 'rgba(255,99,132,0.2)',
                        borderDash:[5],
                        zeroLineBorderDash:[5],
                        zeroLineColor: 'rgba(255,99,132,0.2)',
                        drawBorder: false,
                    },
                    ticks:{
                        maxTicksLimit: 7,
                        fontSize: 12,
                        fontFamily:'Montserrat',
                        fontColor:'#666666',
                        callback: function(value: number) {
                            return formatNumber(value, '0a').toUpperCase()
                        },
                        padding:15
                    },
                   
                }
            ],
            xAxes: [
                
                {
                    type: 'category',
                    gridLines: {
                        display: false,
                        drawBorder: false,
                    },
                  
                    ticks:{
                     
                        padding:10,
                        fontSize: 12,
                        fontFamily:'Montserrat',
                        fontColor:'#666666'
                    }
                }
               
            ]
        }
    };

    return graphData ?  <>
    {title && <h3>{title}</h3>}
    <Line data={data}  options={options} />
    </> : null;
};
