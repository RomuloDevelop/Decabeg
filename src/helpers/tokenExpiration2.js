import { AppState } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import { NavigationActions } from 'react-navigation';
import {timeForExpiration} from './dateUtils';
import {appAlert} from './generalFunctions';
import {sendUserResetToken} from '../Api/session';
import {setShowResetTokenMessage, getShowResetTokenMessage, getAppToken, clearData} from './sessionData';

let tokenExpiration;
let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function expirationAddListener() {
    console.log('did focus anuncios');
    const navigateAction = NavigationActions.navigate({routeName: 'login'})
    tokenExpiration = BackgroundTimer.setInterval(() => {  
    getAppToken().then(async (data)=>{
      let {expiration} = data;
      if(!expiration)
        return;
      const remainigTime = timeForExpiration(expiration);
      console.log('Remain time from:' + remainigTime);
      // if(remainigTime < 120 && remainigTime >= 4) {
      //   const state = AppState.currentState;
      //   console.log(state);
      //   if(state !== 'active')
      //     return;
      //   const flag = await getShowResetTokenMessage();
      //   if(flag) {
      //     await setShowResetTokenMessage({flag:false});
      //     appAlert('Sesion','Desea mantener la sesion activa?',async ()=>{
      //       await sendUserResetToken();
      //       await setShowResetTokenMessage({flag:true});
      //     });
      //   } 
      // } else if(remainigTime <= 0) {
      //   await clearData();
      //   appAlert('Fin de sesion','Su sesion expiro');
      //   _navigator.dispatch(navigateAction);
      // }
        
    }).catch(ex=>{
        console.log(ex);
        if(ex === "No data was found")_navigator.dispatch(navigateAction);
    });
  }, 25000);   
}

function expirationClearListener(){
  BackgroundTimer.clearInterval(tokenExpiration);
  console.log('did blur');
}

export{
    setTopLevelNavigator,
    expirationAddListener,
    expirationClearListener
}