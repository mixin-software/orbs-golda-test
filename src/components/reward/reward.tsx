import React from 'react';
import { LoaderType } from '../../global/enums';
import { convertToString } from '../../utils/number';
import { LoadingComponent } from '../loading-component/loading-component';
import './reward.scss';

interface RewardProps {
    current?: number;
    claimed?: number;
    img: string;
    title: string;
    token: string;
    total?: number;
    isLoading: boolean;
}

export const Reward = ({ title, current, claimed, img, token, total, isLoading }: RewardProps) => {
    return (
        <div className="reward flex-start-center">
        <LoadingComponent loaderType={LoaderType.ONE_LINE} isLoading={isLoading} listElementAmount={4}>
            
            <div className="flex-start-center reward-title">
                <img src={img} alt=""  className='reward-image'/>
                <p className="reward-text reward-title capitalize">{title}</p>
            </div>
            <div className="flex-start-center">
                <p className='reward-text'>{convertToString(current)}</p>
                <img src={token} alt="" className='reward-token'/>
            </div>
            <div className="flex-start-center">
                <p className='reward-text'>{convertToString(claimed)}</p>
                <img src={token} alt="" className='reward-token'/>
            </div>
            <div className="flex-start-center">
                <p className='reward-text reward-total-text'>{convertToString(total)}</p>
                <img src={token} alt="" className='reward-token'/>
            </div>
      
        </LoadingComponent>
        </div>
    );
};
