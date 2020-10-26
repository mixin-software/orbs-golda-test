import { getDelegator, getGuardian, getGuardians } from '@orbs-network/pos-analytics-lib';

class Api {
    ethereumEndpoint = 'https://mainnet.infura.io/v3/9679dc4f2d724f7997547f05f769d74e';
    nodeEndpoints = [
        'http://54.168.36.177/services/management-service/status',
        'http://52.20.37.155/services/management-service/status',
        'http://54.241.122.39/services/management-service/status'
    ];
    async getDelegatorApi(address: string) {
        try {
            const res = await getDelegator(address, this.ethereumEndpoint);
            return res;
        } catch (error) {
            return undefined;
        }
    }

    async getGuardianApi(address: string) {
        try {
            const res = await getGuardian(address, this.ethereumEndpoint);
            return res;
        } catch (error) {
            return undefined;
        }
    }

    async getGuardiansApi() {
        try {
            const res = await getGuardians(this.nodeEndpoints);
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
export const api = new Api();
