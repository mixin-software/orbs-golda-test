import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { FunctionComponent as Component } from 'react';

import { routes } from './routes';
import {Delegators} from '../screens/deligators/delegators';
import NavigationMenu from '../components/navigation-menu/navigation-menu';
import { Guardians } from '../screens/guardians/guardians';

export const RootRouter: Component = () => {
    return (
        <Router>
            <NavigationMenu />
            <Switch>
            <Route  path={routes.guardians.main} render={() => <Guardians />} />
                <Route  path={routes.delegators.main} render={() => <Delegators />} />
            </Switch>
        </Router>
    );
};
