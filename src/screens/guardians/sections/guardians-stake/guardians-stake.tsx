import React from 'react';
import { GuardianStakeChart } from './components/guardian-stake-chart/guardian-stake-chart';
import { GuardianStakeLegend } from './components/guardian-stake-legend/guardian-stake-legend';
import './guardians-stake.scss';

export const GuardiansStake = () => {

    return (
        <div className="guardian-stake flex-start">
            <GuardianStakeChart />
            <GuardianStakeLegend />
        </div>
    );
};
