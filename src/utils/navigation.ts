import { TFunction } from 'i18next';
import { routes } from '../routes/routes';
import deligatorsIcon from '../assets/images/overview-icon.svg';
import overviewIcon from '../assets/images/guardians-icon.svg';
import guardiansIcon from '../assets/images/deligators-icon.svg';
import { NavigationLink } from '../global/types';
import { Delegator, GuardianInfo } from '@orbs-network/pos-analytics-lib';

import overviewImg from '../assets/images/navigation/overview.svg';
import overviewSelectedImg from '../assets/images/navigation/overview-selected.svg';

import guardiansImg from '../assets/images/navigation/guardians.svg';
import guardiansSelectedImg from '../assets/images/navigation/guardians-selected.svg';

import delegatorsImg from '../assets/images/navigation/delegators.svg';
import delegatorsSelectedImg from '../assets/images/navigation/delegators-selected.svg';

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
            route: routes.overview.stake,
            image: overviewImg,
            selectedImage: overviewSelectedImg
        },
        {
            name: t('navigation.guardians'),
            route: routes.guardians.stake.replace(':address', getAddress(guardian)),
            image: guardiansImg,
            selectedImage: guardiansSelectedImg
        },
        {
            name: t('navigation.delegators'),
            route: routes.delegators.stake.replace(':address', getAddress(delegator)),
            image: delegatorsImg,
            selectedImage: delegatorsSelectedImg
        }
    ];
};
