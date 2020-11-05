import { getDelegator, getGuardian, getGuardians, getOverview } from '@orbs-network/pos-analytics-lib';
import axios from 'axios';
import { LOCAIZE_PROJECT_ID } from '../../global/variables';
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
            // const res = await getGuardians(this.nodeEndpoints);
            const res = require('../../data/guardians.json');
            return res;
        } catch (error) {
            return null;
        }
    }
    async getOverviewApi() {
        try {
            // const res = await getOverview(this.nodeEndpoints, this.ethereumEndpoint);
            const res = require('../../data/overview.json');
            return res;
        } catch (error) {
            return null;
        }
    }

    async getSupportedlanguages() {
        const res = await axios.get(`https://api.locize.app/languages/${LOCAIZE_PROJECT_ID}`);
        console.log(res);
    }
}

export const api = new Api();
