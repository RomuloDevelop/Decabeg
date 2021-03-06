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
    const buttons = (!onPressOK)?[{text:'OK'}]:
      [
        {
          text: 'Cancelar',
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
      ]
    Alert.alert(
      title,
      answer,
      buttons,
      {cancelable: false},
    );
  }

async function getLink(url){
  try{
    await Linking.openURL(url);
  } catch(err){
    appAlert('Error','No es posible abrir el link');
  }
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

    await getLink(url);
}

export {
    checkResponse,
    getFunctionName,
    getUrlEncodedParams,
    appAlert,
    getLink,
    sendEmail
}