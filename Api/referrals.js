import {
    getAppToken
} from '../helpers/sessionData';
import {
    checkResponse,
    getFunctionName
} from '../helpers/generalFunctions';

const globalErrorMessage = 'Operation failed';
const url = 'https://api-dicabeg.herokuapp.com/v1/';

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
            //mergeUserData({data}).catch((ex)=>checkResponse(data, getFunctionName(arguments), ex));
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