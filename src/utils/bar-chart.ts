import { TFunction } from 'i18next';
import { ChartUnit } from '../global/enums';
import { formatNumber } from './number';

export const barChartCustomTooltip = function (tooltip: any, ref: any, t: TFunction, total?: number) {
    // Tooltip Element
    if (!ref || !ref.current) return;
    let tooltipEl = document.getElementById('chartjs-tooltip');

    const chart: any = ref.current.chartInstance;

    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'chartjs-tooltip';
        tooltipEl.innerHTML = '<table></table>';
        if (!chart) return;
        chart?.tooltip._chart.canvas.parentNode?.appendChild(tooltipEl);
    }
    // Hide if no tooltip
    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0 as any;
        return;
    }
    // Set caret Position
    tooltipEl.classList.remove('above', 'below', 'no-transform');
    if (tooltip.yAlign) {
        tooltipEl.classList.add(tooltip.yAlign);
    } else {
        tooltipEl.classList.add('no-transform');
    }
    function getBody(bodyItem: any) {
        return bodyItem.lines;
    }
    // Set Text
    if (tooltip.body) {
        const titleLines = tooltip.title || [];
        const bodyLines = tooltip.body.map(getBody);
        let innerHtml = '<thead>';
        titleLines.forEach(function (title: any) {
            const titleP = `<p class='bar-chart-tootlip-title'>${title}</p>`;
            innerHtml += '<tr><th>' + titleP + '</th></tr>';
        });
        innerHtml += '</thead><tbody>';
        bodyLines.forEach(function (body: any, i: any) {
            let guardian = `<p>${body[0].split(':')[0]}</p>`;
            let number = body[0].split(':')[1];
            number = Number(number).toLocaleString();
            let stake = `<p>${number}</p>`;
            const totalP = `<p class ='bar-chart-tootlip-total'>${t('overview.total')}: ${
                total ? total.toLocaleString() : 0
            }</p>`;
            const div = `<div class='bar-chart-tootlip-data'>${guardian}${stake}</div>`;
            const span = '<span class="chartjs-tooltip-key"></span>';
            innerHtml += '<tr><td>' + span + totalP + div + '</td></tr>';
        });
        innerHtml += '</tbody>';
        const tableRoot = tooltipEl.querySelector('table');
        tableRoot!.innerHTML = innerHtml;
    }
    const positionY = chart?.tooltip._chart.canvas.offsetTop;
    const positionX = chart?.tooltip._chart.canvas.offsetLeft;
    // Display, position, and set styles for font

    tooltipEl.classList.add('bar-chart-tootlip');
    tooltipEl.style.opacity = 1 as any;
    tooltipEl.style.left = positionX + tooltip.caretX + 20 + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
    tooltipEl.style.fontSize = tooltip.bodyFontSize + 'px';
    tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
    tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
};

export const getBarChartConfigOptions = (
    goToGuardianPage: (e: any) => void,
    ref: any,
    t: TFunction,
    unit?: ChartUnit,
    total?: number
) => {
    return {
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
        hover: { mode: null },
        interaction: {
            mode: 'index'
        },
        onClick: (e: any) => goToGuardianPage(e),

        tooltips: {
            enabled: false,
            animation: 0,
            custom: (event: any) => barChartCustomTooltip(event, ref, t, total)
        },

        scales: {
            xAxes: [
                {
                    distribution: 'series',
                    offset: true,
                    type: 'time',
                    time: {
                        unit,
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
                        // max: 110,
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
