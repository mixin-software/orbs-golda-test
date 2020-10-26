import { api } from '../../services/api';
import { types } from '../types/types';

export const getGuardianAction = (address: string) => async (dispatch: any) => {
    dispatch(setGuardianLoading(true));
    const guardian = await api.getGuardianApi(address);
    dispatch(setGuardianLoading(false));
    if (!guardian) {
        return dispatch(setGuardianNotFound(true));
    }
    dispatch({
        type: types.SET_GUARDIAN,
        payload: guardian
    });
};

export const getGuardiansAction = () => async (dispatch: any) => {
    const guardians = await api.getGuardiansApi();
    console.log(guardians);
    if (!guardians) return null;
    return dispatch({
        type: types.SET_GUARDIANS,
        payload: guardians
    });
};

export const setGuardianLoading = (value: boolean) => async (dispatch: any) => {
    return dispatch({
        type: types.GUARDIAN_LOADING,
        payload: value
    });
};

export const setGuardianNotFound = (value: boolean) => async (dispatch: any) => {
    return dispatch({
        type: types.GUARDIAN_NOT_FOUND,
        payload: value
    });
};
