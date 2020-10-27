import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useHistory, useParams } from 'react-router-dom';
import { SearchInput } from '../../components/search-input/search-input';
import { SectionMenu } from '../../components/section-menu/section-menu';
import { RouteParams } from '../../global/types';
import { getGuardianAction, getGuardiansAction } from '../../redux/actions/actions';
import { AppState } from '../../redux/types/types';
import { routes } from '../../routes/routes';
import { checkIfLoadDelegator, generateGuardiansRoutes } from '../../utils/guardians';
import { GuardianDelegators } from './sections/guardian-delegators/guardian-delegators';
import { GuardiansStake } from './sections/guardians-stake/guardians-stake';
import { SearchListType } from '../../global/enums';
import './guardians.scss';

export const Guardians = () => {
    const { t } = useTranslation();
    const { guardians, selectedGuardian } = useSelector((state: AppState) => state.guardians);
    const dispatch = useDispatch();
    const history: any = useHistory();
    const params: RouteParams = useParams();
    console.log(guardians)
    useEffect(() => {
        getGuardiansOnLoad();
        findGuardianOnLoad();
    }, []);

    const getGuardiansOnLoad = () => {
        dispatch(getGuardiansAction());
    };

    const findGuardianOnLoad = () => {
        const { address } = params;
        if (!address) return;
        findGuardian(address);
    };

    const findGuardian = (address: string) => {
        const loadGuardian = checkIfLoadDelegator(address, selectedGuardian);
        if (loadGuardian) {
            dispatch(getGuardianAction(address));
        }
    };
    const returnSearchValue = (address: string) => {
        const { section } = params;
        history.push(routes.guardians.main.replace(':section?', section).replace(':address', address));
        findGuardian(address);
    };
    return (
        <div className="guardians screen">
            <SearchInput title={t('guardians.selectGuardian')} list={guardians} returnSearchValue={returnSearchValue}
                filterProperty = {['name', 'address']}
                viewProperties = {['name', 'address']}
                listType = {SearchListType.GUARDIAN}
            />
            <div className="screen-section">
                <SectionMenu options={generateGuardiansRoutes(t, selectedGuardian)} />
                <div className="screen-section-container">
                    <Route path={routes.guardians.stake} render={() => <GuardiansStake />} />
                    <Route path={routes.guardians.delegators} render={() => <GuardianDelegators />} />
                </div>
            </div>
        </div>
    );
};
