import { TFunction } from 'i18next';
import { GuardianDataset, MenuOption } from '../global/types';
import { routes } from '../routes/routes';
import { GuardiansSections } from '../global/enums';
import { Guardian, GuardianInfo, GuardianStake } from '@orbs-network/pos-analytics-lib';
import { generateMonths } from './dates';
import { STACK_GRAPH_MONTHS_LIMIT } from '../global/variables';
import moment from 'moment';
export const generateGuardiansRoutes = (t: TFunction, guardian?: GuardianInfo): MenuOption[] => {
    const address = guardian ? guardian.address : '';
    return [
        {
            name: t('main.stake'),
            route: routes.guardians.stake.replace(':address', address),
            key: GuardiansSections.STAKE
        },
        {
            name: t('main.rewards'),
            route: routes.guardians.rewards.replace(':address', address),
            key: GuardiansSections.REWARDS,
            disabled: true
        },
        {
            name: t('main.delegetors'),
            route: routes.guardians.delegators.replace(':address', address),
            key: GuardiansSections.DELEGATORS
        }
    ];
};

export const checkIfLoadDelegator = (address?: string, guardian?: GuardianInfo): boolean => {
    if (!address) return false;
    if (guardian && guardian.address === address) return false;
    return true;
};

export const sortGuardianStakeDataMonths = (guardian?: GuardianInfo) => {
    if (!guardian) return;
    const { stake_slices } = guardian;
    if (!stake_slices) return;
    console.log(stake_slices);
    const dates = generateMonths(STACK_GRAPH_MONTHS_LIMIT);
    stake_slices.map((slice: GuardianStake) => {
        const { self_stake, n_delegates, delegated_stake, block_time } = slice;
        const month = moment.unix(block_time).format('MMM');
        if (!dates.hasOwnProperty(month)) return;

        let delegators = dates[month].delegators || 0 + n_delegates;
        let ownDelegation = dates[month].ownDelegation || 0 + self_stake;
        let totalDelegation = dates[month].totalDelegation || 0 + delegated_stake;
        dates[month].delegators = delegators;
        dates[month].ownDelegation = ownDelegation;
        dates[month].totalDelegation = totalDelegation;
    });
    return Object.keys(dates)
        .reverse()
        .map((key) => {
            return {
                month: moment().month(key).format('MMM'),
                data: dates[key] || null
            };
        });
};

export const createDatasets = (datasets: GuardianDataset[]) => {
    const arr = datasets.map((dataset: GuardianDataset) => {
        console.log(dataset);
        return {
            label: '',
            fill: false,
            lineTension: 0,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: '#74DABF',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#74DABF',
            pointBackgroundColor: '#74DABF',
            pointBorderWidth: 6,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: 0
        };
    });
};
