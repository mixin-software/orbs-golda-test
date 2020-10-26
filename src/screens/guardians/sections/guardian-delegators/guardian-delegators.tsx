import React from 'react';
import { GuardianDelegator } from '@orbs-network/pos-analytics-lib';
import { convertToString } from '../../../../utils/number';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/types/types';
import CopyImg from '../../../../assets/images/copy.svg';

import './guardian-delegators.scss';
import { Link } from 'react-router-dom';
import { routes } from '../../../../routes/routes';
import { ListLoader } from '../../../../components/loaders/list-loader';
import { LoadingComponent } from '../../../../components/loading-component/loading-component';
import { LoaderType } from '../../../../global/enums';
import { NoData } from '../../../../components/no-data/no-data';

export const GuardianDelegators = () => {
    const { selectedGuardian, guardianIsLoading } = useSelector((state: AppState) => state.guardians);

    const titles = ['Delegators address', 'Stake', 'Non-staked balance'];
    return (
        <div className="list guardian-delegators-list">
            <header className="list-header flex-start-center">
                {titles.map((title: any, index: number) => {
                    return (
                        <h3 key={index} className="list-item">
                            {title}
                        </h3>
                    );
                })}
            </header>
           <LoadingComponent isLoading = {guardianIsLoading} loaderType = {LoaderType.LIST} listElementAmount={3}>
           <ul>
                {selectedGuardian ?
                    selectedGuardian.delegators.map((delegator: GuardianDelegator, index: number) => {
                        const { address, stake } = delegator;
                        return (
                            <li className="flex-start-center" key={index}>
                                <Link
                                    className="list-item text-overflow flex-start-center"
                                    to={routes.delegators.stake.replace(':address', address)}>
                                    <p>{address}</p>
                                    <img src={CopyImg} alt="" />
                                </Link>

                                <p className="list-item">{convertToString(stake)}</p>
                                <p className="list-item">-</p>
                            </li>
                        );
                    }) : <NoData />}
            </ul>
           </LoadingComponent>
        </div>
    );
};
