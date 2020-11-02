import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState } from '../../../../../../redux/types/types';
import { routes } from '../../../../../../routes/routes';
import { getGuardianColor } from '../../../../../../utils/overview';
import CopyImg from '../../../../../../assets/images/copy.svg';
import { LoadingComponent } from '../../../../../../components/loading-component/loading-component';
import { LoaderType } from '../../../../../../global/enums';


import './overview-stake-guardians.scss';
import { useTranslation } from 'react-i18next';

export const OverviewStakeGuadians = () =>  {
    const { overviewData } = useSelector((state: AppState) => state.overview);
    const { t } = useTranslation();
    
    return (
        <div className="overview-stake-guardians">
        <header className="flex-start">{t('overview.guardianList')}</header>
       <LoadingComponent isLoading = {!overviewData} loaderType = {LoaderType.LIST} listElementAmount={6}>
       <ul className="overview-stake-guardians-list">
            {overviewData &&
                overviewData.slices &&
                overviewData.slices[0].data.map((guardian: any, index: number) => {
                    const colors = getGuardianColor(overviewData.slices[0].data.length);
                    const background = colors[index];
                    return (
                        <li key={index}>
                            <Link
                                to={routes.guardians.stake.replace(':address', guardian.address)}
                                className="flex-start-center">
                                <figure
                                    style={{
                                        background
                                    }}></figure>
                                <p className="text-overflow">{guardian.name}</p>
                                <img src={CopyImg} alt="" />
                            </Link>
                        </li>
                    );
                })}
        </ul>
       </LoadingComponent>
    </div>
    )
}

