import { executeRequest } from './axiosInstance';
import { sendGetUserData, sendUpdateUserData } from './userdata';
import {
    setAppToken,
    getOneSignalId,
    mergeAppToken,
    setUserData,
    mergeUserData,
    getUrlEncodedParams
} from '../helpers';

async function sendUserLogOut(){
    try{
        const response = await executeRequest('delete' ,`users/`);
        return response.data;
    } catch(ex){
        console.log(ex);
        throw ex;
    }
}
async function sendUserLogin(user, userData){
    try{
        const {email, password} = user;
        const formBody = getUrlEncodedParams({email, password});
        console.log(formBody);
        const response = await executeRequest('post', `accounts/login`, formBody, {'Content-Type': 'application/x-www-form-urlencoded'});
        const data = response.data;
        const token = data.resource.token["api_token"];
        const expiration = data.resource.token["expiration_time"];
        await setAppToken(token, expiration);
        console.log('Login:' + JSON.stringify(data));
        if(userData){ //Inicia sesion por primera ves en google, facebook
            console.log('primera ves');
            await sendGetUserData();
            //await sendUpdateUserData(userData);
        } else {
            await sendGetUserData();
        }
        return data;
    } catch(ex){
        throw ex;
    }
}

async function sendUserResetToken(){
    try{
        const response = await executeRequest('post', `accounts/login/refresh`);
        const data = response.data;
        const newtoken = data.description['api_token'];
        const expiration = data.description['expiration_time'];
        mergeAppToken({token:newtoken, expiration});
        return data;
    } catch(ex){
        throw ex;
    }
}

async function sendUserSignUp(user){
    try{
        user.player_id = await getOneSignalId();
        const formBody = getUrlEncodedParams(user);
        const response = await executeRequest('post', `users`, formBody,{'Content-Type': 'application/x-www-form-urlencoded'});
        const data = response.data;
        console.log('SingUp:' + JSON.stringify(data));
        return data;
    } catch(ex){
        throw ex;
    }
}

async function sendUserActivation(temporal_code){
    try{
        const formBody = getUrlEncodedParams(temporal_code);
        const response = await executeRequest('post', `accounts/activation`, formBody,{'Content-Type': 'application/x-www-form-urlencoded'});
        const data = response.data;
        console.log('SingUp:' + JSON.stringify(data));
        return data;
    } catch(ex){
        throw ex;
    }
}

async function sendForgotPassword(email) {
    try{ 
        const formBody = getUrlEncodedParams(email);
        const response = executeRequest('post', `accounts/recovery`, formBody, {'Content-Type': 'application/x-www-form-urlencoded'});
        const data = response.data;
        console.log('Data Email:' + JSON.stringify(data));
    } catch(ex){
        throw ex;
    }
}

export{
    sendUserLogOut,
    sendUserLogin,
    sendUserResetToken,
    sendUserSignUp,
    sendUserActivation,
    sendForgotPassword
}