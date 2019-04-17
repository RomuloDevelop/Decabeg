import {executeRequest} from './axiosInstance';
import {
    getAppToken,
    getFunctionName
} from '../helpers';

async function sendGetUserReferrals(){
    try{
        const {token, id} = await getAppToken();
        const response = await executeRequest('get', `users/${id}/referrals/`, token);
        const data = response.data.resource.referrals;
        return data
    } catch(ex){
        throw ex;
    }
}

async function sendDeleteUserReferrals(referralId){
    try{
        const {token, id} = await getAppToken();
        const response = await executeRequest('delete',`users/${id}/referrals/${referralId}/`,token);
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