import { PosOverview } from '@orbs-network/pos-analytics-lib';

export interface OverviewState {
    overviewData?: PosOverview;
    overviewChartData?: any;
    overviewDataLoding: boolean;
}
