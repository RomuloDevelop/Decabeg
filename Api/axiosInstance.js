//@flow
import type {RequestType} from 'api-module';
import axios from 'axios';
import { responseError, getFunctionName } from '../helpers';

const baseURL = 'https://api-dicabeg.herokuapp.com/v1/';
const axiosInstance = axios.create({
    baseURL
});

async function executeRequest(type: RequestType, uri: string, token: string, data: any, setHeaders: any){
    try{
        const headers = (setHeaders)?setHeaders:{
            'Api-Token': `${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        const config = {headers};
        switch (type){
            case 'get':
                return await axiosInstance.get(uri,config);
            case 'delete':
                return await axiosInstance.delete(uri,config);
            case 'post':
                return await axiosInstance.post(uri,data,config);
            case 'put':
                return await axiosInstance.post(uri,data,config);
            case 'patch':
                return await axiosInstance.patch(uri,data,config);
        }
    } catch(ex){
        return responseError(ex, getFunctionName(arguments));
    }
}
export { executeRequest }
export default axiosInstance;