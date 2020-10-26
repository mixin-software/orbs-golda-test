import { AuthState } from '../types/auth-types';
import { DelegatorState } from '../types/delegator-types';
import { types } from '../types/types';

const initialState: DelegatorState = {
    selectedDelegator: undefined,
    delegatorNotFound: false,
    delegatorIsLoading: false
};

export const delegatorReducer = (state = initialState, { payload, type }: any): DelegatorState => {
    switch (type) {
        case types.SET_DELEGATOR:
            return {
                ...state,
                selectedDelegator: payload
            };
        case types.DELEGATOR_LOADING:
            return {
                ...state,
                delegatorIsLoading: payload
            };
        case types.CLEAR_DELEGATOR:
            return {
                ...state,
                selectedDelegator: undefined
            };
        case types.DELEGATOR_NOT_FOUND:
            return {
                ...state,
                delegatorNotFound: payload,
                selectedDelegator: payload ? undefined : state.selectedDelegator
            };
        default:
            return state;
    }
};
