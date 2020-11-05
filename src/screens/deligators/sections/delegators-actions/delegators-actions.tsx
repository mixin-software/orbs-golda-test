import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/types/types';
import moment from 'moment';
import { List } from '../../../../components/list/list';
import { DelegatorAction } from '@orbs-network/pos-analytics-lib';
import { DelegatorActionElement } from './components/delegator-action';
import { NoData } from '../../../../components/no-data/no-data';
import './delegators-actions.scss';
import { useTranslation } from 'react-i18next';

export const DeligatorsActions = () => {
    const { selectedDelegator, delegatorIsLoading } = useSelector((state: AppState) => state.delegator);
    const { t } = useTranslation();
    const titles = [
        t('main.action'),
        t('main.amount'),
        t('main.currentStake'),
        `${t('main.block')} #`,
        `${t('main.time')} (GMT+${moment(moment().utcOffset()).format('H')})`
    ];

    const noData = !delegatorIsLoading && !selectedDelegator;
    return noData ? (
        <NoData />
    ) : (
        <div className="delegators-actions">
            <List loadersAmount={5} isLoading={delegatorIsLoading} titles={titles}>
                <>
                    {selectedDelegator &&
                        selectedDelegator.actions.map((action: DelegatorAction, key: number) => {
                            return <DelegatorActionElement action={action} key={key} />;
                        })}
                </>
            </List>
        </div>
    );
};
