import { TFunction } from 'i18next';
import { ChartData, GuardianDataset, MenuOption } from '../global/types';
import { routes } from '../routes/routes';
import { ChartColors, ChartUnit, ChartYaxis, GuardiansSections } from '../global/enums';
import { GuardianInfo, GuardianStake } from '@orbs-network/pos-analytics-lib';
import {
    generateMonths,
    generateWeeks,
    getDayNumberFromUnixDate,
    getMonthNumberFromUnixDate,
    getWeekNumberFromUnixDate,
    returnDateNumber
} from './dates';
import { STACK_GRAPH_MONTHS_LIMIT } from '../global/variables';
import moment from 'moment';
export const generateGuardiansRoutes = (t: TFunction, guardian?: GuardianInfo): MenuOption[] => {
    const address = guardian ? guardian.address : '';
    return [
        {
            name: t('main.stake'),
            route: routes.guardians.stake.replace(':address', address),
            key: GuardiansSections.STAKE
        },
        {
            name: t('main.rewards'),
            route: routes.guardians.rewards.replace(':address', address),
            key: GuardiansSections.REWARDS,
            disabled: true
        },
        {
            name: t('main.delegetors'),
            route: routes.guardians.delegators.replace(':address', address),
            key: GuardiansSections.DELEGATORS
        }
    ];
};

export const checkIfLoadDelegator = (address?: string, guardian?: GuardianInfo): boolean => {
    if (!address) return false;
    if (guardian && guardian.address === address) return false;
    return true;
};

const generateObject = () => {
    return {
        selfStake: {
            data: [],
            color: ChartColors.GRAY,
            yAxis: ChartYaxis.Y2
        },
        delegatedStake: {
            data: [],
            color: ChartColors.YELLOW,
            yAxis: ChartYaxis.Y2
        },
        delegators: {
            data: [],
            color: ChartColors.GREEN,
            yAxis: ChartYaxis.Y1
        }
    };
};
export const getGuardianChartData = (months: any, unit: ChartUnit, guardian: GuardianInfo): ChartData => {
    let dataObject: any = generateObject();
    const { stake_slices } = guardian;
    stake_slices.map((slice: GuardianStake) => {
        const { block_time } = slice;
        const date = returnDateNumber(block_time, unit);
        if (!months.hasOwnProperty(date)) return;
        dataObject = insertChartDataByType(dataObject, slice);
    });
    return formatGuardianChartData(dataObject, unit);
};

export const formatGuardianChartData = (data: any, unit: ChartUnit) => {
    let datasetsArr: any = [];
    Object.keys(data).map(function (key) {
        const dataset = data[key];
        datasetsArr.push(dataset);
    });
    const obj = {
        datasets: datasetsArr,
        unit
    };
    return obj;
};

const insertChartDataByType = (data: any, slice: GuardianStake): any => {
    const { self_stake, n_delegates, block_time, delegated_stake } = slice;
    const x = moment.unix(block_time).format('DD/MM/YYYY');
    const selftStake = {
        x,
        y: self_stake
    };
    const delegators = {
        x,
        y: n_delegates
    };
    const delegatedStake = {
        x,
        y: delegated_stake
    };
    data.selfStake.data.push(selftStake);
    data.delegators.data.push(delegators);
    data.delegatedStake.data.push(delegatedStake);
    return data;
};
