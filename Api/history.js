import { executeRequest } from './axiosInstance';
import {getAppToken} from '../helpers';

async function sendGetHistory(){
    try{
        const {token, id} = await getAppToken();
        console.log(`Token: ${token} ${id}`);
        const response = await executeRequest('get', `users/${id}/history/`, token);
        const data = response.data.resource.history;
        return data;
    } catch(ex) {
        throw ex;
    }
}

async function sendPostHistory(videoId){
    try{
        const {token, id} = await getAppToken();
        console.log(`Token: ${token} ${id}`);
        const response = await executeRequest('post', `users/${id}/history/${videoId}/`, token);
        const data = response.data.resource.history;
        return data;
    } catch(ex){
        throw ex;
    }
}

async function sendDeleteHistory(deleteAll, historyId){
    try {
        const {token, id} = await getAppToken();
        console.log(`Token: ${token} ${id}`);
        const uriData = deleteAll? `users/${id}/history/`:`users/${id}/history/${historyId}/`;
        const response = await executeRequest('delete', uriData, token);
        return response;
    } catch(ex){
        throw ex;
    }
}

export {
    sendGetHistory,
    sendPostHistory,
    sendDeleteHistory
}
