import qs from 'qs';
import { Linking, Alert } from 'react-native';

function checkResponse(response, method, message){
  if(response){
      console.log(response);
      return response;
  }
  else
    throw {
      message,
      method
    }
}

function responseError(error, method){
  if (error.response) {
    console.log('response error');
    console.log(error.response.headers);
    console.log(error.response.data);
    throw {message:error.response.data, method};
  } else if (error.request){
    console.log('request error'); 
    throw {message:error.request, method};}
  else if(error.message) {
    console.log('message error');
    throw {message: error.message, method};
  }
  else throw error;
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

export {
    checkResponse,
    responseError,
    getFunctionName,
    getUrlEncodedParams,
    appAlert,
    sendEmail
}