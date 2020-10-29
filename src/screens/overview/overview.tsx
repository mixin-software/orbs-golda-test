import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import { getOverviewAction } from '../../redux/actions/actions';
import { routes } from '../../routes/routes';
import { OverviewSectionSelector } from './components/overview-section-selector/overview-section-selector';
import { OverviewTop } from './components/overview-top/overview-top';
import './overview.scss';
import { OverviewStake } from './sections/overview-stake/overview-stake';

 export const Overview = () =>  {
    return (
        <div className='overview screen'>
                <OverviewTop />
                <div className="screen-section">
                <OverviewSectionSelector />
                <div className="screen-section-container">
                    <Route path={routes.overview.stake} render={() => <OverviewStake />} />
                </div>
            </div>
        </div>
    )
}
