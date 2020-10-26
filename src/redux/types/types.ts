import { AuthState } from './auth-types';
import { DelegatorState } from './delegator-types';
import { GuardiansState } from './guardians-types';

export const types = {
    SET_DATA_TO_GLOBAL_REDUCER: 'SET_DATA_TO_GLOBAL_REDUCER',
    LOGIN: 'LOGIN',
    SET_DELEGATOR: 'SET_DELEGATOR',
    DELEGATOR_NOT_FOUND: 'DELEGATOR_NOT_FOUND',
    DELEGATOR_LOADING: 'DELEGATOR_LOADING',
    SET_GUARDIANS: 'SET_GUARDIANS',
    SET_GUARDIAN: 'SET_GUARDIAN',
    GUARDIAN_NOT_FOUND: 'GUARDIAN_NOT_FOUND',
    GUARDIAN_LOADING: 'GUARDIAN_LOADING',
    CLEAR_DELEGATOR: 'CLEAR_DELEGATOR'
};

export interface AppState {
    auth: AuthState;
    delegator: DelegatorState;
    guardians: GuardiansState;
}
