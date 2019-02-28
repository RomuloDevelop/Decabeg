import { AsyncStorage } from "react-native"
import { objToArray } from "./helpers";
const notFoundError = 'No data was found';
const tokenAppKey = 'tokenApp';
const userData = 'userData';
const userPicture = 'userPicture';
async function setAppToken(token,expiration, id){
    try{
        console.log('Saving data' + JSON.stringify({token,expiration, id}));
        const data = JSON.stringify({token,expiration, id})
        await AsyncStorage.setItem(tokenAppKey,data);
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
                    const {points, movile_data} = JSON.parse(data);
                    let money = (type==="points")?points:movile_data;
                    money += newPoints;
                    const dataToMerge = {[type]:money};
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
//     movile_data: '',

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
    try{
        await AsyncStorage.clear();
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
    clearData
}