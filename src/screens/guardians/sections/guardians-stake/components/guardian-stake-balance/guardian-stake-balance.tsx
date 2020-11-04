import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LoadingComponent } from '../../../../../../components/loading-component/loading-component';
import { LoaderType } from '../../../../../../global/enums';
import { AppState } from '../../../../../../redux/types/types';
import { getGuardianByAddress } from '../../../../../../utils/guardians';
import { convertToString } from '../../../../../../utils/number';
import { routeToGuardian } from '../../../../../../utils/routing';
import TokenImg from '../../../../../../assets/images/token.png';
import { useTranslation } from 'react-i18next';
import './guardian-stake-balance.scss';

interface StateProps {
    isLoading: boolean;
    text: string;
    data: string | number;
}

const GuardianStakeBalanceSection = ({ isLoading, text, data }: StateProps) => {
    return (
        <div className="guardian-stake-balance-section flex-column">
            <h4 className="one-line capitalize">{text}</h4>
            <LoadingComponent loaderType={LoaderType.TEXT} isLoading={isLoading}>
                <div className="flex-start-center">
                    <p className="guardian-stake-balance-bold">{data}</p>
                    <img src={TokenImg} alt="orbs img" className="guardian-stake-balance-img" />
                </div>
            </LoadingComponent>
        </div>
    );
};

export const GuardianStakeBalance = () => {
    const { selectedDelegator, delegatorIsLoading } = useSelector((state: AppState) => state.delegator);
    const { guardians } = useSelector((state: AppState) => state.guardians);
    const { t } = useTranslation();
    const delegatedTo = getGuardianByAddress(guardians, selectedDelegator?.delegated_to)?.name;

    return (
        <section className="guardian-stake-balance flex-start">
            <GuardianStakeBalanceSection
                data={convertToString(selectedDelegator?.total_stake)}
                isLoading={delegatorIsLoading}
                text={t('main.stake')}
            />
            <GuardianStakeBalanceSection
                data={convertToString(selectedDelegator?.cooldown_stake)}
                isLoading={delegatorIsLoading}
                text={t('guardians.cooldown')}
            />
            <GuardianStakeBalanceSection
                data={convertToString(selectedDelegator?.non_stake)}
                isLoading={delegatorIsLoading}
                text={t('guardians.nonStakedBalance')}
            />
           
        </section>
    );
};
