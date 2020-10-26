import { Delegator } from '@orbs-network/pos-analytics-lib';

export interface DelegatorState {
    selectedDelegator?: Delegator;
    delegatorNotFound: boolean;
    delegatorIsLoading: boolean;
}
