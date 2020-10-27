import { Delegator } from '@orbs-network/pos-analytics-lib';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { TimeRangeSelector } from '../../../../../../components/date-format-picker/time-range-selector';
import { LineChart } from '../../../../../../components/line-chart/line-chart';
import { LoadingComponent } from '../../../../../../components/loading-component/loading-component';
import { NoData } from '../../../../../../components/no-data/no-data';
import { ChartUnit, ChartYaxis, LoaderType } from '../../../../../../global/enums';
import { ChartData } from '../../../../../../global/types';
import { STACK_GRAPH_MONTHS_LIMIT } from '../../../../../../global/variables';
import { setDelegatorChartData, setGuardianChartData } from '../../../../../../redux/actions/actions';
import { AppState } from '../../../../../../redux/types/types';
import { generateDays, generateMonths, generateWeeks } from '../../../../../../utils/dates';
import { getDelegatorChartData } from '../../../../../../utils/delegators';

import './delegator-stake-chart.scss';


const generateChartData = (type: ChartUnit, selectedDelegator?: Delegator): ChartData | undefined => {
    if (!selectedDelegator) return;
    let data;
    switch (type) {
        case ChartUnit.MONTH:
            const months = generateMonths(STACK_GRAPH_MONTHS_LIMIT)
            data = getDelegatorChartData(months, ChartUnit.MONTH, selectedDelegator);
            break;
        case ChartUnit.WEEK:
            const weeks = generateWeeks(STACK_GRAPH_MONTHS_LIMIT)
            data = getDelegatorChartData(weeks, ChartUnit.WEEK, selectedDelegator);
            break;
        case ChartUnit.DAY:
            const days = generateDays(20)
            data = getDelegatorChartData(days, ChartUnit.DAY, selectedDelegator);
            break;
        default:
            break;
    }
   return data
};


export const DelegatorStakeChart = () => {
    const dispatch = useDispatch()
    const { selectedDelegator, delegatorIsLoading, delegatorChartData } = useSelector((state: AppState) => state.delegator);
    const { t } = useTranslation();
    useEffect(() => {
        if(delegatorChartData) return
        selectChartData(ChartUnit.MONTH);
    }, [selectedDelegator && selectedDelegator.address]);


    const selectChartData = (unit: ChartUnit) => {
        const data = generateChartData(unit, selectedDelegator)
        dispatch(setDelegatorChartData(data))
    }
    return (
        <div className="delegator-stake-chart">
            <LoadingComponent loaderType={LoaderType.BIG} isLoading={delegatorIsLoading}>
                {delegatorChartData ? (
                    <>
                        <header className="flex-between">
                            <h4>{t('delegators.stakeChangeOverTime')}</h4>
                            <TimeRangeSelector selected={delegatorChartData.unit} selectCallBack={selectChartData} />
                        </header>
                        <LineChart chartData={delegatorChartData} yCharts = {[ChartYaxis.Y1]}/>
                    </>
                ) : (
                    <NoData />
                )}
            </LoadingComponent>
        </div>
    );
};
