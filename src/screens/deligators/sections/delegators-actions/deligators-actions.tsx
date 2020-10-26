import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/types/types';
import { convertToString } from '../../../../utils/number';
import moment from 'moment';
import './deligators-actions.scss';
import { LoadingComponent } from '../../../../components/loading-component/loading-component';
import { LoaderType } from '../../../../global/enums';
import { DelegatorAction } from '@orbs-network/pos-analytics-lib';
import { ETHERSCAN_BLOCK_ADDRESS } from '../../../../keys/keys';
import { DelegatorActionGenerator } from './components/delegator-action';
import { NoData } from '../../../../components/no-data/no-data';

export const DeligatorsActions = () => {
    const { selectedDelegator, delegatorIsLoading } = useSelector((state: AppState) => state.delegator);
    const titles = ['Action', 'Amount', 'Block #', `Time (GMT+${moment(moment().utcOffset()).format('H')})`];

    return (
        <div className="deligators-actions">
            <div className="list deligators-actions-list">
                <header className="list-header flex-start-center">
                    {titles.map((title: any, index: number) => {
                        return (
                            <h3 key={index} className="list-item">
                                {title}
                            </h3>
                        );
                    })}
                </header>
            <LoadingComponent isLoading={delegatorIsLoading} loaderType={LoaderType.LIST} listElementAmount={4}>
                    <ul>
                        {selectedDelegator ?
                            selectedDelegator.actions.map((action: DelegatorAction, index: number) => {
                                const { amount, block_time, block_number, event } = action;

                                return (
                                    <li className="flex-start-center" key={index}>
                                        <DelegatorActionGenerator  action = {action}/>
                                        <p className="list-item">{convertToString(amount)}</p>
                                        <a
                                            href={`${ETHERSCAN_BLOCK_ADDRESS}/${block_number}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="list-item">
                                            <p>{block_number}</p>
                                        </a>
                                        <p className="list-item">
                                            {moment.unix(block_time).format('YYYY-MM-DD HH:mm')}
                                        </p>
                                    </li>
                                );
                            })  :<NoData />}
                    </ul>
                </LoadingComponent>
            </div>
        </div>
    );
};
