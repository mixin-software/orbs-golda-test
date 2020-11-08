import { DelegatorAction, DelegatorReward, GuardianAction } from '@orbs-network/pos-analytics-lib';
import React from 'react';
import { useSelector } from 'react-redux';
import { NoData } from '../../../../../../components/no-data/no-data';
import { AppState } from '../../../../../../redux/types/types';
import moment from 'moment';
import { List } from '../../../../../../components/list/list';
import { useTranslation } from 'react-i18next';
import { GuardianRewardAction } from './guardian-reward-action';
import './guardian-rewards-actions.scss';
import { getGuardiansRewardActions } from '../../../../../../utils/guardians';

export const GuardianRewardsActions = () => {
    const { selectedGuardian, guardianIsLoading } = useSelector((state: AppState) => state.guardians);
    const { t } = useTranslation();
    const titles = [
        t('main.action'),
        t('main.sum'),
        `${t('main.block')} #`,
        `Time (GMT+${moment(moment().utcOffset()).format('H')})`
    ];
    return !selectedGuardian && !guardianIsLoading ? null : (
        <div className="guardian-rewards-actions">
            <List loadersAmount={4} isLoading={guardianIsLoading} titles={titles} listLength = {3}>
                {selectedGuardian ? (
                    <>
                        {getGuardiansRewardActions(selectedGuardian.actions).map((action: GuardianAction, key: number) => {
                            return <GuardianRewardAction action={action} key={key} />;
                        })}
                    </>
                ) : (
                    <NoData />
                )}
            </List>
        </div>
    );
};
