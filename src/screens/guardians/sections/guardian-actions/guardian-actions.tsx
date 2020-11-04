import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/types/types';
import moment from 'moment';
import { List } from '../../../../components/list/list';
import {  GuardianAction } from '@orbs-network/pos-analytics-lib';
import { NoData } from '../../../../components/no-data/no-data';
import { useTranslation } from 'react-i18next';
import { GuardianActionComponent } from './guardian-action';
import './guardian-actions.scss';

export const GuardianActions = () => {
    const { selectedGuardian, guardianIsLoading } = useSelector((state: AppState) => state.guardians);
    console.log(selectedGuardian)
    const {t} = useTranslation()
    const titles = [
        t('main.action'),
        t('main.sum'),
        `${t('main.block')} #`,
        `${t('main.time')} (GMT+${moment(moment().utcOffset()).format('H')})`
    ];
    return (
        <div className="guardian-actions">
            <List loadersAmount={4} isLoading={guardianIsLoading} titles={titles}>
                {selectedGuardian && selectedGuardian.actions.length > 0 ? (
                    <>
                        {selectedGuardian.actions.map((action: GuardianAction, key: number) => {
                            return <GuardianActionComponent action={action} key={key} />;
                        })}
                    </>
                ) : (
                    <NoData />
                )}
            </List>
        </div>
    );
};
