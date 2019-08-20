import { executeRequest } from './axiosInstance';

async function sendGetHistory(nro=1, order = 'desc'){
    try{
        const response = await executeRequest('get', `history/page/${nro}/date-order/${order}`);
        const data = response.data.resource.history;
        console.log(data);
        return data;
    } catch(ex) {
        throw ex;
    }
}

async function sendPostHistory(videoId){
    try{
        const response = await executeRequest('post', `history/${videoId}`);
        const data = response.data.resource.history;
        return data;
    } catch(ex){
        throw ex;
    }
}

async function sendDeleteHistory(deleteAll, videoId){
    try {
        const uriData = deleteAll? `history`:`history/${videoId}`;
        const response = await executeRequest('delete', uriData);
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
