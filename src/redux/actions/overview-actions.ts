import { Dispatch } from 'redux';
import { api } from '../../services/api';
import { types } from '../types/types';

export const getOverviewAction = () => async (dispatch: any) => {
    const overview = await api.getOverviewApi();
    if (!overview) return null;
    return dispatch({
        type: types.OVERVIEW.SET_OVERVIEW,
        payload: overview
    });
};

export const setOverviewChartData = (data: any) => async (dispatch: Dispatch) => {
    return dispatch({
        type: types.OVERVIEW.SET_CHART_DATA,
        payload: data
    });
};
