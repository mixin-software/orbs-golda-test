import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/types/types';
import moment from 'moment';
import './deligators-actions.scss';
import { LoadingComponent } from '../../../../components/loading-component/loading-component';
import { LoaderType } from '../../../../global/enums';
import { DelegatorAction } from '@orbs-network/pos-analytics-lib';
import { DelegatorActionElement } from './components/delegator-action';
import { NoData } from '../../../../components/no-data/no-data';
import { sortByDate } from '../../../../utils/array';

export const DeligatorsActions = () => {
    const { selectedDelegator, delegatorIsLoading } = useSelector((state: AppState) => state.delegator);
    const titles = ['Action', 'Amount','Current stake','Block #', `Time (GMT+${moment(moment().utcOffset()).format('H')})`];

    return (
        <div className="deligators-actions">
            <div className="list deligators-actions-list">
               {selectedDelegator &&  <header className="list-header flex-start-center">
                    {titles.map((title: any, index: number) => {
                        return (
                            <h3 key={index} className="list-item">
                                {title}
                            </h3>
                        );
                    })}
                </header>}
                <LoadingComponent isLoading={delegatorIsLoading} loaderType={LoaderType.LIST} listElementAmount={4}>
                    <ul>
                        {selectedDelegator && selectedDelegator.actions ? (
                            sortByDate(selectedDelegator.actions).map((action: DelegatorAction, index: number) => {
                                return <DelegatorActionElement action={action} key={index} />;
                            })
                        ) : (
                            <NoData />
                        )}
                    </ul>
                </LoadingComponent>
            </div>
        </div>
    );
};
