import { Guardian } from '@orbs-network/pos-analytics-lib';
import { ChartColors, ChartUnit, ChartYaxis, DelegatorsSections, GuardiansSections, OverviewSections } from './enums';

export interface MenuOption {
    name: string;
    route: string;
    key: DelegatorsSections | GuardiansSections | OverviewSections;
    disabled?: boolean;
}

export interface NavigationLink {
    name: string;
    route: string;
    image: string;
    selectedImage: string;
}

export interface RouteParams {
    section: string;
    address?: string;
}

export interface GuardianDataset {
    delegators: number;
    ownDelegation: number;
    totalDelegation: number;
}

export interface ChartData {
    datasets: ChartDataset[];
    unit: ChartUnit;
}

export interface ChartDataset {
    data: ChartDatasetObject[];
    color: ChartColors;
    yAxis: ChartYaxis;
}

export interface ChartDatasetObject {
    x: string;
    y: number;
}

export interface SearchInputResultElement {
    name: string;
    address: string;
}

export interface OverviewChartObject {
    date: string;
    data: Guardian[];
}

export interface OverviewChartData {
    data: OverviewChartObject[];
    unit: ChartUnit;
}
