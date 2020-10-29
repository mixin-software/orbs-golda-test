export const routes = {
    overview: {
        main: '/overview/:section?',
        stake: '/overview/stake',
        weights: '/overview/weights'
    },
    guardians: {
        main: '/guardians/:section?/:address?',
        stake: '/guardians/stake/:address?',
        rewards: '/guardians/rewards/:address?',
        delegators: '/guardians/delegators/:address?'
    },
    delegators: {
        main: '/delegators/:section?/:address?',
        stake: '/delegators/stake/:address?',
        rewards: '/delegators/rewards/:address?',
        actions: '/delegators/actions/:address?'
    }
};
