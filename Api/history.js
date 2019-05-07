import { executeRequest } from './axiosInstance';

async function sendGetHistory(){
    try{
        const response = await executeRequest('get', `users/history/`);
        const data = response.data.resource.history;
        console.log(data);
        return data;
    } catch(ex) {
        throw ex;
    }
}

async function sendPostHistory(videoId){
    try{
        const response = await executeRequest('post', `users/history/${videoId}/`, token);
        const data = response.data.resource.history;
        return data;
    } catch(ex){
        throw ex;
    }
}

async function sendDeleteHistory(deleteAll, historyId){
    try {
        const uriData = deleteAll? `users/history/`:`users/history/${historyId}/`;
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
