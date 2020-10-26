import moment from 'moment';

export const generateMonths = (limit: number, format?: string) => {
    let dates: any = {};
    for (let i = 0; i <= limit; i++) {
        const month = moment().subtract(i, 'month').format(format);
        dates[month] = [];
    }
    return dates;
};
