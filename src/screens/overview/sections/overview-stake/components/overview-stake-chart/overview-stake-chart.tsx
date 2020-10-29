import React from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { BarChartComponent } from '../../../../../../components/bar-chart/bar-chart';
import { ChartUnit } from '../../../../../../global/enums';
import { STACK_GRAPH_MONTHS_LIMIT } from '../../../../../../global/variables';
import { AppState } from '../../../../../../redux/types/types';
import { generateMonths } from '../../../../../../utils/dates';
import { getOverviewChartData } from '../../../../../../utils/overview';

import './overview-stake-chart.scss';
export const OverviewStakeChart = () =>  {
    const { overviewData } = useSelector((state: AppState) => state.overview);
    const { t } = useTranslation();
    const months = generateMonths(STACK_GRAPH_MONTHS_LIMIT);
    const data = getOverviewChartData(months, ChartUnit.MONTH, overviewData);
    return (
        <div className="overview-stake-chart">
        <BarChartComponent chartData={data} />
    </div>
    )
}

