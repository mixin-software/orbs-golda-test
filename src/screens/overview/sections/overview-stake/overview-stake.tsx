import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { BarChartComponent } from '../../../../components/bar-chart/bar-chart';
import { ChartUnit } from '../../../../global/enums';
import { STACK_GRAPH_MONTHS_LIMIT } from '../../../../global/variables';
import { AppState } from '../../../../redux/types/types';
import { generateMonths } from '../../../../utils/dates';
import { getGuardianColor, getOverviewChartData } from '../../../../utils/overview';
import CopyImg from '../../../../assets/images/copy.svg';

import './overview-stake.scss';
import { Link } from 'react-router-dom';
import { routes } from '../../../../routes/routes';
import { OverviewStakeChart } from './components/overview-stake-chart/overview-stake-chart';
export const OverviewStake = () => {
    const { overviewData } = useSelector((state: AppState) => state.overview);
    const { t } = useTranslation();
    return (
        <div className="overview-stake flex-between">
            <OverviewStakeChart />
            <div className="overview-stake-guardians">
                <header className="flex-start">Guardian list</header>
                <ul className="overview-stake-guardians-list">
                    {overviewData &&
                        overviewData.slices &&
                        overviewData.slices[0].data.map((guardian: any, index: number) => {
                            const colors = getGuardianColor(overviewData.slices[0].data.length);
                            const background = colors[index];
                            return (
                                <li key={index}>
                                    <Link
                                        to={routes.guardians.stake.replace(':address', guardian.address)}
                                        className="flex-start-center">
                                        <figure
                                            style={{
                                                background
                                            }}></figure>
                                        <p className="text-overflow">{guardian.name}</p>
                                        <img src={CopyImg} alt="" />
                                    </Link>
                                </li>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
};
