//@flow
import { ToastAndroid } from 'react-native';
import NetInfo from "@react-native-community/netinfo"
import type {RequestType} from 'api-module';
import axios from 'axios';
import { getFunctionName, getAppToken } from '../helpers';

const baseURL = 'https://api-dicabeg.herokuapp.com/v2/';
const axiosInstance = axios.create({
    baseURL
});

async function executeRequest(type: RequestType, uri: string, data: any, setHeaders: any){
    try{
        const isConnected = await NetInfo.isConnected.fetch();
        if(!isConnected) throw "No connected";
        let headers;
        if(setHeaders)
            headers = setHeaders;
        else {
            const {token} = await getAppToken();
            console.log(`token: ${token}`);
            headers = {
                'access-token': `${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        const config = {headers};
        switch (type){
            case 'get':
                return await axiosInstance.get(uri,config);
            case 'delete':
                return await axiosInstance.delete(uri,config);
            case 'post':
                return await axiosInstance.post(uri,data,config);
            case 'put':
                return await axiosInstance.put(uri,data,config);
            case 'patch':
                return await axiosInstance.patch(uri,data,config);
        }
    } catch(ex){
        return responseError(ex, getFunctionName(arguments));
    }
}

function responseError(error, method){
  if (error.response) {
    console.log('response error');
    console.log(error.response.headers);
    console.log(error.response.data);
    throw {message:error.response.data, method};
  } else if (error.request){
    console.log('request error'); 
    throw {message:error.request, method};
  } else if(error.message) {
    console.log('message error');
    throw {message: error.message, method};
  }
  else if(error==="No connected"){
    console.log('No conectado');
    ToastAndroid.showWithGravity(error,ToastAndroid.LONG,ToastAndroid.BOTTOM);
    throw error;
  }
  else throw error;
}

export { executeRequest }
export default axiosInstance;