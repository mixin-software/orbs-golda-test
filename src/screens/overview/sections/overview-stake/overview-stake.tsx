import React from 'react';

import './overview-stake.scss';
import { OverviewStakeChart } from './components/overview-stake-chart/overview-stake-chart';
import { OverviewStakeGuadians } from './components/overview-stake-guardians/overview-stake-guardians';
export const OverviewStake = () => {
    return (
        <div className="overview-stake flex-between">
            <OverviewStakeChart />
           <OverviewStakeGuadians />
        </div>
    );
};
