import React from 'react';
import { Bar } from 'react-chartjs-2';
import { getGuardianColor } from '../../utils/overview';
import { Guardian } from '@orbs-network/pos-analytics-lib';
import { formatNumber } from '../../utils/number';

interface StateProps {
    chartData: any;
}

export const BarChartComponent = ({ chartData }: StateProps) => {
    const createDataset = (backgroundColor: string, label: string) => {
        return {
            backgroundColor,
            label,
            data: [],
            maxBarThickness: 30
        };
    };

    const addToDataset = (data: any, datasets: any, colors: any, date: any, index: number) => {
        data.forEach((guardian: Guardian, i: number) => {
            const { address, effectiveStake } = guardian;
            if (!datasets[address]) {
                datasets[address] = createDataset(colors[i], `${index + i}`);
            }
            const obj = {
                x: date,
                y: effectiveStake
            };
            datasets[address].data.push(obj);
        });
        return datasets;
    };

    const generateDataset = (arr: any) => {
        if (!arr) return;
        const colors = getGuardianColor(21);
        let datasets: any = {};
        arr.data.forEach((elem: any, index: number) => {
            const { data, date } = elem;
            datasets = addToDataset(data, datasets, colors, date, index);
        });
        const result = Object.keys(datasets).map((key) => datasets[key]);
        return result;
    };

    var barChartData = {
        datasets: generateDataset(chartData)
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
      
        interaction: {
            mode: 'index'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
            enabled: false
        },
        scales: {
            xAxes: [
                {
                    offset: true,
                    type: 'time',
                    time: {
                        unit:chartData.unit,
                        format: 'DD/MM/YYYY'
                    },
                    stacked: true,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        padding: 10,
                        fontSize: 12,
                        fontFamily: 'Montserrat',
                        fontColor: '#666666'
                    }
                }
            ],
            yAxes: [
                
                {
                    gridLines: {
                        display: true,
                        color: 'rgba(255,99,132,0.2)',
                        borderDash: [5],
                        zeroLineBorderDash: [5],
                        zeroLineColor: 'rgba(255,99,132,0.2)',
                        drawBorder: false
                    },
                    stacked: true,
                    ticks: {
                        maxTicksLimit: 7,
                        fontSize: 12,
                        fontFamily: 'Montserrat',
                        fontColor: '#666666',
                        callback: function (value: number) {
                            return formatNumber(value, '0.0a').toUpperCase();
                        },
                        padding: 15
                    }
                }
            ]
        }
    };

    return <Bar data={barChartData} options={options} />;
};
