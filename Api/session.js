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
        const response = await executeRequest('post', `sessions/`, formBody, {});
        const data = response.data;
        const token = data.resource["api_token"];
        //const expiration = data.information["expiration_time_unix"];
        //await setAppToken(token, expiration);
        await setAppToken(token);
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
        const response = await executeRequest('patch', `sessions/`);
        const data = response.data;
        const newtoken = data.resource.session['api_token'];
        const expiration = data.information['expiration_time_unix'];
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
    sendForgotPassword
}