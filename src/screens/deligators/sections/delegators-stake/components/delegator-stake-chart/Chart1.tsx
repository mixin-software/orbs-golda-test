import React from 'react'
import { Line } from 'react-chartjs-2';
import { ChartData } from '../../../../../../global/types';
import { generateDatasets, getLineChartBaseSettings } from '../../../../../../utils/chart';

interface StateProps {
    chartData: ChartData;
}

export const Chart = ({ chartData }: StateProps) => {
    const data = {
        datasets: generateDatasets(chartData)
    };
    const options = getLineChartBaseSettings(chartData.unit);
    return <Line data={data} options={options} />;
};