import {executeRequest} from './axiosInstance';
import {
    setUserData,
    mergeUserData,
    getUrlEncodedParams
} from '../helpers';

async function sendGetUserData() {
    try{
        console.log('GetUser');
        const response = await executeRequest('get', `users`);
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
        await mergeUserData(userData);
        return response.data;
    } catch(ex){
        throw ex;
    }
}

export{
    sendGetUserData,
    sendUpdateUserData
}