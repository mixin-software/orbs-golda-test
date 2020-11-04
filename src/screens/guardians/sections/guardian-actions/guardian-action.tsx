import { GuardianAction } from '@orbs-network/pos-analytics-lib';
import React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { ETHERSCAN_BLOCK_ADDRESS } from '../../../../keys/keys';
import { convertToString } from '../../../../utils/number';

interface StateProps {
    action: GuardianAction;
}

export const GuardianActionComponent = ({ action }: StateProps) => {
    const { amount, block_time, block_number, event, additional_info_link } = action;
    console.log(action)
    const { t } = useTranslation();


    return (
        <li className="flex-start-center">
            {additional_info_link ? 
              <a
              href={additional_info_link}
              target="_blank"
              rel="noopener noreferrer"
              className="list-item">
              <p>{event}</p>
          </a>
            : <p className="list-item capitalize" >
                {event}
            </p>}
            <p className="list-item" >
                {convertToString(amount, '-')}
            </p>
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
