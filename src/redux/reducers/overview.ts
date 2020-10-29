import { OverviewState } from '../types/overview-types';
import { types } from '../types/types';

const initialState: OverviewState = {
    overviewData: undefined
};

export const overviewReducer = (state = initialState, { payload, type }: any): OverviewState => {
    switch (type) {
        case types.OVERVIEW.SET_OVERVIEW:
            return {
                ...state,
                overviewData: payload
            };

        default:
            return state;
    }
};
