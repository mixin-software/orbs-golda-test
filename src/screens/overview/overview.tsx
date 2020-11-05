import React from 'react'
import { Route } from 'react-router-dom';
import { routes } from '../../routes/routes';
import { OverviewSectionSelector } from './components/overview-section-selector/overview-section-selector';
import { OverviewTop } from './components/overview-top/overview-top';
import './overview.scss';
import { OverviewStakeGuadians } from './components/overview-guardians/overview-guardians';
import { OverviewStake } from './sections/overview-stake/overview-stake';
import { OverviewWeights } from './sections/overview-weights/overview-weights';

export const Overview = () => {
    return (
        <div className='overview screen'>
            <OverviewTop />
            <div className="screen-section">
                <OverviewSectionSelector />
                <div className="screen-section-container">
                    <div className='overview-flex flex-start-center'>
                        <Route path={routes.overview.stake} render={() => <OverviewStake />} />
                        <Route path={routes.overview.weights} render={() => <OverviewWeights />} />
                        <OverviewStakeGuadians />
                    </div>
                </div>
            </div>
        </div>
    )
}
