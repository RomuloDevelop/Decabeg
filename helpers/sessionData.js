import { AsyncStorage } from "react-native";
import moment from 'moment';
const notFoundError = 'No data was found';
const tokenAppKey = 'tokenApp';
const userData = 'userData';
const userPicture = 'userPicture';
const showMessageFlag = 'showMessageFlag';
const oneSignalId = 'oneSignalId';
const firstTime = 'firstTime';
const configurationVars = 'configurationVars';
const agendaList = 'agendaList';
async function setAppToken(token, refresh, expiration, timeZone){
    try{
        const dataJson = JSON.stringify({token, refresh, expiration, timeZone});
        console.log('Saving data'+ dataJson);
        await AsyncStorage.setItem(tokenAppKey,dataJson);
    } catch(ex){
        throw ex;
    }
}

async function getAppToken(){
    try {
        const data = await AsyncStorage.getItem(tokenAppKey);
        if(data){
            return JSON.parse(data);
        } else {
            throw notFoundError;
        }
    } catch(ex){
        throw ex;
    }
}


async function mergeAppToken(data){
    try{
        const dataJson = JSON.stringify(data);
        await AsyncStorage.mergeItem(tokenAppKey,dataJson);
    } catch(ex){
        throw ex;
    }
}

async function setUserData(data){
    try{
        console.log('Saving data' + JSON.stringify(data));
        const jsonData = JSON.stringify(data)
        await AsyncStorage.setItem(userData,jsonData);
    } catch(ex){
        throw ex;
    }
}

async function getUserData(){
    try {
        const data = await AsyncStorage.getItem(userData);
        if(data){
            console.log('DataStore: ' + JSON.stringify(data))
            return JSON.parse(data);
        } else {
            throw notFoundError;
        }
    } catch(ex){
        throw ex;
    }
}

async function mergeUserData(data){
    try{
        const dataJson = JSON.stringify(data);
        await AsyncStorage.mergeItem(userData,dataJson);
        const prueba = await AsyncStorage.getItem(userData);
        console.log(`Resultado: ${prueba}`);
    } catch(ex){
        throw ex;
    }
}

async function mergeUserPoints(newPoints){
    try{
        const type = Object.keys(newPoints)[0];
        AsyncStorage.getItem(userData,(error, data)=>{
            try{
                if(error) {
                    throw error;
                } else {
                    const {points, money} = JSON.parse(data);
                    let value = (type==="points")?points:money;
                    value += newPoints;
                    const dataToMerge = {[type]:value};
                    AsyncStorage.mergeItem(userData,JSON.stringify(dataToMerge))
                    .catch(ex=>console.log(`Error while merging data: ${JSON.stringify(ex)}`));
                }
            } catch(ex){
                console.log(`Error while merging data: ${JSON.stringify(ex)}`)
            }
        })
    } catch(ex){
        throw ex;
    }
}
//     points: '',
//     money: '',

async function setUserPicture(data){
    try{
        const jsonData = JSON.stringify(data)
        await AsyncStorage.setItem(userPicture,jsonData);
    } catch(ex){
        throw ex;
    }
}

async function getUserPicture(){
    try {
        const data = await AsyncStorage.getItem(userPicture);
        if(data){
            console.log(data)
            return JSON.parse(data);
        } else {
            throw notFoundError;
        }
    } catch(ex){
        throw ex;
    }
}

async function setReferrals(data){
    try{
        const jsonData = JSON.stringify(data);
        await AsyncStorage.setItem(userPicture,jsonData);
    } catch(ex){
        throw ex;
    }
}

async function clearData(){
    return Promise.all([
        AsyncStorage.removeItem(tokenAppKey),
        AsyncStorage.removeItem(userData),
        AsyncStorage.removeItem(userPicture),
        AsyncStorage.removeItem(showMessageFlag)
    ]);
}

async function setShowResetTokenMessage(data){
    try{
        const flag = JSON.stringify(data);
        console.log(`flag:${flag}`);
        await AsyncStorage.setItem(showMessageFlag,flag);
    } catch(ex) {
        throw ex;
    }
}

async function getShowResetTokenMessage(){
    try{
        const flagJson = await AsyncStorage.getItem(showMessageFlag);
        const {flag} = JSON.parse(flagJson);
        return flag;
    } catch(ex) {
        throw ex;
    }
}

async function getOneSignalId(){
    try{
        const data = await AsyncStorage.getItem(oneSignalId);
        const id = JSON.parse(data);
        return id;
    } catch(ex) {
        throw ex;
    }
}

async function setOneSignalId(data){
    try{
        const id = JSON.stringify(data)
        await AsyncStorage.setItem(oneSignalId, id);
    } catch(ex) {
        throw ex;
    }
}

async function getFirstTime(){
    try{
        const flag = await AsyncStorage.getItem(firstTime);
        return JSON.parse(flag);
    } catch(ex) {
        throw ex;
    }
}

async function setFirstTime(flag){
    try{
        await AsyncStorage.setItem(firstTime, JSON.stringify(flag));
    } catch(ex) {
        throw ex;
    }
}

async function getConfiguration(){
    try{
        const data = await AsyncStorage.getItem(configurationVars);
        return JSON.parse(data);
    } catch(ex) {
        throw ex;
    }
}

async function setConfiguration(data){
    try{
        await AsyncStorage.setItem(configurationVars, JSON.stringify(data));
    } catch(ex) {
        throw ex;
    }
}

async function setAgendaList(data){
    try{
        const dataJson = JSON.stringify(data);
        console.log(dataJson + 'agenda')
        await AsyncStorage.setItem(agendaList,dataJson);
    } catch(ex){
        throw ex;
    }
}
async function getAgendaList(){
    try{
        const list = await AsyncStorage.getItem(agendaList);
        if(list){
            return JSON.parse(list);
        } else {
            throw notFoundError;
        }
    } catch(ex){
        throw ex;
    }
}


export {
    setAppToken,
    getAppToken,
    mergeAppToken,
    setUserData,
    getUserData,
    mergeUserData,
    mergeUserPoints,
    setUserPicture,
    getUserPicture,
    clearData,
    setShowResetTokenMessage,
    getShowResetTokenMessage,
    getOneSignalId,
    setOneSignalId,
    getFirstTime,
    setFirstTime,
    getConfiguration,
    setConfiguration,
    setAgendaList,
    getAgendaList
}