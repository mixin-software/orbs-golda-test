import { types } from '../types/types';

export const setDataToGlobalReducer = () => async (dispatch: any) => {
    console.log('lala');
    dispatch({
        type: types.SET_DATA_TO_GLOBAL_REDUCER
    });
};
