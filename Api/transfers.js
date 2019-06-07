import { executeRequest } from './axiosInstance';
import {
    getUrlEncodedParams,
    mergeUserData
} from '../helpers';

async function sendTransferToUser(username, amount, concept='Sin concepto'){
    try{
        const dataToTransfer = {username, amount, concept};
        const formBody = getUrlEncodedParams(dataToTransfer);
        console.log(formBody);
        const response = await executeRequest('post', `transfers`, formBody);
        const data = response.data.resource.transfers;
        mergeUserData({balance:transferResponse.current_balance});
        return data;
    } catch(ex){
        throw ex;
    }
}

async function sendGetTransferInfo(group=1){
    try{
        const response = await executeRequest('get', `transfers/group/${group}`);
        const data = response.data.resource.transfers;
        return data;
    } catch(ex){
        throw ex;
    }
}
export{
    sendTransferToUser,
    sendGetTransferInfo
}