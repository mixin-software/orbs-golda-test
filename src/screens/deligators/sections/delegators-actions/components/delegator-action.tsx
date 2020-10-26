import { DelegatorAction } from '@orbs-network/pos-analytics-lib';
import React from 'react'
import { Link } from 'react-router-dom';
import { DeligatorActionsTypes } from '../../../../../global/enums';
import { routes } from '../../../../../routes/routes';
import { generateGuardiansActionColors } from '../../../../../utils/delegators';
import LinkIcon from '../../../../../assets/images/copy.svg';


interface StateProps {
    action: DelegatorAction
}

export const DelegatorActionGenerator = ({action}: StateProps) => {
    const { event, to } = action;
    const isDeligated = event === DeligatorActionsTypes.DELEGATED;
    const color = generateGuardiansActionColors(event as DeligatorActionsTypes)
    if (isDeligated && to) {
        return (
            <div className="list-item">
                <p style ={{color}}>{event}</p>
                <section className="list-item-tooltip">
                    <Link to={routes.guardians.stake.replace(':address', to)} className="flex-start-center">
                        <p className="text-overflow">{to}</p>
                        <figure className="flex-start-center">
                            {to} <img src={LinkIcon} alt="" />
                        </figure>
                    </Link>
                </section>
            </div>
        );
    }
    return <p className="list-item" style ={{color}}>{event}</p>;
};