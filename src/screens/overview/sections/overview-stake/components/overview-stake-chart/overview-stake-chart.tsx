import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { BarChartComponent } from '../../../../../../components/bar-chart/bar-chart';
import { TimeRangeSelector } from '../../../../../../components/date-format-picker/time-range-selector';
import { LoadingComponent } from '../../../../../../components/loading-component/loading-component';
import { ChartUnit, LoaderType } from '../../../../../../global/enums';
import { setOverviewChartData } from '../../../../../../redux/actions/actions';
import { AppState } from '../../../../../../redux/types/types';
import { generateOverviewChartData } from '../../../../../../utils/overview';
import './overview-stake-chart.scss';

export const OverviewStakeChart = () => {
    const dispatch = useDispatch();
    const { overviewData, overviewChartData, overviewDataLoding } = useSelector((state: AppState) => state.overview);
    const { guardians } = useSelector((state: AppState) => state.guardians);
    const { t } = useTranslation();

    useEffect(() => {
        if (overviewChartData) return;
        selectChartData(ChartUnit.WEEK);
    }, [overviewData]);

    const selectChartData = (unit: ChartUnit) => {
        const data = generateOverviewChartData(unit, overviewData);
        dispatch(setOverviewChartData(data));
    };
    return (
        <div className="overview-stake-chart">
            <LoadingComponent isLoading={overviewDataLoding} loaderType={LoaderType.BIG}>
                {overviewChartData && (
                    <header className="flex-between">
                        <h4 className="capitalize">{t('overview.graphText')}</h4>
                        <TimeRangeSelector
                            selected={overviewChartData.unit}
                            selectCallBack={selectChartData}
                            unitsToHide={[ChartUnit.MONTH]}
                        />
                    </header>
                )}
                {overviewChartData && (
                    <div className="bar-chart">
                        <BarChartComponent chartData={overviewChartData} guardians = {guardians} total = {overviewData?.total_stake}/>
                    </div>
                )}
            </LoadingComponent>
        </div>
    );
};
