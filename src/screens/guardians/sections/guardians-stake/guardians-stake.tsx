import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChartColors } from '../../../../global/enums';
import { GuardianStakeChart } from './components/guardian-stake-chart/guardian-stake-chart';

import './guardians-stake.scss';
interface Legend {
    name: string;
    background: ChartColors;
}

export const GuardiansStake = () => {
    const { t } = useTranslation();

    const legends = [
        {
            name: t('guardians.totalDelegation'),
            background: ChartColors.YELLOW
        },
        {
            name: t('guardians.ownDelegation'),
            background: ChartColors.GRAY
        },
        {
            name: `# ${t('guardians.delegators')}`,
            background: ChartColors.GREEN
        }
    ];

    return (
        <div className="guardian-stake flex-start">
            <GuardianStakeChart />
            <section className="guardian-stake-legend">
                <h4 className='capitalize'>{t('guardians.legend')}</h4>
                {legends.map((legend: Legend) => {
                    const { name, background } = legend;
                    return (
                        <div key = {name} className='flex-start-center'>
                            <figure
                                style={{
                                    background
                                }}></figure>
                            <p className='capitalize'>{name}</p>
                        </div>
                    );
                })}
            </section>
        </div>
    );
};
