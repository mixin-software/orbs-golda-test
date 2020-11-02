import { TFunction } from 'i18next';
import { ChartUnit, ChartYaxis } from '../global/enums';
import { ChartData, ChartDataset } from '../global/types';
import { convertToString, formatNumber } from './number';

export const getGuardiansLineChartSettings = (unit: ChartUnit, t: TFunction) => {
    const settings = getLineChartBaseSettings(unit);
    settings.layout.padding.left = 20;
    settings.layout.padding.right = 20;
    const yAxis: any = {
        id: ChartYaxis.Y2,
        position: 'right',
        display: true,
        gridLines: {
            display: true,
            color: 'rgba(255,99,132,0.2)',
            borderDash: [5],
            zeroLineBorderDash: [5],
            zeroLineColor: 'rgba(255,99,132,0.2)',
            drawBorder: false
        },
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
    };
    settings.scales.yAxes.push(yAxis);
    return settings;
};

export const getLineChartBaseSettings = (unit: ChartUnit) => {
    return {
        maintainAspectRatio: false,
        responsive: true,
        margin: 0,
        type: 'line',
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
        layout: {
            padding: {
                right: 10,
                bottom: 3,
                left: 0
            }
        },
        animation: {
            duration: 0
        },
        interaction: {
            mode: 'index'
        },
        tooltips: {
            xPadding: 10,
            yPadding: 10,
            titleFontFamily: 'Montserrat',
            bodyFontFamily: 'Montserrat',
            displayColors: false,
            cornerRadius: 2,
            callbacks: {
                label: function (tooltipItem: any, data: any) {
                    var label = data.datasets[tooltipItem.datasetIndex].label;
                    label += Math.round(tooltipItem.yLabel * 100) / 100;
                    return convertToString(Math.round(tooltipItem.yLabel * 100) / 100);
                },
                labelColor: function () {
                    return {
                        borderColor: 'transparent',
                        backgroundColor: 'transparent'
                    };
                }
            }
        },
        scales: {
            xAxes: [
                {
                    distribution: 'linear',
                    type: 'time',
                    time: {
                        format: 'DD/MM/',
                        unit
                    },
                    scaleLabel: {
                        display: false
                    },
                    gridLines: {
                        tickMarkLength: 10,
                        display: false,
                        drawBorder: false,
                        zeroLineColor: 'rgba(255,99,132,0.2)'
                    },
                    ticks: {
                        autoskip: true,
                        padding: 5,
                        fontSize: 12,
                        fontFamily: 'Montserrat',
                        fontColor: '#666666'
                    }
                }
            ],
            yAxes: [
                {
                    id: ChartYaxis.Y1,
                    scaleLabel: {
                        display: false,
                        labelString: '',
                        fontSize: 12,
                        fontFamily: 'Montserrat',
                        fontColor: '#666666'
                    },
                    position: 'left',
                    gridLines: {
                        display: true,
                        color: 'rgba(255,99,132,0.2)',
                        borderDash: [5],
                        zeroLineBorderDash: [5],
                        zeroLineColor: 'rgba(255,99,132,0.2)',
                        drawBorder: false
                    },

                    ticks: {
                        autoskip: true,
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
};

export const getLineChartBaseStyles = () => {
    return {
        label: '0',
        fill: false,
        lineTension: 0,
        backgroundColor: '',
        borderColor: '',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '',
        pointBackgroundColor: '',
        pointBorderWidth: 7,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '',
        pointHoverBorderColor: '',
        pointHoverBorderWidth: 1,
        pointRadius: 2,
        pointHitRadius: 10,
        yAxisID: ChartYaxis.Y1
    };
};

export const generateDatasets = (chartData: ChartData) => {
    const styles = getLineChartBaseStyles();
    return chartData.datasets.map((dataset: ChartDataset, index: number) => {
        const { color, yAxis, data } = dataset;
        const style = styles;
        style.label = `${index}`;
        style.borderColor = color;
        style.pointBorderColor = color;
        style.pointBackgroundColor = color;
        style.pointHoverBackgroundColor = color;
        style.pointHoverBorderColor = color;
        style.yAxisID = yAxis;
        return {
            data,
            ...style
        };
    });
};
