import React, { useEffect } from 'react';
import { routes } from '../../routes/routes';
import { checkIfLoadDeligator, generateDelegatorsRoutes } from '../../utils/delegators';
import { Route, useParams, useHistory } from 'react-router-dom';
import { DeligatorsActions } from './sections/delegators-actions/deligators-actions';
import { SearchInput } from '../../components/search-input/search-input';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { findDelegatorAction } from '../../redux/actions/actions';
import { AppState } from '../../redux/types/types';
import { SectionMenu } from '../../components/section-menu/section-menu';
import { DelegatorsStake } from './sections/delegators-stake/delegators-stake';
import { DelegatorsReward } from './sections/delegators-reward/delegators-reward';
import './delegators.scss';
import { RouteParams } from '../../global/types';



export const Delegators = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const params: RouteParams = useParams();
    const { selectedDelegator, delegatorNotFound } = useSelector((state: AppState) => state.delegator);

    const returnSearchValue = (address: string) => {
        const { section } = params;
        history.push(routes.delegators.main.replace(':section?', section).replace(':address', address));
        findDelegator(address);
    };

    const findDelegator = (address: string) => {
        const LoadDelegator = checkIfLoadDeligator(address, selectedDelegator);
        console.log(LoadDelegator)
        if (LoadDelegator) {
            dispatch(findDelegatorAction(address));
        }
    };

    useEffect(() => {
        const { address } = params;
        if(!address) return
        findDelegator(address);
    }, []);
    return (
        <div className="delegators screen">
            <SearchInput
                title={t('main.address')}
                list={[]}
                returnSearchValue={returnSearchValue}
            />
            {delegatorNotFound && <p className='delegator-not-found'>Delegator not found</p>}
            <div className="screen-section">
                <SectionMenu options={generateDelegatorsRoutes(t, selectedDelegator)} />
                <div className="screen-section-container">
                    <Route path={routes.delegators.stake} render={() => <DelegatorsStake />} />
                    <Route path={routes.delegators.rewards} render={() => <DelegatorsReward />} />
                    <Route path={routes.delegators.actions} render={() => <DeligatorsActions />} />
                </div>
            </div>
        </div>
    );
};
