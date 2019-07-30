import { executeRequest } from './axiosInstance';
import { sendGetUserData } from './userdata';
import {
    setAppToken,
    getUrlEncodedParams,
    removeUpperAndSpaces,
    setUserData
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
        const fixedEmail = removeUpperAndSpaces(email);
        const formBody = getUrlEncodedParams({email:fixedEmail, password});
        console.log(formBody);
        const response = await executeRequest('post', `accounts/login`, formBody, {'Content-Type': 'application/x-www-form-urlencoded'});
        console.log(response.data);
        const data = response.data.information.access_data;
        const token = data.access_token;
        const refresh = data.refresh_token;
        const expiration = data.expiration_date_unix;//parseFloat(moment().add(30,'minutes').format('X'));
        const timeZone = data.time_zone;
        await setAppToken(token, refresh, expiration, timeZone);
        console.log('Login:' + JSON.stringify(data));
        setUserData(response.data.information.user);
        // if(userData){ //Inicia sesion por primera ves en google, facebook
        //     await sendGetUserData();
        //     //await sendUpdateUserData(userData);
        // } else {
        //     await sendGetUserData();
        // }
        return data;
    } catch(ex){
        throw ex;
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

async function sendUserSignUp(user){
    try{
        const {email} = user;
        user.email = removeUpperAndSpaces(email);
        console.log(user);
        const formBody = getUrlEncodedParams(user);
        const response = await executeRequest('post', `users`, formBody,{'Content-Type': 'application/x-www-form-urlencoded'});
        const data = response.data;
        console.log('SingUp:' + JSON.stringify(data));
        return data;
    } catch(ex) {
        throw ex;
    }
}

async function sendUserActivation(temporal_code, email){
    try{
        const fixedEmail = removeUpperAndSpaces(email);
        const formBody = getUrlEncodedParams({temporal_code, email:fixedEmail, send_email:true});
        const response = await executeRequest('post', `accounts/activation`, formBody,{'Content-Type': 'application/x-www-form-urlencoded'});
        const data = response.data;
        console.log('SingUp:' + JSON.stringify(data));
        return data;
    } catch(ex){
        throw ex;
    }
}

async function sendUserActivationAgain(email) {
    try{
        const fixedEmail = removeUpperAndSpaces(email);
        const formBody = getUrlEncodedParams({email:fixedEmail, send_email:true});
        const response = await executeRequest('post', `accounts/resend_email`, formBody,{'Content-Type': 'application/x-www-form-urlencoded'});
        const data = response.data;
        console.log('SendingEmail:' + JSON.stringify(data));
        return data;
    } catch(ex){
        throw ex;
    }
}

async function sendForgotPassword(account) {
    try{
        let formBody;
        const fixedEmail = removeUpperAndSpaces(account.email);
        if(account.temporal_code){
            formBody = getUrlEncodedParams({email:fixedEmail, new_password:account.password, temporal_code:account.temporal_code,send_email:true})
        } else {
            formBody = getUrlEncodedParams({email:fixedEmail, send_email:true});
        }
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
    sendUserActivationAgain,
    sendForgotPassword
}