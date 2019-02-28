import {
    getAppToken
} from '../dataStore/sessionData';
import {
    checkResponse,
    getFunctionName
} from './helpers';

const globalErrorMessage = 'Operation failed';
const url = 'https://api-dicabeg.herokuapp.com/v1/';
export async function sendGetHistory(){
    try{
        const {token, id} = await getAppToken();
        console.log(`Token: ${token} ${id}`);
        const uriData = `${url}users/${id}/history/`;
        const myInit = {
            method: 'GET',
            headers:{
                'Api-Token': `${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const response = await fetch(uriData, myInit);
        let history; 
        if(response.ok){
            const data = await response.json();
            history = data.resource.history;
            console.log(history);
        } else {
            const error = await response.json();
            const message = `Error:${error.description}, status:${error.status}`;
            throw message;
        }
        return checkResponse(history, getFunctionName(arguments), globalErrorMessage);
    } catch(ex){
        return checkResponse(null, getFunctionName(arguments), ex);
    }
}

export async function sendPostHistory(videoId){
    try{
        const {token, id} = await getAppToken();
        console.log(`Token: ${token} ${id}`);
        const uriData = `${url}users/${id}/history/${videoId}/`;
        console.log(uriData);
        const myInit = {
            method: 'POST',
            headers:{
                'Api-Token': `${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const response = await fetch(uriData, myInit);
        let history;
        if(response.ok){
            const data = await response.json();
            console.log(data);
            history = data.resource.history;
        } else {
            const error = await response.json();
            const message = `Error:${error.description}, status:${error.status}`;
            throw message;
        }
        return checkResponse(history, getFunctionName(arguments), globalErrorMessage);
    } catch(ex){
        return checkResponse(null, getFunctionName(arguments), ex);
    }
}