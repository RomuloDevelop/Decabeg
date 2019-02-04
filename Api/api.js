import { AsyncStorage } from "react-native"
const globalErrorMessage = 'Operation failed';
let myHeaders = new Headers();
const url = 'https://api-dicabeg.herokuapp.com/v1/';
export async function getVideos(){
    try {
        const miInit = { 
            method: 'GET',
            headers: myHeaders
        };
        const data = await fetch('./data');
        const dataJson = await checkResponse(data,'getVideos', globalErrorMessage);
        console.log('getVideos:' + dataJson);
        return dataJson;
    } catch(ex){
        throw ex;
    }
}
//{user, password}
export async function sendUserLogin(user){
    try{
        const formBody = Object.keys(user).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(user[key])).join('&'); 
        console.log(formBody);
        const uriLogin = `${url}users/accounts/`;
        console.log(uriLogin);
        const myInit = {
            method: 'POST', // or 'PUT'
            body: formBody, // data can be `string` or {object}!
            headers:{ 
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const response = await fetch(uriLogin, myInit);
        return await checkResponse(response, getFunctionName(arguments), globalErrorMessage);
    } catch(ex){
        throw ex
    }
}

export async function sendUserSignUp(user){
    try{
        const formBody = Object.keys(user).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(user[key])).join('&'); 
        const myInit = {
            method: 'PUT', // or 'PUT'
            body: formBody, // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const response = await fetch(url, myInit);
        return await checkResponse(response, getFunctionName(arguments), globalErrorMessage);
    } catch(ex){
        throw checkResponse(null, getFunctionName(arguments), globalErrorMessage);
    }
}


export async function sendForgotPassword(email) {
    try{        
        const myInit = {
            method: 'PUT', // or 'PUT'
            body: email, // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const response = await fetch(url, myInit);
        return await checkResponse(response, getFunctionName(arguments), globalErrorMessage);
    } catch(ex){

    }
}

async function checkResponse(response, method, message){
    if(response.ok)
        return await response.json();
    else
        throw {
            method,
            message
        }
}

function getFunctionName(arg){
    console.log(arg);
    let myName = arg.callee.toString();
    myName = myName.substr('function '.length);
    myName = myName.substr(0, myName.indexOf('('));
    return myName;
}