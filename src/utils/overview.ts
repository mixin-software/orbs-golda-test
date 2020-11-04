import { PosOverview, PosOverviewData, PosOverviewSlice } from '@orbs-network/pos-analytics-lib';
import { TFunction } from 'i18next';
import { ChartUnit, OverviewSections } from '../global/enums';
import { BarChartDataset, MenuOption, OverviewChartData, OverviewChartObject } from '../global/types';
import { routes } from '../routes/routes';
import { converFromNumberToDate, generateDays, generateMonths, generateWeeks, returnDateNumber } from './dates';
import { sortByDate, sortByNumber } from './array';
import { overviewguardiansColors } from '../ui/colors';
import { DATE_FORMAT, OVERVIEW_CHART_LIMIT } from '../global/variables';

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

const getGuardiansOrder = (slices: PosOverviewSlice[]) => {
    const sorted = sortByDate(slices);
    const NewestSlice: PosOverviewSlice = sorted[0];
    const { data } = NewestSlice;
    const sortedGuardiansByStake = sortByNumber(data, 'effective_stake');
    const guardiansObject: any = {};
    const colors = getGuardianColor(sortedGuardiansByStake.length);
    sortedGuardiansByStake.forEach((guardian: BarChartDataset, index: number) => {
        const obj = {
            order: index,
            backgroundColor: colors[index],
            label: guardian.name,
            data: [],
            maxBarThickness: 30,
            hoverBackgroundColor: undefined
        };
        guardiansObject[guardian.address] = obj;
    });
    return guardiansObject;
};

// export const reorderGuardians = (data: PosOverviewData[], orderObject: any): PosOverviewData[] => {
//     return data.sort((a: PosOverviewData, b: PosOverviewData) => {
//         return orderObject[a.address] - orderObject[b.address];
//     });
// };

export const getOverviewChartData = (dates: any, unit: ChartUnit, overviewData: PosOverview) => {
    const { slices } = overviewData;
    const order = getGuardiansOrder(slices);

    const datesInUse: any = [];
    slices.forEach((slice: PosOverviewSlice) => {
        const { block_time, data } = slice;
        const date = returnDateNumber(block_time, unit);
        if (!date) return;
        if (!dates.hasOwnProperty(date)) return;
        if (datesInUse.includes(date)) return;
        datesInUse.push(date);
        data.forEach((stakeGuardian: PosOverviewData) => {
            const obj = {
                x: converFromNumberToDate(date, unit, DATE_FORMAT),
                y: stakeGuardian.effective_stake,
                ...stakeGuardian
            };
            if (!order[stakeGuardian.address]) return;
            order[stakeGuardian.address].data.push(obj);
        });
    });
    const filled = fillEmptyDates(order, dates, unit);
    const obj = {
        data: generateDataset(order),
        unit
    };
    return obj;
};

export const generateDataset = (arr: any) => {
    const result = Object.keys(arr).map((key) => {
        return arr[key];
    });
    return result;
};

export const fillEmptyDates = (order: any, dates: any, unit: ChartUnit) => {
    let previousData: any = [{}];
    const result = Object.keys(order).map((key) => {
        console.log(order[key].data);
    });
};

export const fillEmptyData = (orderObject: any, unit: ChartUnit): OverviewChartObject[] => {
    const filledChartData = Object.keys(orderObject).map(function (key, index) {
        const data = orderObject[key];
        const date = converFromNumberToDate(Number(key), unit, DATE_FORMAT);
        if (data.length === 0) {
            return {
                data: [],
                date
            };
        } else {
            return {
                date,
                data
            };
        }
    });
    return filledChartData;
};

export const generateOverviewChartData = (type: ChartUnit, overviewData?: PosOverview) => {
    if (!overviewData) return;
    let data;
    switch (type) {
        case ChartUnit.MONTH:
            const months = generateMonths(OVERVIEW_CHART_LIMIT);
            data = getOverviewChartData(months, ChartUnit.MONTH, overviewData);
            break;
        case ChartUnit.WEEK:
            const weeks = generateWeeks(OVERVIEW_CHART_LIMIT);
            data = getOverviewChartData(weeks, ChartUnit.WEEK, overviewData);
            break;
        case ChartUnit.DAY:
            const days = generateDays(OVERVIEW_CHART_LIMIT);
            data = getOverviewChartData(days, ChartUnit.DAY, overviewData);
            break;
        default:
            break;
    }
    return data;
};
