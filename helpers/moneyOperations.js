import { mergeUserData, getUserData } from './sessionData';
import { sendUpdateUserData } from '../Api/api';
async function updateUserMoneyLocalAndSend(type, data){
    try{
        let {points, money} = await getUserData();
        let value;
        value = (type === "points")? points += data:money += data;
        await sendUpdateUserData({[type]:value});
        await mergeUserData({[type]:value});
    } catch(ex) {
        throw ex;
    }
}

async function updateUserPointsMovileLocalAndSend(pointsValue, movileDataValue){
    try{
        let {points:strPoints=0, money:strData=0} = await getUserData();
        const points = parseInt(pointsValue) + parseInt(strPoints);
        const money = parseFloat(movileDataValue) + parseFloat(strData);
        await sendUpdateUserData({points, money});
    } catch(ex) {
        throw ex;
    }
}

export { updateUserMoneyLocalAndSend, updateUserPointsMovileLocalAndSend}