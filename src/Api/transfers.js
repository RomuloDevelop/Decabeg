import { executeRequest } from './axiosInstance';
import {
    getUrlEncodedParams,
    mergeUserData
} from '../helpers';

async function sendTransferToUser(receptor, amount, concept='Sin concepto'){
    try{
        const dataToTransfer = { type_receptor:'username',receptor, amount, concept};
        const formBody = getUrlEncodedParams(dataToTransfer);
        console.log(formBody);
        const response = await executeRequest('post', `transfers`, formBody);
        console.log(response.data);
        const data = response.data.resource.transfer;
        mergeUserData({balance:data.current_balance});
        return data;
    } catch(ex){
        throw ex;
    }
}

async function sendGetTransferInfo(nro=1,order='asc'){
    try{
        const response = await executeRequest('get', `transfers/page/${nro}/date-order/${order}`);
        console.log(response.data);
        const data = response.data.resource.transfer;
        return data;
    } catch(ex){
        throw ex;
    }
}

async function sendReport(){
    try{
        const formBody = getUrlEncodedParams({send_email: true});
        const response = await executeRequest('post', `transfers/send_report`,formBody);
        console.log(response.data);
        return response.data;
    } catch(ex){
        throw ex;
    }
}

export{
    sendTransferToUser,
    sendGetTransferInfo,
    sendReport
}