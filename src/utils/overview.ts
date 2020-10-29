import { Guardian, PosOverview, PosOverviewData, PosOverviewSlice } from '@orbs-network/pos-analytics-lib';
import { TFunction } from 'i18next';
import { ChartUnit, OverviewSections } from '../global/enums';
import { ChartDatasetObject, MenuOption } from '../global/types';
import { routes } from '../routes/routes';
import moment from 'moment';
import { generateDays, returnDateNumber } from './dates';
import { sortByDate, sortByNumber } from './array';
import { overviewguardiansColors } from '../ui/colors';
import { api } from '../services/api';
export const getGuardiantsAndCandidates = (guardians: Guardian[]) => {
    console.log(guardians);
};

export const generateOverviewRoutes = (t: TFunction): MenuOption[] => {
    return [
        {
            name: t('main.stake'),
            route: routes.overview.stake,
            key: OverviewSections.STAKE
        },
        {
            name: t('main.weights'),
            route: routes.overview.weights,
            key: OverviewSections.WEIGHTS
        }
    ];
};

export const getGuardianColor = (amount: number) => {
    let arr: string[] = [];
    let count = 0;
    const limit = overviewguardiansColors.length - 1;
    for (let i = 0; i < amount; i++) {
        const color = overviewguardiansColors[count];
        arr.push(color);
        if (count === limit) {
            count = 0;
        } else {
            count += 1;
        }
    }
    return arr;
};

const getSortedGuardiansOrder = (slices: PosOverviewSlice[]) => {
    const sorted = sortByDate(slices);
    const latest: PosOverviewSlice = sorted[0];
    const { data } = latest;
    const sortedGuardians = sortByNumber(data, 'effectiveStake');
    const guardiansObject: any = {};
    sortedGuardians.forEach((guardian: Guardian, index: number) => {
        const obj: any = {
            order: index
        };
        guardiansObject[guardian.address] = obj;
    });
    return guardiansObject;
};

const orderArr = (data: PosOverviewData[], orderObject: any) => {
    return data.sort((a: PosOverviewData, b: PosOverviewData) => {
        return orderObject[a.address] - orderObject[b.address];
    });
};

export const getOverviewChartData = (dates: any, unit: ChartUnit, overviewData?: PosOverview) => {
    if (!overviewData) return;
    const { slices } = overviewData;
    const order = getSortedGuardiansOrder(slices);
    let arr: any[] = [];
    const days = generateDays(20);
    const daysInUse: any = [];
    slices.forEach((slice: PosOverviewSlice) => {
        const { block_time, data } = slice;
        const date = returnDateNumber(block_time, ChartUnit.DAY);
        if (!days.hasOwnProperty(date)) return;
        if (daysInUse.includes(date)) return;
        daysInUse.push(date);
        const object = {
            date,
            data: orderArr(data, order)
        };
        arr.push(object);
    });
    return arr;
};
