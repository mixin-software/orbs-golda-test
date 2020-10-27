import { ChartColors, ChartUnit, ChartYaxis, DelegatorsSections, GuardiansSections } from './enums';

export interface MenuOption {
    name: string;
    route: string;
    key: DelegatorsSections | GuardiansSections;
    disabled?: boolean;
}

export interface NavigationLink {
    name: string;
    route: string;
    image: string;
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
