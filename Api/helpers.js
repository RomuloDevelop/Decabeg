
//  userDataModel = {
//     username  = '',
//     names: '',
//     lastnames: '',
//     autor: '',
//     age: '',
//     phone: '',
//     points: '',
//     money: '',
//     invite_code: ''
//   }
  
//   userAccount = {
//     email: '',
//     password: ''
//   }
import qs from 'qs';
import { Linking, Alert } from 'react-native';
import { mergeUserData, getUserData, clearData } from '../dataStore/sessionData';
import { sendUpdateUserData, sendUserLogOut } from './api';
import { signOut as googleSingOut } from './SessionManager/googleApi';
import { signOut as facebookSingOut } from './SessionManager/facebookApi';

async function sendEmail(to, subject, body, options = {}) {
    const { cc, bcc } = options;

    let url = `mailto:${to}`;
    // mailto:<receiver_email>?subject=<subject>&body=<body>&cc=<emails_to_copy>
    // Create email link query
    const query = qs.stringify({
        subject: subject,
        body: body,
        cc: cc,
        bcc: bcc
    });

    if (query.length) {
        url += `?${query}`;
    }

    // check if we can use this link
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
        throw new Error('Provided URL can not be handled');
    }

    return Linking.openURL(url);
}




function checkResponse(response, method, message){
    if(response){
        console.log(response);
        return response;}
    else
        throw {
            message,
            method
        }
}

function getFunctionName(arg){
    let myName = arg.callee.toString();
    myName = myName.substr('function '.length);
    myName = myName.substr(0, myName.indexOf('('));
    return myName;
}

function getUrlEncodedParams(params){
    return Object.keys(params)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    .join('&')
    .replace(/%20/g, '+');
}

function appAlert(title,answer,onPressOK, onPressCancel){
    
    Alert.alert(
      title,
      answer,
      [
        {
          text: 'Cancel',
          onPress: async () => {
              if(onPressCancel)
                await onPressCancel();
              console.log('Cancel Pressed');
            },
          style: 'cancel',
        },
        {
          text: 'OK', onPress:onPressOK
        },
      ],
      {cancelable: false},
    );
  }

function calcRemainingTime(unixtime){
    const date = new Date(unixtime*1000);
    const actualDate = new Date();
    const unixDate = date.getTime()/1000;
    const actualUnixDate = actualDate.getTime()/1000;
    console.log(`${date} - ${actualDate}`);
    let sNegative=false;
    let mNegative=false;
    let seconds;
    let minutes;
    let hours;
    let remainingSeconds = date.getSeconds() - actualDate.getSeconds();
    if(remainingSeconds < 0){
    	sNegative = true
    	seconds = 60 + remainingSeconds;
    } else seconds = remainingSeconds
    
    let remainingMinutes = date.getMinutes() - actualDate.getMinutes();
    if(sNegative) remainingMinutes -= 1;
    if(remainingMinutes < 0){
    	mNegative = true;
    	minutes = 60 + remainingMinutes;
    } else minutes = remainingMinutes;
    
    let remainingHour = date.getHours() - actualDate.getHours();
    if(mNegative)remainingHour -=1; 
	hours = remainingHour;
    return {hours, minutes, seconds, unix:(unixDate-actualUnixDate)};
}

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

async function logout(){
    try {
        await googleSingOut();
        await facebookSingOut();
        await sendUserLogOut();
        await clearData();
    } catch (ex) {
        throw ex;
    }
}
export {
    sendEmail,
    checkResponse,
    getFunctionName,
    getUrlEncodedParams,
    appAlert,
    calcRemainingTime,
    updateUserMoneyLocalAndSend,
    updateUserPointsMovileLocalAndSend,
    logout
}