import { Guardian, PosOverview, PosOverviewData, PosOverviewSlice } from '@orbs-network/pos-analytics-lib';
import { TFunction } from 'i18next';
import { ChartUnit, OverviewSections } from '../../global/enums';
import { BarChartDataset, MenuOption, OverviewChartData, OverviewChartObject } from '../../global/types';
import { routes } from '../../routes/routes';
import { converFromNumberToDate, generateDays, generateMonths, generateWeeks, returnDateNumber } from '../dates';
import { sortByDate, sortByNumber } from '../array';
import { overviewguardiansColors } from '../../ui/colors';
import { DATE_FORMAT, OVERVIEW_CHART_LIMIT } from '../../global/variables';

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

const generateData = (dates: any, unit: ChartUnit) => {
    if (!dates) return;
    let data: any = [];
    Object.keys(dates).map((key) => {
        const obj = {
            x: converFromNumberToDate(Number(key), unit, 'DD/MM/YYYY'),
            y: 0
        };
        data.push(obj);
    });
    return data;
};

export const getGuardiansOrder = (
    guardians: Guardian[],
    NewestSlice: PosOverviewSlice,
    propertyName: string,
    unit: ChartUnit,
    dates?: any
) => {
    const { data } = NewestSlice;
    const sortedGuardians = sortByNumber(data, propertyName);
    const guardiansObject: any = {};
    const colors = getGuardianColor(sortedGuardians.length);
    sortedGuardians.forEach((guardian: BarChartDataset, index: number) => {
        const obj = {
            order: index,
            backgroundColor: colors[index],
            label: guardian.name,
            data: generateData(dates, unit),
            maxBarThickness: 30,
            hoverBackgroundColor: undefined
        };
        guardiansObject[guardian.address] = obj;
    });
    console.log(guardiansObject);
    return guardiansObject;
};

// export const reorderGuardians = (data: PosOverviewData[], orderObject: any): PosOverviewData[] => {
//     return data.sort((a: PosOverviewData, b: PosOverviewData) => {
//         return orderObject[a.address] - orderObject[b.address];
//     });
// };

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
