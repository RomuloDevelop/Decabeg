import {
    getAppToken, 
    setAppToken,
    mergeAppToken,
    setUserData,
    mergeUserData
} from '../dataStore/sessionData';
import {
    checkResponse,
    getFunctionName,
    getUrlEncodedParams
} from './helpers';

const globalErrorMessage = 'Operation failed';
const url = 'https://api-dicabeg.herokuapp.com/v1/';

export async function sendUserLogOut(){
    try{
        const {token, id} = await getAppToken();
        console.log(`${token} ${id}`);
        const uriData = `${url}sessions/${id}/`   
        const myInit = {
            method: 'DELETE',
            headers:{
                'Api-Token':`${token}`
            }
        };
        const response = await fetch(uriData, myInit);
        let data; 
        if(response.ok){
            data = await response.json();
        } else { 
            const error = await response.json();
            console.log(error);
            const message = `Error:${error.description}, status:${error.status}`
            throw message;
        }
        return checkResponse(data, getFunctionName(arguments), globalErrorMessage);
    } catch(ex){
        console.log(ex);
        return checkResponse(null, getFunctionName(arguments), ex);
    }
}
export async function sendUserLogin(user, userData){
    try{
        console.log('login');
        const {email, password} = user;
        const formBody = getUrlEncodedParams({email, password});
        console.log(formBody);
        const uriLogin = `${url}sessions/`;
        console.log(uriLogin);
        const myInit = {
            method: 'POST', // or 'PUT'
            body: formBody, // data can be `string` or {object}!
            headers:{ 
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const response = await fetch(uriLogin, myInit);
        let data;
        if(response.ok){
            data = await response.json();
            //showObject(data);
            console.log('iniciado');
            const token = data.resource.session["api_token"];
            const id = data.resource.session.user_id;
            const expiration = data.information["expiration_time_unix"];
            await setAppToken(token, expiration, id);
            console.log('Login:' + JSON.stringify(data));
            if(userData){ //Inicia sesion por primera ves en google, facebook
                console.log('primera ves');
                await sendGetUserData();
                //await sendUpdateUserData(userData);
            } else {
                await sendGetUserData();
            }
        } else {
            const error = await response.json();
            const message = `Error:${error.description}, Status:${error.status}`;
            throw message;
        }
        return checkResponse(data, getFunctionName(arguments), globalErrorMessage);
    } catch(ex){
        throw checkResponse(null, getFunctionName(arguments), ex);
    }
}

export async function sendUserResetToken(){
    try{
        const {token, id} = await getAppToken(); 
        const uriLogin = `${url}sessions/`;
        console.log(uriLogin);
        const myInit = {
            method: 'PATCH',
            headers:{ 
                'Api-Token': `${token}`
            }
        };
        const response = await fetch(uriLogin, myInit);
        let data;
        if(response.ok){
            data = await response.json();
            const token = data.resource.session['api_token'];
            const expiration = data.information['expiration_time_unix'];
            mergeAppToken({token, expiration});
        } else {
            const error = await response.json();
            const message = `Error:${error.description}, Status:${error.status}`;
            throw message;
        }
        return checkResponse(data, getFunctionName(arguments), globalErrorMessage);
    } catch(ex){
        throw checkResponse(null, getFunctionName(arguments), ex);
    }
}

export async function sendUserSignUp(user){
    try{
        console.log('Singup');
        const formBody = getUrlEncodedParams(user);
        const uriLogin = `${url}users/`;
        const myInit = {
            method: 'POST', // or 'PUT'
            body: formBody, // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        
        const response = await fetch(uriLogin, myInit);
        let data;
        if(response.ok){
            data = await response.json();
        } else{
            const error = await response.json();
            const message = `Error:${error.description}, status:${error.status}`;
            throw message;
        }
        console.log('SingUp:' + JSON.stringify(data));
        return checkResponse(data, getFunctionName(arguments), globalErrorMessage);
    } catch(ex){
        throw checkResponse(null, getFunctionName(arguments), ex);
    }
}

export async function sendForgotPassword(user) {
    try{
        const {token, id} = await getAppToken();        
        const formBody = getUrlEncodedParams(user);
        const uriLogin = `${url}users/${id}/accounts/`;
        const myInit = {
            method: 'PUT', // or 'PUT'
            body: formBody, // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const response = await fetch(url, myInit);
        let data;
        if(response.ok){
            data = await response.json();
        } else
            console.log(await response.json());
        console.log('Data SingUp:' + JSON.stringify(data));
        return checkResponse(data, getFunctionName(arguments), globalErrorMessage);
    } catch(ex){
        throw checkResponse(null, getFunctionName(arguments), ex);
    }
}

export async function sendGetUserData() {
    try{
        console.log('GetUser');
        const {token, id} = await getAppToken();
        console.log(`Token: ${token} ${id}`)
        const uriData = `${url}users/${id}/`   
        const myInit = {
            method: 'GET',
            headers:{
                'Api-Token': `${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const response = await fetch(uriData, myInit);
        let data; 
        if(response.ok){
            data = await response.json();
            console.log(`GetData: ${JSON.stringify(data)}`)
            await setUserData(data.resource.user);
        } else {
            const error = await response.json();
            const message = `Error:${error.description}, status:${error.status}`;
            throw message;
        }
        return checkResponse(data, getFunctionName(arguments), globalErrorMessage);
    } catch(ex){
        return checkResponse(null, getFunctionName(arguments), ex);
    }
}

export async function sendUpdateUserData(userData){
    try{
        console.log('update');
        const {token, id} = await getAppToken();
        console.log(`Token: ${token} ${id}`);
        //Form Data
        // const formData = new FormData();  
        // for(name in userData) {
        //     if(name !== 'image') formData.append(name, userData[name]);
        //     else formData.append(name, { uri: userData[name], name: `${id}.jpg`, type: 'image/jpg' });
        // }
        
        //
        const formBody = getUrlEncodedParams(userData);
        console.log(formBody);
        const uriData = `${url}users/${id}/`;
        const myInit = {
            method: 'PATCH',
            headers:{
                'Api-Token': `${token}`,
                //'Content-Type': 'multipart/form-data;'
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            ///body: formData
            body:formBody
        };
        const response = await fetch(uriData, myInit);
        let data; 
        if(response.ok){
            data = await response.json();
            console.log(`Update: ${JSON.stringify(data)}`);
            await mergeUserData(userData);
        } else {
            const error = await response.json();
            const message = `Error:${error.description}, status:${error.status}`;
            throw message;
        }
        return checkResponse(data, getFunctionName(arguments), globalErrorMessage);
    } catch(ex){
        return checkResponse(null, getFunctionName(arguments), ex);
    }
}

export async function sendGetVideos(){
    try{
        const {token, id} = await getAppToken();
        console.log(`Token: ${token} ${id}`);
        const uriData = `${url}videos/`;
        const myInit = {
            method: 'GET',
            headers:{
                'Api-Token': `${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const response = await fetch(uriData, myInit);
        let videos; //= require("./videos.json").resource.videos; 
        if(response.ok){
            const data = await response.json();
            videos = data.resource.videos;
            console.log(videos);
        } else {
            const error = await response.json();
            const message = `Error:${error.description}, status:${error.status}`;
            throw message;
        }
        return checkResponse(videos, getFunctionName(arguments), globalErrorMessage);
    } catch(ex){
        return checkResponse(null, getFunctionName(arguments), ex);
    }
}

export async function sendGetUserReferrals(){
    try{
        const {token, id} = await getAppToken();
        console.log(`Token: ${token} ${id}`);
        const uriData = `${url}users/${id}/referrals/`;
        const myInit = {
            method: 'GET',
            headers:{
                'Api-Token': `${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const response = await fetch(uriData, myInit);
        let data; 
        if(response.ok){
            const resource = await response.json();
            data = resource.resource.referrals;
            console.log(data);
        } else {
            const error = await response.json();
            const message = `Error:${error.description}, status:${error.status}`;
            throw message;
        }
        return checkResponse(data, getFunctionName(arguments), globalErrorMessage);
    } catch(ex){
        return checkResponse(null, getFunctionName(arguments), ex);
    }
}

export async function sendDeleteUserReferrals(referralId){
    try{
        const {token, id} = await getAppToken();
        console.log(`Token: ${token} ${id}`);
        const uriData = `${url}users/${id}/referrals/${referralId}/`;
        const myInit = {
            method: 'DELETE',
            headers:{
                'Api-Token': `${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const response = await fetch(uriData, myInit);
        let data; 
        if(response.ok){
            data = await response.json();
            mergeUserData({data}).catch((ex)=>checkResponse(data, getFunctionName(arguments), ex));
        }
        return checkResponse(data, getFunctionName(arguments), globalErrorMessage);
    } catch(ex){
        return checkResponse(null, getFunctionName(arguments), ex);
    }
}