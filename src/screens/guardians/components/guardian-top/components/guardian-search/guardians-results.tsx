import { Guardian } from '@orbs-network/pos-analytics-lib';
import React from 'react';
import { filterGuardians } from '../../../../../../utils/guardians';

interface StateProps {
    guardians?: Guardian[],
    inputValue: string;
    select: (result: Guardian) => void;
}

export const GuardiansResults = ({guardians, inputValue, select}: StateProps) => {
    return (
        <ul className="search-input-box-results">
            {filterGuardians(guardians || [], inputValue).map((result: Guardian, index: number) => {
                const { address, name } = result;
                return (
                    <li key={index} className="flex-start-center" onClick={() => select(result)}>
                        <p className="text-overflow">{`${name} (${address})`}</p>
                    </li>
                );
            })}
        </ul>
    );
};
