import { Guardian, GuardianInfo } from '@orbs-network/pos-analytics-lib';

export interface GuardiansState {
    selectedGuardian?: GuardianInfo;
    guardians?: GuardianInfo[];
    guardianNotFound: boolean;
    guardianIsLoading: boolean;
}
