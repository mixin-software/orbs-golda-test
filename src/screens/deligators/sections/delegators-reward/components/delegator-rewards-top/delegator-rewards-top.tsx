import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../redux/types/types';
import Logo from '../../../../../../assets/images/token.png';

import './delegator-rewards-top.scss';
import { Reward } from '../../../../../../components/reward/reward';
import { LoadingComponent } from '../../../../../../components/loading-component/loading-component';
import { LoaderType } from '../../../../../../global/enums';
import { NoData } from '../../../../../../components/no-data/no-data';
import TrophyImg from '../../../../../../assets/images/trophy.svg';
import { RewardTitles } from '../../../../../../components/reward-titles/reward-titles';

export const DelegatorRewardsTop = () => {
    const { selectedDelegator, delegatorIsLoading } = useSelector((state: AppState) => state.delegator);
    const { t } = useTranslation();
    const titles = [
        '',
        t('main.currentBalance'),
        t('main.alreadyClaimed'),
        `${t('main.totalClaimed')} (${t('main.untilNow')})`
    ];

    return (
        !selectedDelegator && !delegatorIsLoading ?  <NoData /> :  <div className="delegator-rewards-top">
           <RewardTitles titles={titles} isLoading={delegatorIsLoading} listElementAmount={4} />
            <div className="delegator-rewards-top-details">
            <Reward
                        current={selectedDelegator?.rewards_balance}
                        claimed={selectedDelegator?.rewards_claimed}
                        img={TrophyImg}
                        token = {Logo}
                        title={t('main.rewards')}
                        isLoading = { delegatorIsLoading}
                    />
            </div>
        </div>
    );
};
