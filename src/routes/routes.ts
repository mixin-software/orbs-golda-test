export const routes = {
    delegators: {
        main: '/delegators/:section?/:address?',
        stake: '/delegators/stake/:address?',
        rewards: '/delegators/rewards/:address?',
        actions: '/delegators/actions/:address?'
    },
    guardians: {
        main: '/guardians/:section?/:address?',
        stake: '/guardians/stake/:address?',
        rewards: '/guardians/rewards/:address?',
        delegators: '/guardians/delegators/:address?'
    },

    overview: '/overview'
};
