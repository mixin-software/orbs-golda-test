import React from 'react';
import { routes } from '../../../../../../routes/routes';
import { convertToString } from '../../../../../../utils/number';
import { Link } from 'react-router-dom';
import CopyImg from '../../../../../../assets/images/copy.svg';
import { GuardianDelegator } from '@orbs-network/pos-analytics-lib';

interface StateProps {
    delegator: GuardianDelegator;
}

export const GuardianDelegatorElement = ({ delegator }: StateProps) => {
    const { address, stake, non_stake } = delegator;
    return (
        <li className="flex-start-center">
            <Link
                className="list-item text-overflow flex-start-center"
                to={routes.delegators.stake.replace(':address', address)}>
                <p>{address}</p>
                <img src={CopyImg} alt="" />
            </Link>
            <p className="list-item">{convertToString(stake)}</p>
            <p className="list-item">{convertToString(non_stake)}</p>
        </li>
    );
};
