import { getDelegator, getGuardian, getGuardians } from '@orbs-network/pos-analytics-lib';

class Api {
    ethereumEndpoint = 'https://mainnet.infura.io/v3/9679dc4f2d724f7997547f05f769d74e';
    nodeEndpoints = ['https://guardian.v2beta.orbs.com/services/management-service/status'];
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
            return res;
        } catch (error) {
            return null;
        }
    }
}
export const api = new Api();
