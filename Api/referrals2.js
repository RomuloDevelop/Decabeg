import axios from 'axios';
import {
    getAppToken,
    checkResponse,
    getFunctionName
} from '../helpers';

const baseURL = 'https://api-dicabeg.herokuapp.com/v1/';

const axiosInstance = axios.create({
    baseURL
})

export async function sendGetUserReferrals(){
    try{
        const {token, id} = await getAppToken();
        const response = await axiosInstance.get(`users/${id}/referrals/`,{
            headers:{
                'Api-Token': `${token}`
            }
        });
        const data = response.data.resource.referrals;
        return data
    } catch(ex){
        throw ex;
    }
}

export async function sendDeleteUserReferrals(referralId){
    try{
        const {token, id} = await getAppToken();
        const response = await axiosInstance.get(`users/${id}/referrals/${referralId}/`,{
            headers:{
                'Api-Token': `${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const data = response.data;
        return data;
    } catch(ex){
        return ex;
    }
}