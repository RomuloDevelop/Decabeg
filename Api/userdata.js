import {executeRequest} from './axiosInstance';
import {
    getAppToken,
    setUserData,
    mergeUserData,
    getUrlEncodedParams
} from '../helpers';

async function sendGetUserData() {
    try{
        console.log('GetUser');
        const {token, id} = await getAppToken();
        console.log(`Token: ${token} ${id}`)
        const response = await executeRequest('get', `users/${id}/`, token);
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
        const {token, id} = await getAppToken();
        console.log(`Token: ${token} ${id}`);
        const formBody = getUrlEncodedParams(userData);
        console.log(formBody);
        const response = await executeRequest('patch', `users/${id}/`, token, formBody);
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