import React from 'react';
import { StyleSheet, Text, Button } from 'react-native';
 import { createSwitchNavigator} from 'react-navigation';
 import HomeStack from './screens/Home/HomeStack';
 import SessionStack from './screens/InicioSesion/SessionStack';
 import LoadingSession from './screens/InicioSesion/LoadingSession';


 import {calcRemainingTime, logout, appAlert} from './Api/helpers';
 import {sendUserLogOut, sendUserResetToken} from './Api/api';
 import BackgroundTimer from 'react-native-background-timer'
 import { getAppToken, clearData, getShowResetTokenMessage, setShowResetTokenMessage } from './dataStore/sessionData';
const appStack = createSwitchNavigator({
  loading: {
    screen: LoadingSession,
    navigationOptions: ()=> ({
      title: '',
      header: null
    }),
  },
  sesion: {
    screen: SessionStack,
    navigationOptions: ({navigation})=> {
      navigation.addListener('didFocus',async()=>{
        try{
          await setShowResetTokenMessage({flag:true});
          console.log('sessioon focused');
        } catch(ex){
          console.log(ex);
        }
      });
      return{
        title: '',
        header: null,
    }},
  },
  home: {
    screen: HomeStack,
    navigationOptions: ({navigation})=> {
      let tokenExpiration;
      let showMessage = true;
      navigation.addListener('didFocus',()=>{
        //tokenExpiration = setInterval(()=>{
          tokenExpiration = BackgroundTimer.setInterval(() => {  
          getAppToken().then(async (data)=>{
            let {expiration} = data;
            if(!expiration)
              return;
            const remainigTime = calcRemainingTime(expiration);
            console.log('Remain time from:' + JSON.stringify(remainigTime));
            if(remainigTime.minutes < 2) {
              const {flag} = await getShowResetTokenMessage();
              console.log(`alert: ${flag}`);
              if(flag) {
                await setShowResetTokenMessage({flag:false});
                appAlert('Sesion','Desea mantener la sesion activa?',async ()=>{
                  await sendUserResetToken();
                  await setShowResetTokenMessage({flag:true});
                });
              } 
            } else if(remainigTime.unix <= 0) {//remainigTime.minutes === 0 || remainigTime.hours < 0){
              await clearData();
              navigation.navigate('login');
              //clearInterval(tokenExpiration);
            }
              
          }).catch(ex=>console.log(ex));
        }, 25000);
      });

      navigation.addListener('didBlur',()=>{
        BackgroundTimer.clearInterval(tokenExpiration);
        console.log('did blur');
      })
      return{ title: '', header: null }
    },
  },
});

export default appStack;