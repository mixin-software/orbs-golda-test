import { GuardiansState } from '../types/guardians-types';
import { types } from '../types/types';

const initialState: GuardiansState = {
    selectedGuardian: undefined,
    guardians: undefined,
    guardianNotFound: false,
    guardianIsLoading: false
};

export const guardiansReducer = (state = initialState, { payload, type }: any): GuardiansState => {
    switch (type) {
        case types.SET_GUARDIAN:
            return {
                ...state,
                selectedGuardian: payload
            };
        case types.SET_GUARDIANS:
            return {
                ...state,
                selectedGuardian: payload
            };
        case types.GUARDIAN_NOT_FOUND:
            return {
                ...state,
                guardianNotFound: payload
            };
        case types.GUARDIAN_LOADING:
            return {
                ...state,
                guardianIsLoading: payload
            };
        default:
            return state;
    }
};
