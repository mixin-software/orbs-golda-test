import React  from 'react';
import { Route } from 'react-router-dom';
import { routes } from '../../routes/routes';
import { GuardianDelegators } from './sections/guardian-delegators/guardian-delegators';
import { GuardiansStake } from './sections/guardians-stake/guardians-stake';
import { GuardianSearch } from './components/guardian-search/guardian-search';
import { GuardianSectionSelect } from './components/guardian-section-select/guardian-section-select';
import './guardians.scss';

const GuardiansComponent = () => {
  
    return (
        <div className="guardians screen">
           <GuardianSearch />
            <div className="screen-section">
             <GuardianSectionSelect />
                <div className="screen-section-container">
                    <Route path={routes.guardians.stake} render={() => <GuardiansStake />} />
                    <Route path={routes.guardians.delegators} render={() => <GuardianDelegators />} />
                </div>
            </div>
        </div>
    );
};

export const Guardians = React.memo(GuardiansComponent)