import React from 'react'
import { useSelector } from 'react-redux';
import { TwoLineChart } from '../../../../components/charts/two-line-chart'
import { AppState } from '../../../../redux/types/types';
import { sortGuardianStakeDataMonths } from '../../../../utils/guardians';

export const GuardiansStake = () => {
    const {selectedGuardian } = useSelector((state: AppState) => state.guardians);
    console.log(selectedGuardian, )
    const graphData = sortGuardianStakeDataMonths(selectedGuardian)
    return (
        <div className='guardians-stake'>
            <TwoLineChart graphData = {graphData} />
        </div>
    )
}

