import { DelegatorsSections, GuardiansSections } from './enums';

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
