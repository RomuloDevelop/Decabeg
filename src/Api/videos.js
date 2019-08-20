import {executeRequest} from './axiosInstance';

export async function sendGetVideos(nro=1, order='asc'){
    try{
        const response = await executeRequest('get', `videos/page/${nro}/date-order/${order}`);
        console.log(response.data);
        const data = response.data.resource.video;
        return data;
    } catch(ex){
        return ex;
    }
}