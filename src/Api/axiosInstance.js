import { ToastAndroid } from 'react-native';
//import NetInfo from "@react-native-community/netinfo"
import axios from 'axios';
import { getFunctionName, getAppToken, setNavigatorToLogin } from '../helpers';

const baseURL = 'https://api-dicabeg.herokuapp.com/api/';
const axiosInstance = axios.create({
    baseURL,
    timeout: 0
});

async function executeRequest(type, uri, data, setHeaders){
    try{
        //const isConnected = await NetInfo.isConnected.fetch();
        //if(!isConnected) throw "Problema de conexión";
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

async function responseError(error, method){
  if (error.response) {
    console.log('response error');
    console.log(error.response.headers);
    console.log(error.response.data);
    if(error.response.data.description === "Expired token"){
        await setNavigatorToLogin();
        return;
    }
    throw {message:error.response.data, method};
  } else if (error.request){
    console.log('request error'); 
    throw {message:error.request, method};
  } else if(error.message) {
    console.log('message error');
    throw {message: error.message, method};
  }
  else if(error==="No conectado"){
    console.log('No conectado');
    ToastAndroid.showWithGravity(error,ToastAndroid.LONG,ToastAndroid.BOTTOM);
    throw error;
  }
  else throw error;
}

export { executeRequest }
export default axiosInstance;