import { TFunction } from 'i18next';
import { routes } from '../routes/routes';
import deligatorsIcon from '../assets/images/overview-icon.svg';
import overviewIcon from '../assets/images/guardians-icon.svg';
import guardiansIcon from '../assets/images/deligators-icon.svg';
import { NavigationLink } from '../global/types';
import { Delegator, GuardianInfo } from '@orbs-network/pos-analytics-lib';

const getAddress = (obj?: Delegator | GuardianInfo) => {
    if (!obj) return '';
    const { address } = obj;
    if (!address) return '';
    return address;
};

export const generateNavigationLinks = (
    t: TFunction,
    delegator?: Delegator,
    guardian?: GuardianInfo
): NavigationLink[] => {
    return [
        {
            name: t('navigation.overview'),
            route: routes.overview,
            image: overviewIcon
        },
        {
            name: t('navigation.guardians'),
            route: routes.guardians.stake.replace(':address', getAddress(guardian)),
            image: guardiansIcon
        },
        {
            name: t('navigation.delegators'),
            route: routes.delegators.stake.replace(':address', getAddress(delegator)),
            image: deligatorsIcon
        }
    ];
};
