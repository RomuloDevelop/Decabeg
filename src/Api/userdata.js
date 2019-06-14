import {executeRequest} from './axiosInstance';
import {
    setUserData,
    mergeUserData,
    getUrlEncodedParams,
    setOneSignalId,
    getOneSignalId
} from '../helpers';

async function sendGetUserData() {
    try{
        console.log('GetUser');
        const response = await executeRequest('get', `users`);
        const data = response.data.resource.users;
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
        const user = response.data.resource.users;
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

export{
    sendGetUserData,
    sendUpdateUserData,
    sendUpdatePlayerId
}