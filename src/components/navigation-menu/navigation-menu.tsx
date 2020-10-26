import React, { FunctionComponent as Component } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import { routes } from '../../routes/routes';
import { generateNavigationLinks } from '../../utils/navigation';
import Logo from '../../assets/images/navbar-logo.svg';

import './navigation-menu.scss';
import { NavigationLink } from '../../global/types';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/types/types';

interface StateProps {
    history: any;
}

const NavigationMenu: Component<any> = ({ history }: StateProps) => {
    const { t } = useTranslation();
    const selectedDelegator = useSelector((state: AppState) => state.delegator.selectedDelegator);
    return (
        <nav className="navigation flex-column">
            <img src={Logo} alt="" className="navigation-logo" />
            <h4 className="navigation-title">{t('navigation.orbsUniverse')}</h4>
            <h5 className="navigation-sub-title">{t('navigation.analytics')}</h5>
            <ul className="navigation-list flex-column">
                {generateNavigationLinks(t, selectedDelegator).map((link: NavigationLink, index: number) => {
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

export default withRouter(NavigationMenu);
