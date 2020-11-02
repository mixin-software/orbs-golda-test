import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../redux/types/types';
import { convertToString } from '../../../../utils/number';
import TotalStakeImg from '../../../../assets/images/cpu.svg';
import GuardiansImg from '../../../../assets/images/encrypted.svg';
import { useTranslation } from 'react-i18next';
import { LoadingComponent } from '../../../../components/loading-component/loading-component';
import {  LoaderType } from '../../../../global/enums';
import './overview-top.scss';

interface StateProps {
    data: number;
    textTop: string;
    textBottom: string;
    imgSrc: string;
    btnText: string;
    link?: string;
}

const OverviewTopSection = ({ data, textTop, textBottom, imgSrc, btnText, link }: StateProps) => {
    return (
        <section className="overview-top-section flex-column">
            <div className="flex-between">
                <span className="flex-start-center">
                    <img src={imgSrc} alt="" />
                    <span className='flex-column'>
                        <p>{textTop}</p>
                        <p>{textBottom}</p>
                    </span>
                </span>
                <LoadingComponent loaderType = {LoaderType.TEXT} isLoading ={!data}>
                <h4>{convertToString(data)}</h4>
                </LoadingComponent>
            </div>
        <button type='button' className='flex-center'>
    {link ?  <a className='flex-center' href={link} target='_blank'>{btnText}</a> : btnText}
        </button>
        </section>
    );
};




const OverviewTopComponent = () => {
    const { overviewData } = useSelector((state: AppState) => state.overview);
    const { t } = useTranslation();
    const dispatch = useDispatch()
    return (
        <div className="overview-top flex-start-center">
            <OverviewTopSection
                textTop={t('overview.total')}
                textBottom={t('overview.stake')}
                data={overviewData?.total_stake || 0}
                imgSrc={TotalStakeImg}
                btnText = {t('overview.stakeYourTokens')}
                link = 'https://staking.orbs.network'
            />
            <OverviewTopSection
                textTop={t('overview.guardians')}
                textBottom={t('overview.candidates')}
                data={overviewData ? overviewData.n_candidates + overviewData.n_guardians : 0}
                imgSrc={GuardiansImg}
                btnText = {t('overview.guardianList')}
                link = 'https://staking.orbs.network'
            />
        </div>
    );
};
export const OverviewTop = React.memo(OverviewTopComponent)