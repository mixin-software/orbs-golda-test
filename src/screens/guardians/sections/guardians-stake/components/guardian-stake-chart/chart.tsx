import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { ChartColors } from '../../../../../../global/enums';
import { ChartData } from '../../../../../../global/types';
import { generateDatasets, getGuardiansLineChartSettings } from '../../../../../../utils/chart';

interface StateProps {
    chartData: ChartData;
}

export const Chart = ({ chartData }: StateProps) => {
    const { t } = useTranslation();
    const data = {
        datasets: generateDatasets(chartData)
    };

    const options = getGuardiansLineChartSettings(chartData.unit, t);
    return options ? (
        <div className="line-chart">
            <div className="line-chart-text line-chart-text-left">
                <p className="one-line" style={{ color: ChartColors.GREEN }}>
                    {t('guardians.delegators')}
                </p>
            </div>
            <Line data={data} options={options} />
            <div className="line-chart-text line-chart-text-right flex-center">
                <p className="one-line" style={{ color: ChartColors.YELLOW }}>
                    {`${t('guardians.totalDelegation')}`}
                </p>
                <small>{`&`}</small>
                <p className="one-line" style={{ color: ChartColors.GRAY }}>{`${t('guardians.ownDelegation')}`}</p>
            </div>
        </div>
    ) : null;
};
