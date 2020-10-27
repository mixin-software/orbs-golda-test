import { Delegator, DelegatorStake } from '@orbs-network/pos-analytics-lib';
import { TFunction } from 'i18next';
import { ChartColors, ChartUnit, ChartYaxis, DelegatorsSections, DeligatorActionsTypes } from '../global/enums';
import { ChartData, ChartDatasetObject, MenuOption } from '../global/types';
import { routes } from '../routes/routes';
import moment from 'moment';
import { returnDateNumber } from './dates';
import { sortByDate } from './array';
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

export const getDelegatorChartData = (dates: any, unit: ChartUnit, delegator: Delegator): ChartData => {
    const { stake_slices } = delegator;
    let arr: ChartDatasetObject[] = [];
    stake_slices.map((slice: DelegatorStake) => {
        const { block_time, stake } = slice;
        const date = returnDateNumber(block_time, unit);
        if (!dates.hasOwnProperty(date)) return;
        const datasetObject = {
            x: moment.unix(block_time).format('DD/MM/YYYY'),
            y: stake
        };
        arr.push(datasetObject);
    });
    const dataset = {
        data: sortByDate(arr),
        color: ChartColors.GRAY,
        yAxis: ChartYaxis.Y1
    };
    return {
        datasets: [dataset],
        unit
    };
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
