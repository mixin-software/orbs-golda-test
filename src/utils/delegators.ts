import { Delegator, DelegatorStake } from '@orbs-network/pos-analytics-lib';
import { TFunction } from 'i18next';
import { DelegatorsSections, DeligatorActionsTypes } from '../global/enums';
import { MenuOption } from '../global/types';
import { routes } from '../routes/routes';
import moment from 'moment';
import { STACK_GRAPH_MONTHS_LIMIT } from '../global/variables';
import { generateMonths } from './dates';
export const generateDelegatorsRoutes = (t: TFunction, delegator?: Delegator): MenuOption[] => {
    const address = delegator ? delegator.address : '';
    return [
        {
            name: t('main.stake'),
            route: routes.delegators.stake.replace(':address', address),
            key: DelegatorsSections.STAKE
        },
        {
            name: t('main.rewards'),
            route: routes.delegators.rewards.replace(':address', address),
            key: DelegatorsSections.REWARDS,
            disabled: true
        },
        {
            name: t('main.actions'),
            route: routes.delegators.actions.replace(':address', address),
            key: DelegatorsSections.ACTIONS
        }
    ];
};

export const checkIfLoadDeligator = (address?: string, delegator?: Delegator): boolean => {
    if (!address) return false;
    if (!delegator) return true;
    if (delegator.address.toLowerCase() === address.toLowerCase()) return false;
    return true;
};

export const sortDelegatorStakeDataMonths = (delegator?: Delegator) => {
    if (!delegator) return;
    const { stake_slices } = delegator;
    let arr: any = [];
    const dates = generateMonths(STACK_GRAPH_MONTHS_LIMIT, 'MM/YYYY');
    stake_slices.map((slice: DelegatorStake) => {
        const { block_time, stake } = slice;
        const dateMonth = moment.unix(block_time).format('MM/YYYY');
        if (!dates.hasOwnProperty(dateMonth)) return;
        const x = moment.unix(block_time).format('DD/MM/YYYY');
        const obj = {
            x,
            y: stake
        };
        arr.push(obj);
    });
    return arr.sort((a: any, b: any) => {
        return moment(a.x, 'DD/MM/YYYY').diff(moment(b.x, 'DD/MM/YYYY'));
    });
};

export const generateGuardiansActionColors = (event: DeligatorActionsTypes) => {
    switch (event) {
        case DeligatorActionsTypes.STAKED:
            return 'green';
        case DeligatorActionsTypes.RESTAKED:
            return 'green';
        case DeligatorActionsTypes.UNSTAKED:
            return 'red';
        case DeligatorActionsTypes.WITHDREW:
            return 'red';
        default:
            break;
    }
};
