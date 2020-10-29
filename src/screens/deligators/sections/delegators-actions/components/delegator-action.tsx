import { DelegatorAction } from '@orbs-network/pos-analytics-lib';
import React from 'react';
import { Link } from 'react-router-dom';
import { DeligatorActionsTypes } from '../../../../../global/enums';
import { routes } from '../../../../../routes/routes';
import { generateGuardiansActionColors } from '../../../../../utils/delegators';
import LinkIcon from '../../../../../assets/images/copy.svg';
import { convertToString } from '../../../../../utils/number';
import { ETHERSCAN_BLOCK_ADDRESS } from '../../../../../keys/keys';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

interface StateProps {
    action: DelegatorAction;
}

export const DelegatorActionElement = ({ action }: StateProps) => {
    const { amount, block_time, block_number, event, to, currentStake } = action;
    const { t } = useTranslation();

    const generateAction = () => {
        const isDeligated = event === DeligatorActionsTypes.DELEGATED;

        if (isDeligated && to) {
            return (
                <div className="list-item">
                    {isDeligated ? <p>{t('delegators.delegatedTo')}</p> : <p>{event}</p>}
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
        return <p className="list-item">{event}</p>;
    };
    const color = generateGuardiansActionColors(event as DeligatorActionsTypes);
    return (
        <li className="flex-start-center">
            {generateAction()}
            <p className="list-item" style={{ color }}>
                {convertToString(amount, '-')}
            </p>
            <p className="list-item">{convertToString(currentStake)}</p>
            <a
                href={`${ETHERSCAN_BLOCK_ADDRESS}/${block_number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="list-item">
                <p>{block_number}</p>
            </a>
            <p className="list-item">{moment.unix(block_time).format('YYYY-MM-DD HH:mm')}</p>
        </li>
    );
};
