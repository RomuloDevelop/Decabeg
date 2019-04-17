import {executeRequest} from './axiosInstance';
import {
    getAppToken,
    getFunctionName
} from '../helpers';

export async function sendGetVideos(){
    try{
        const {token, id} = await getAppToken();
        console.log(`Token: ${token} ${id}`);
        const response = await executeRequest('get', `videos/`, token);
        const data = response.data.resource.videos;
        return data;
    } catch(ex){
        return ex;
    }
}