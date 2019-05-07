import {executeRequest} from './axiosInstance';
import {
    getFunctionName
} from '../helpers';

async function sendGetUserReferrals(){
    try{
        const response = await executeRequest('get', `users/referrals/`);
        const data = response.data.resource.referrals;
        return data
    } catch(ex){
        throw ex;
    }
}

async function sendDeleteUserReferrals(referralId){
    try{
        const response = await executeRequest('delete',`users/referrals/${referralId}/`);
        const data = response.data;
        return data;
    } catch(ex){
        throw ex;
    }
}
export {
    sendGetUserReferrals,
    sendDeleteUserReferrals
}