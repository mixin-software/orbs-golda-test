import React, { FunctionComponent as Component, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getGuardiansAction, getOverviewAction } from './redux/actions/actions';
import { RootRouter } from './routes';
import './scss/app.scss';
import i18next from 'i18next';
import Backend from 'i18next-locize-backend';
import { LOCAIZE_API_KEY, LOCAIZE_PROJECT_ID } from './global/variables';
import { useTranslation } from 'react-i18next';
import { api } from './services/api';

const App: Component = () => {
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch();
    useEffect(() => {
     
        dispatch(getGuardiansAction());
        dispatch(getOverviewAction());
    }, []);


    const changeLang = (lang: string) => {

        i18n.changeLanguage(lang)
    }

    return (
        <div className="app flex-between">
            <RootRouter />
        </div>
    );
};

export default App;
