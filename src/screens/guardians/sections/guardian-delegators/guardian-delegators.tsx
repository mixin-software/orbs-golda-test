import React from 'react';
import { GuardianDelegator } from '@orbs-network/pos-analytics-lib';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/types/types';
import { NoData } from '../../../../components/no-data/no-data';
import './guardian-delegators.scss';
import { GuardianDelegatorElement } from './components/guardian-delegator/guardian-delegator';
import { List } from '../../../../components/list/list';
import { useTranslation } from 'react-i18next';

export const GuardianDelegators = () => {
    const { selectedGuardian, guardianIsLoading } = useSelector((state: AppState) => state.guardians);
    const {t} = useTranslation()
    const titles = [t('guardians.delegatorsAddress'), t('guardians.stake'), t('guardians.nonStakedBalance')];
    const noData = !guardianIsLoading && !selectedGuardian;

    return noData ? (
        <NoData />
    ) : (
        <div className="list guardian-delegators-list">
            <List loadersAmount={3} isLoading={guardianIsLoading} titles={titles}>
                {selectedGuardian &&
                    selectedGuardian.delegators.map((delegator: GuardianDelegator) => {
                        return <GuardianDelegatorElement delegator={delegator} key={delegator.address} />;
                    })}
            </List>
        </div>
    );
};
