import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SupportedLanguage } from '../../../../global/types';
import { api } from '../../../../services/api';
import { flags } from '../../../../ui/country-flags';
const { FlagIcon } = require('react-flag-kit');
export const Languages = () => {
    const { t, i18n } = useTranslation();
    const [supportedlanguages, setSupportedLanguages] = useState<undefined | SupportedLanguage>(undefined);

    useEffect(() => {
        getLanguages();
    }, []);

    const getLanguages = async () => {
        const res = await api.getSupportedlanguages();
     
        if (!res) return;
        setSupportedLanguages(res);
    };

    const generateSupportedlanguages = (languages?: SupportedLanguage) => {
        if (!languages) return;
        return Object.keys(languages).map(function (key: string, index: number) {
            const flagsObject: any = flags;
            const src = flagsObject[key];
            return (
                <li key={index} onClick={() => changeLang(key)}>
                    <img src={src} alt="" />
                </li>
            );
        });
    };

    const changeLang = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return <ul className="navigation-languages flex-start">{generateSupportedlanguages(supportedlanguages)}</ul>;
};
