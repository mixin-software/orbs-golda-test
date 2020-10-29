import React from 'react';
import { routes } from '../../routes/routes';
import { Route} from 'react-router-dom';
import { DeligatorsActions } from './sections/delegators-actions/deligators-actions';
import { DelegatorsStake } from './sections/delegators-stake/delegators-stake';
import { DelegatorsReward } from './sections/delegators-reward/delegators-reward';
import './delegators.scss';
import { DelegatorSearch } from './components/delegator-search/delegator-search';
import { DelegatorSectionSelector } from './components/delegator-sections-selector/delegator-section-selector';

 const DelegatorsComponent = () => {
    return (
        <div className="delegators screen">
          <DelegatorSearch />
            <div className="screen-section">
                <DelegatorSectionSelector />
                <div className="screen-section-container">
                    <Route path={routes.delegators.stake} render={() => <DelegatorsStake />} />
                    <Route path={routes.delegators.rewards} render={() => <DelegatorsReward />} />
                    <Route path={routes.delegators.actions} render={() => <DeligatorsActions />} />
                </div>
            </div>
        </div>
    );
};

export const Delegators = React.memo(DelegatorsComponent)