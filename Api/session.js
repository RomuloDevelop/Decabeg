import { executeRequest } from './axiosInstance';
import { sendGetUserData, sendUpdateUserData } from './userdata';
import {
    setAppToken,
    mergeAppToken,
    setUserData,
    getUrlEncodedParams,
    getOneSignalId
} from '../helpers';

import moment from 'moment';

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
        const data = response.data.resource.accounts;
        const token = data.access_token;
        const refresh = data.refresh_token;
        const expiration = data.expiration_date;//parseFloat(moment().add(30,'minutes').format('X'));
        const timeZone = data.time_zone;
        await setAppToken(token, refresh, expiration, timeZone);
        console.log('Login:' + JSON.stringify(data));
        //const player_id = await getOneSignalId();
        //await sendUpdateUserData({player_id});
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
        const token = data.description.access_token;
        const refresh = data.description.refresh_token;
        const expiration = data.description.expiration_date;//parseFloat(moment().add(30,'minutes').format('X'));
        const timeZone = data.description.time_zone;
        await setAppToken(token, refresh, expiration, timeZone);
        return data;
    } catch(ex){
        throw ex;
    }
}

async function sendUserSignUp(user){
    try{
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
        const formBody = getUrlEncodedParams({temporal_code});
        const response = await executeRequest('post', `accounts/activation`, formBody,{'Content-Type': 'application/x-www-form-urlencoded'});
        const data = response.data;
        console.log('SingUp:' + JSON.stringify(data));
        return data;
    } catch(ex){
        throw ex;
    }
}

async function sendForgotPassword(password) {
    try{
        const formBody = getUrlEncodedParams(password);
        const response = await executeRequest('post', `accounts/recovery`, formBody, {'Content-Type': 'application/x-www-form-urlencoded'});
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