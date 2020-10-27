import { GuardianInfo } from '@orbs-network/pos-analytics-lib';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { TimeRangeSelector } from '../../../../../../components/date-format-picker/time-range-selector';
import { LineChart } from '../../../../../../components/line-chart/line-chart';
import { LoadingComponent } from '../../../../../../components/loading-component/loading-component';
import { NoData } from '../../../../../../components/no-data/no-data';
import { ChartUnit, ChartYaxis, LoaderType } from '../../../../../../global/enums';
import { STACK_GRAPH_MONTHS_LIMIT } from '../../../../../../global/variables';
import { setGuardianChartData } from '../../../../../../redux/actions/actions';
import { AppState } from '../../../../../../redux/types/types';
import { generateDays, generateMonths, generateWeeks } from '../../../../../../utils/dates';
import { getGuardianChartData } from '../../../../../../utils/guardians';

import './guardian-stake-chart.scss';

const generateChartData = (type: ChartUnit, selectedGuardian?: GuardianInfo) => {
    if (!selectedGuardian) return;
    let data;
    switch (type) {
        case ChartUnit.MONTH:
            const months = generateMonths(STACK_GRAPH_MONTHS_LIMIT);
            data = getGuardianChartData(months, ChartUnit.MONTH, selectedGuardian);
            break;
        case ChartUnit.WEEK:
            const weeks = generateWeeks(STACK_GRAPH_MONTHS_LIMIT);
            data = getGuardianChartData(weeks, ChartUnit.WEEK, selectedGuardian);
            break;
        case ChartUnit.DAY:
            const days = generateDays(STACK_GRAPH_MONTHS_LIMIT);
            data = getGuardianChartData(days, ChartUnit.DAY, selectedGuardian);
            break;
        default:
            break;
    }
    return data;
};

export const GuardianStakeChart = () => {
    const dispatch = useDispatch()
    const [chartData, setChartData] = useState<any>(undefined);
    const { selectedGuardian, guardianIsLoading } = useSelector((state: AppState) => state.guardians);
    const { t } = useTranslation();
    useEffect(() => {
        selectChartData(ChartUnit.MONTH);
    }, [selectedGuardian && selectedGuardian.address]);

    const selectChartData = (unit: ChartUnit) => {
        const data = generateChartData(unit, selectedGuardian);
        setChartData(data)
    };
    return (
        <div className="guardian-stake-chart">
            <LoadingComponent loaderType={LoaderType.BIG} isLoading={guardianIsLoading}>
                {chartData ? (
                    <>
                        <header className="flex-between">
                            <h4>{t('delegators.stakeChangeOverTime')}</h4>
                            <TimeRangeSelector selected={chartData.unit} selectCallBack={selectChartData} />
                        </header>
                        <LineChart chartData={chartData} yCharts={[ChartYaxis.Y1, ChartYaxis.Y2]} />
                    </>
                ) : (
                    <NoData />
                )}
            </LoadingComponent>
        </div>
    );
};
