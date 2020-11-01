import React from 'react';
import { GuardianDelegator } from '@orbs-network/pos-analytics-lib';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/types/types';
import { LoadingComponent } from '../../../../components/loading-component/loading-component';
import { LoaderType } from '../../../../global/enums';
import { NoData } from '../../../../components/no-data/no-data';
import './guardian-delegators.scss';
import { GuardianDelegatorElement } from './components/guardian-delegator/guardian-delegator';

export const GuardianDelegators = () => {
    const { selectedGuardian, guardianIsLoading } = useSelector((state: AppState) => state.guardians);

    const titles = ['Delegator\'s address', 'Stake', 'Non-staked balance'];
    return (
        <div className="list guardian-delegators-list">
          {selectedGuardian &&   <header className="list-header flex-start-center">
                {titles.map((title: any, index: number) => {
                    return (
                        <h3 key={index} className="list-item">
                            {title}
                        </h3>
                    );
                })}
            </header>}
           <LoadingComponent isLoading = {guardianIsLoading} loaderType = {LoaderType.LIST} listElementAmount={3}>
           <ul>
                {selectedGuardian ?
                    selectedGuardian.delegators.map((delegator: GuardianDelegator) => {
                        return <GuardianDelegatorElement  key = {delegator.address} delegator = {delegator} />
                    }) : <NoData />}
            </ul>
           </LoadingComponent>
        </div>
    );
};
