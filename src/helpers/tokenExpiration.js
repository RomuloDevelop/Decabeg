import BackgroundTimer from 'react-native-background-timer';
import { NavigationActions } from 'react-navigation';
import {timeForExpiration} from './dateUtils';
import {getAppToken} from './sessionData';

let tokenExpiration;
let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function setNavigatorDispatch(){
  const navigateAction = NavigationActions.navigate({routeName: 'login'});
  _navigator.dispatch(navigateAction);
}

function expirationAddListener() {
    console.log('did focus anuncios');
    tokenExpiration = BackgroundTimer.setInterval(() => {  
    getAppToken().then(async (data)=>{
      let {expiration} = data;
      if(!expiration)
        return;
      const remainigTime = timeForExpiration(expiration);
      console.log('Remain time from:' + remainigTime);
    }).catch(ex=>{
        console.log(ex);
    });
  }, 25000);   
}

function expirationClearListener(){
  BackgroundTimer.clearInterval(tokenExpiration);
  console.log('did blur');
}

export{
    setTopLevelNavigator,
    setNavigatorDispatch,
    expirationAddListener,
    expirationClearListener
}