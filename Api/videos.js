import {executeRequest} from './axiosInstance';
import {
    getFunctionName
} from '../helpers';

export async function sendGetVideos(){
    try{
        console.log(`Token: ${token}`);
        const response = await executeRequest('get', `videos/`);
        const data = response.data.resource.videos;
        return data;
    } catch(ex){
        return ex;
    }
}