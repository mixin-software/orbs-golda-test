import React from 'react'
import { Line } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { ChartData } from '../../../../../../global/types';
import { generateDatasets, getGuardiansLineChartSettings } from '../../../../../../utils/chart';


interface StateProps {
    chartData: ChartData;
}
 
export const Chart = ({ chartData }: StateProps) => {
    const {t} = useTranslation()
    const data = {
        datasets: generateDatasets(chartData)
    };
    const options = getGuardiansLineChartSettings(chartData.unit, t);
    return (options ? <div className='line-chart'> <Line data={data} options={options} /></div> : null);
};
