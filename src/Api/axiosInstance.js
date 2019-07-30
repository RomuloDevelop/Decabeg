import { ToastAndroid } from 'react-native';
//import NetInfo from "@react-native-community/netinfo"
import axios from 'axios';
import { getFunctionName, getAppToken, setAppToken, clearData, setNavigatorDispatch } from '../helpers';
const tokenExpirationTimes = 0;
const baseURL = 'https://api-dicabeg.herokuapp.com/api/';
const axiosInstance = axios.create({
    baseURL,
    timeout: 0
});

async function executeRequest(type, uri, data, setHeaders){
    try{
        // const isConnected = await NetInfo.isConnected.fetch();
        // if(!isConnected) throw "No conectado";
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
        return responseError(ex, getFunctionName(arguments), {type, uri, data, setHeaders});
    }
}

function responseError(error, method, requestData){
  if (error.response) {
    console.log('response error');
    console.log(error.response.headers);
    console.log(error.response.data);
    if(error.message.data.description === 'Expired Token') {
        expiredToken(requestData)
    } else
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

function expiredToken(requestData){
    try{
        tokenExpirationTimes += 1;
        if(tokenExpirationTimes === 2){
            tokenExpirationTimes = 0;
            throw new Error("Fin sesion");
        }
        await sendUserResetToken();
        await executeRequest(requestData.type, requestData.uri, requestData.data, requestData.setHeaders)
    } catch(ex){
        appAlert('Fin de sesion','Su sesion expiro');
        await clearData();
        setNavigatorDispatch();
    }
}

async function sendUserResetToken(){
    try{
        const response = await executeRequest('post', `accounts/login/refresh`);
        const data = response.data;
        console.log(data);
        const token = data.information.access_data.access_token;
        const refresh = data.information.access_data.refresh_token;
        const expiration = data.information.access_data.expiration_date_unix;//parseFloat(moment().add(30,'minutes').format('X'));
        const timeZone = data.information.access_data.time_zone;
        await setAppToken(token, refresh, expiration, timeZone);
        return data;
    } catch(ex){
        throw ex;
    }
}

export { executeRequest }
export default axiosInstance;