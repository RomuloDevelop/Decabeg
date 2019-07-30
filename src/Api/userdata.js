import {executeRequest} from './axiosInstance';
import {
    setUserData,
    mergeUserData,
    getUrlEncodedParams,
    getOneSignalId,
    removeUpperAndSpaces
} from '../helpers';



async function sendGetUserData() {
    try{
        console.log('GetUser');
        const response = await executeRequest('get', `users`);
        console.log(response.data);
        const data = response.data.resource.user;
        await setUserData(data);
        return data;
    } catch(ex){
        throw ex;
    }
}

async function sendUpdateUserData(userData){
    try{
        console.log('update');
        const formBody = getUrlEncodedParams(userData);
        console.log(formBody);
        const response = await executeRequest('patch', `users`, formBody);
        console.log(`Update: ${JSON.stringify(response.data)}`);
        const user = response.data.resource.user;
        await mergeUserData(user);
        return response.data;
    } catch(ex){
        throw ex;
    }
}

async function sendUpdatePlayerId(activate){
    try{
        console.log('update');
        const id = activate?await getOneSignalId():null;
        const formBody = getUrlEncodedParams({player_id:id});
        console.log(formBody);
        const response = await executeRequest('patch', `users`, formBody);
        console.log(`Update: ${JSON.stringify(response.data)}`);
        return response.data;
    } catch(ex){
        throw ex;
    }
}

async function sendCodeForNewEmail(data){
    try{
        console.log('email code update');
        const new_email = removeUpperAndSpaces(data.new_email);
        const formBody = data.temporal_code?
        getUrlEncodedParams({new_email, temporal_code:data.temporal_code,send_email:true}):
        getUrlEncodedParams({new_email, send_email:true});
        console.log(formBody);
        const response = await executeRequest('put', `accounts/update/email`, formBody);
        console.log(`Update email: ${JSON.stringify(response.data)}`);
        return response.data;
    } catch(ex){
        throw ex;
    }
}

async function sendCodeForNewPassword(data={}){
    try{
        console.log('email code update');
        const formBody = data.temporal_code?
        getUrlEncodedParams({new_password:data.new_password, temporal_code:data.temporal_code,send_email:true}):
        getUrlEncodedParams({send_email:true});
        console.log(formBody);
        const response = await executeRequest('put', `accounts/update/password`, formBody);
        console.log(`Update password: ${JSON.stringify(response.data)}`);
        return response.data;
    } catch(ex){
        throw ex;
    }
}
export{
    sendGetUserData,
    sendUpdateUserData,
    sendUpdatePlayerId,
    sendCodeForNewEmail,
    sendCodeForNewPassword
}