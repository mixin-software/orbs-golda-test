import { DelegatorAction, DelegatorReward } from '@orbs-network/pos-analytics-lib';
import React from 'react';
import { useSelector } from 'react-redux';
import { NoData } from '../../../../../../components/no-data/no-data';
import { AppState } from '../../../../../../redux/types/types';
import moment from 'moment';
import './delegator-rewards-actions.scss';
import { List } from '../../../../../../components/list/list';
import { useTranslation } from 'react-i18next';
import { DelegatorRewardAction } from './components/delegator-reward-actions/delegator-reward-action';
import { getDelegatorRewardActions } from '../../../../../../utils/delegators';

export const DelegatorRewardsActions = () => {
    const { selectedDelegator, delegatorIsLoading } = useSelector((state: AppState) => state.delegator);
    const { t } = useTranslation();
    const titles = [
        t('main.action'),
        t('main.sum'),
        `${t('main.block')} #`,
        `Time (${t('main.gmt')}+${moment(moment().utcOffset()).format('H')})`
    ];
    return !selectedDelegator && !delegatorIsLoading ? null : (
        <div className="delegators-rewards-actions">
            <List loadersAmount={4} isLoading={delegatorIsLoading} titles={titles}>
                {selectedDelegator ? (
                    <div>
                        {getDelegatorRewardActions(selectedDelegator.actions).map((action: DelegatorAction, key: number) => {
                            return <DelegatorRewardAction action={action} key={key} />;
                        })}
                    </div>
                ) : (
                    <NoData />
                )}
            </List>
        </div>
    );
};
