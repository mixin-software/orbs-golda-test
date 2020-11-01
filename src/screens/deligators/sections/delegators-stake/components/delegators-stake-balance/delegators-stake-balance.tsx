import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LoadingComponent } from '../../../../../../components/loading-component/loading-component';
import { LoaderType } from '../../../../../../global/enums';
import { AppState } from '../../../../../../redux/types/types';
import { getGuardianByAddress } from '../../../../../../utils/guardians';
import { convertToString } from '../../../../../../utils/number';
import { routeToGuardian } from '../../../../../../utils/routing';
import TokenImg from '../../../../../../assets/images/token.svg';
import { useTranslation } from 'react-i18next';

interface StateProps {
    isLoading: boolean;
    text: string;
    data: string | number;
}


const DelegatorsStakeBalanceSection = ({ isLoading, text, data }: StateProps) => {
    return (
        <div className="flex-column">
            <h4 className="one-line capitalize">{text}</h4>
            <LoadingComponent loaderType={LoaderType.TEXT} isLoading={isLoading}>
               <div className='flex-start-center'>
               <p className="delegators-stake-balance-big">{data}</p>
                <img src={TokenImg} alt=""  className='delegators-stake-balance-img'/>
               </div>
            </LoadingComponent>
        </div>
    );
};



export const DelegatorsStakeBalance = () =>  {
    const { selectedDelegator, delegatorIsLoading } = useSelector((state: AppState) => state.delegator);
    const { guardians } = useSelector((state: AppState) => state.guardians);
    const {t} = useTranslation()
    const delegatedTo = getGuardianByAddress(guardians, selectedDelegator?.delegated_to )?.name

    return (
        <section className="delegators-stake-balance flex-start">
        <DelegatorsStakeBalanceSection
            data={convertToString(selectedDelegator?.total_stake)}
            isLoading={delegatorIsLoading}
            text={t('main.stake')}
        />
         <DelegatorsStakeBalanceSection
            data={convertToString(selectedDelegator?.cool_down_stake)}
            isLoading={delegatorIsLoading}
            text={t('delegators.cooldown')}
        />
        <DelegatorsStakeBalanceSection
            data={convertToString(selectedDelegator?.non_stake)}
            isLoading={delegatorIsLoading}
            text={t('delegators.nonStakedBalance')}
        />
        <div className="delegators-stake-balance-to flex-column text-overflow">
            <h4>{t('delegators.delegatedTo')}</h4>
            <LoadingComponent loaderType={LoaderType.TEXT} isLoading={delegatorIsLoading}>
              {
                  !delegatedTo ? 
                  <p className="delegators-stake-balance-big">-</p>
                  : <Link to ={routeToGuardian(selectedDelegator?.delegated_to)}>
                  <h5 className="text-overflow">{delegatedTo}</h5>
                  </Link>
              }
            </LoadingComponent>
            <LoadingComponent loaderType={LoaderType.TEXT} isLoading={delegatorIsLoading}>
               <Link to ={routeToGuardian(selectedDelegator?.delegated_to)} >
               <p className="text-overflow delegators-stake-balance-small"> {selectedDelegator?.delegated_to}</p>
               </Link>
            </LoadingComponent>
        </div>
    </section>
    )
}

