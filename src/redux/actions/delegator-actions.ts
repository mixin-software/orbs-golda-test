import { Delegator } from '@orbs-network/pos-analytics-lib';
import { api } from '../../services/api';
import { types } from '../types/types';

export const findDelegatorAction = (address: string) => async (dispatch: any) => {
    dispatch(clearDelegator());
    const delegator = await api.getDelegatorApi(address);
    dispatch(delegatorLoading(false));
    if (!delegator) {
        return dispatch(delegatorNotFound(true));
    }
    dispatch(setDelegator(delegator));
};

const clearDelegator = () => async (dispatch: any) => {
    dispatch({
        type: types.CLEAR_DELEGATOR
    });
    dispatch(delegatorLoading(true));
    dispatch(delegatorNotFound(false));
};

const setDelegator = (delegator: Delegator) => async (dispatch: any) => {
    dispatch({
        type: types.SET_DELEGATOR,
        payload: delegator
    });
};

export const delegatorLoading = (value: boolean) => async (dispatch: any) => {
    return dispatch({
        type: types.DELEGATOR_LOADING,
        payload: value
    });
};

export const delegatorNotFound = (value: boolean) => async (dispatch: any) => {
    return dispatch({
        type: types.DELEGATOR_NOT_FOUND,
        payload: value
    });
};
