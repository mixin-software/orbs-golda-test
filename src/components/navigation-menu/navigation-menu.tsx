import React, { FunctionComponent as Component } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import { generateNavigationLinks } from '../../utils/navigation';
import Logo from '../../assets/images/navbar-logo.svg';
import { NavigationLink } from '../../global/types';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/types/types';

import './navigation-menu.scss';

export const NavigationMenu: Component<any> = () => {
    const { t } = useTranslation();
    const {selectedDelegator} = useSelector((state: AppState) => state.delegator);
    const {selectedGuardian} = useSelector((state: AppState) => state.guardians);
    return (
        <nav className="navigation flex-column">
            <img src={Logo} alt="" className="navigation-logo" />
            <h4 className="navigation-title">{t('navigation.orbsUniverse')}</h4>
            <h5 className="navigation-sub-title">{t('navigation.analytics')}</h5>
            <ul className="navigation-list flex-column">
                {generateNavigationLinks(t, selectedDelegator, selectedGuardian).map((link: NavigationLink, index: number) => {
                    const { name, image, route } = link;
                    return (
                       <li className='navigation-list-item'  key = {index}>
                            <Link to={route} className='navigation-list-item-link flex-column'>
                                <img src={image} alt="" />
                                <p className='capitalize'>{name}</p>
                            </Link>
                       </li>
                    );
                })}
            </ul>
        </nav>
    );
};


