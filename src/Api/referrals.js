import {executeRequest} from './axiosInstance';
import {
    getFunctionName
} from '../helpers';

const fetchRefferals = [
    {
        username:'Jon Snow',
        email:'jonsnow23@email.com'
    },
    {
        username:'Cersei Lannister',
        email:'cerseileon23@email.com'
    },
]

async function sendGetUserReferrals(){
    try{
        //const response = await executeRequest('get', `users/referrals/`);
        const data = fetchRefferals;//response.data.resource.referrals;
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