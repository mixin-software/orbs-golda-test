import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { LoadingComponent } from '../../../../components/loading-component/loading-component';
import {  LoaderType } from '../../../../global/enums';
import { AppState } from '../../../../redux/types/types';
import { convertToString } from '../../../../utils/number';
import { DelegatorStakeChart } from './components/delegator-stake-chart/delegator-stake-chart';
import './delegators-stake.scss';

export const DelegatorsStake = () => {
    const { t } = useTranslation();
    const { selectedDelegator, delegatorIsLoading } = useSelector((state: AppState) => state.delegator);



    return (
        <div className="delegators-stake">
            <section className="delegators-stake-balance flex-start">
                <div className="delegators-stake-balance-total flex-column">
                    <h4 className="capitalize">{t('main.stake')}</h4>
                    <LoadingComponent loaderType={LoaderType.TEXT} isLoading={delegatorIsLoading}>
                        <p className="delegators-stake-balance-big">
                            {' '}
                            {convertToString(selectedDelegator?.total_stake)}
                        </p>
                    </LoadingComponent>
                </div>
                <div className="delegators-stake-balance-cooldown flex-column">
                    <h4 className="capitalize">{t('delegators.cooldown')}</h4>
                    <LoadingComponent loaderType={LoaderType.TEXT} isLoading={delegatorIsLoading}>
                        <p className="delegators-stake-balance-big">
                            {' '}
                            {convertToString(selectedDelegator?.cool_down_stake)}
                        </p>
                    </LoadingComponent>
                </div>
                <div className="delegators-stake-balance-non-staked flex-column">
                    <h4 className="one-line">{t('delegators.nonStakedBalance')}</h4>
                    <LoadingComponent loaderType={LoaderType.TEXT} isLoading={delegatorIsLoading}>
                        <p className="delegators-stake-balance-big"> {convertToString(selectedDelegator?.non_stake)}</p>
                    </LoadingComponent>
                </div>
                <div className="delegators-stake-balance-to flex-column text-overflow">
                    <h4>{t('delegators.delegatedTo')}</h4>
                    <LoadingComponent loaderType={LoaderType.TEXT} isLoading={delegatorIsLoading}>
                        <h5 className="text-overflow">{selectedDelegator?.delegated_to}</h5>
                    </LoadingComponent>
                    <LoadingComponent loaderType={LoaderType.TEXT} isLoading={delegatorIsLoading}>
                        <p className="text-overflow"> {selectedDelegator?.address}</p>
                    </LoadingComponent>
                </div>
            </section>
           <DelegatorStakeChart />
        </div>
    );
};
