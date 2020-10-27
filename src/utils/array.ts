import moment from 'moment';

export const sortByDate = (arr: any) => {
    if (!arr) return;
    return arr.sort((a: any, b: any) => {
        return moment(a.x, 'DD/MM/YYYY').diff(moment(b.x, 'DD/MM/YYYY'));
    });
};
