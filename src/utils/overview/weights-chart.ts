import { PosOverview, PosOverviewSlice, PosOverviewData, Guardian } from '@orbs-network/pos-analytics-lib';
import { ChartUnit } from '../../global/enums';
import { DATE_FORMAT, OVERVIEW_CHART_LIMIT } from '../../global/variables';
import { sortByNumber } from '../array';
import {
    returnDateNumber,
    converFromNumberToDate,
    generateMonths,
    generateWeeks,
    generateDays,
    getDifferenceBetweenDates
} from '../dates';
import { getGuardiansOrder } from './overview';
import moment from 'moment';
export const generateDataset = (arr: any) => {
    const result = Object.keys(arr).map((key) => {
        return arr[key];
    });
    return result;
};
const getNewestSlice = (slices: PosOverviewSlice[]) => {
    const sorted = sortByNumber(slices, 'block_time');
    const NewestSlice: PosOverviewSlice = sorted[0];
    return NewestSlice;
};

const checkIfDateIsEmpty = (order: any) => {
    let obj: any = {};
    Object.keys(order as any).map((key: any) => {
        const data = order[key].data;
        data.forEach((elem: any) => {
            const prev = obj[key] || 0;
            obj[elem.x] = prev + elem.y;
        });
    });
    return obj;
};

const filledEmptyData = (data: any, order: any) => {
    const datesObject = checkIfDateIsEmpty(order);
    return data.map((elem: any, i: number) => {
        const { y, x } = elem;
        const isEmpty = datesObject[x] === 0;
        if (isEmpty && y === 0 && i > 0) {
            const prevElem = data[i - 1];
            return {
                ...elem,
                y: prevElem ? prevElem.y : 0
            };
        }
        return {
            ...elem
        };
    });
};

const insertGuardiansByDate = (slices: PosOverviewSlice[], unit: ChartUnit, dates: any, order: any) => {
    const datesInUse: any = [];
    const latestDate = moment.unix(slices[0].block_time).valueOf();
    const now = moment().valueOf();
    const diff = getDifferenceBetweenDates(now, latestDate);
    slices.forEach(({ block_time, data, total_weight }: PosOverviewSlice) => {
        const blockDate = moment.unix(block_time).add(diff, 'days').unix();

        const sliceDate = returnDateNumber(blockDate, unit);
        if (!sliceDate) return;
        if (!dates.hasOwnProperty(sliceDate)) return;
        if (datesInUse.includes(sliceDate)) return;
        datesInUse.push(sliceDate);
        const dateInString = converFromNumberToDate(sliceDate, unit, DATE_FORMAT);
        data.forEach(({ address, weight }: PosOverviewData, i: number) => {
            const percent = (weight * 100) / total_weight;
            const guardianObject = {
                x: dateInString,
                y: percent
            };
            const index = order[address].data.findIndex((i: any) => i.x === dateInString);
            if (index < 0) return;
            order[address].data.splice(index, 1, guardianObject);
            order[address].data = filledEmptyData(order[address].data, order);
        });
    });
    return order;
};

export const getOverviewChartData = (guardians: Guardian[], dates: any, unit: ChartUnit, overviewData: PosOverview) => {
    const { slices } = overviewData;
    const NewestSlice = getNewestSlice(slices);
    let order = getGuardiansOrder(guardians, NewestSlice, 'weight', unit, dates);
    order = insertGuardiansByDate(slices, unit, dates, order);
    const obj = {
        data: generateDataset(order),
        unit
    };
    return obj;
};
export const getWeightsChartData = (guardians: Guardian[], type: ChartUnit, overviewData?: PosOverview) => {
    if (!overviewData) return;
    let data;
    switch (type) {
        case ChartUnit.MONTH:
            const months = generateMonths(OVERVIEW_CHART_LIMIT);
            data = getOverviewChartData(guardians, months, ChartUnit.MONTH, overviewData);
            break;
        case ChartUnit.WEEK:
            const weeks = generateWeeks(OVERVIEW_CHART_LIMIT);
            data = getOverviewChartData(guardians, weeks, ChartUnit.WEEK, overviewData);
            break;
        case ChartUnit.DAY:
            const days = generateDays(OVERVIEW_CHART_LIMIT);
            data = getOverviewChartData(guardians, days, ChartUnit.DAY, overviewData);
            break;
        default:
            break;
    }
    return data;
};
