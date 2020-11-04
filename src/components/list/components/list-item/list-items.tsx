import { DelegatorAction } from '@orbs-network/pos-analytics-lib';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { DeligatorActionsTypes, ListItemType } from '../../../../global/enums';
import { ETHERSCAN_BLOCK_ADDRESS } from '../../../../keys/keys';
import { routes } from '../../../../routes/routes';
import { generateGuardiansActionColors } from '../../../../utils/delegators';
import { convertToString } from '../../../../utils/number';
interface StateProps {
    action: any;
    listProperties: any;
}

export const ListItem = ({ action, listProperties }: StateProps) => {
    const { amount, block_time, block_number, event, to, current_stake } = action;
    const { t } = useTranslation();

    const createItem = (item: any) => {
        const { propertyName, type } = item;
        const actionValue: any = action[propertyName]
        console.log(propertyName)
        switch (type) {
            case ListItemType.STRING:
                return <p>{actionValue}</p>;
            case ListItemType.AMOUNT:
                return <p>{convertToString(actionValue)}</p>;
            case ListItemType.DATE:
                return <p>{moment.unix(actionValue).format('DD/MM/YYYY')}</p>;
            default:
                break;
        }
    };

    const generateAction1 = () => {
     
        return listProperties.map((item: any) => {
            return createItem(item)
        });
    };

    const generateAction = () => {
        const isDeligated = event === DeligatorActionsTypes.DELEGATED;

        if (isDeligated && to) {
            return (
                <div className="list-item">
                    {isDeligated ? <p>{t('delegators.delegatedTo')}</p> : <p>{event}</p>}
                    <section className="list-item-tooltip">
                        <Link to={routes.guardians.stake.replace(':address', to)} className="flex-start-center">
                            <p className="text-overflow">{to}</p>
                            <figure className="flex-start-center"></figure>
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
            {generateAction1()}
            {/* {generateAction()}
            <p className="list-item" style={{ color }}>
                {convertToString(amount, '-')}
            </p>
            <p className="list-item">{convertToString(current_stake)}</p>
            <a
                href={`${ETHERSCAN_BLOCK_ADDRESS}/${block_number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="list-item">
                <p>{block_number}</p>
            </a>
            <p className="list-item">{moment.unix(block_time).format('YYYY-MM-DD HH:mm')}</p> */}
        </li>
    );
};
