import React from 'react';
import { StyleSheet, Text, Button, ToastAndroid } from 'react-native';
import { createSwitchNavigator, createAppContainer} from 'react-navigation';
import HomeStack from './screens/Home/HomeStack';
import SessionStack from './screens/InicioSesion/SessionStack';
import LoadingSession from './screens/InicioSesion/LoadingSession';

//import {calcRemainingTime, logout, appAlert} from './Api/helpers';
import { 
  appAlert, 
  timeForExpiration, 
  getAppToken, clearData, 
  getShowResetTokenMessage, 
  setShowResetTokenMessage, 
  NetInfoManager } from './helpers';
import { sendUserResetToken } from './Api/api';
import BackgroundTimer from 'react-native-background-timer'
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
          NetInfoManager.addListener((connectionInfo)=>{
            const message = (connectionInfo.type === 'none')?'Device is offline':'Device is online';
            ToastAndroid.showWithGravity(message,ToastAndroid.LONG,ToastAndroid.BOTTOM);
          });
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
      navigation.addListener('didFocus',()=>{
          tokenExpiration = BackgroundTimer.setInterval(() => {  
          getAppToken().then(async (data)=>{
            let {expiration} = data;
            if(!expiration)
              return;
            const remainigTime = timeForExpiration(expiration);
            console.log('Remain time from:' + remainigTime);
            if(remainigTime < 120 && remainigTime >= 4) {
              const flag = await getShowResetTokenMessage();
              if(flag) {
                await setShowResetTokenMessage({flag:false});
                appAlert('Sesion','Desea mantener la sesion activa?',async ()=>{
                  await sendUserResetToken();
                  await setShowResetTokenMessage({flag:true});
                });
              } 
            } else if(remainigTime <= 0) {
              await clearData();
              navigation.navigate('login');
            }
              
          }).catch(ex=>console.log(ex));
        }, 25000);
      });

      navigation.addListener('didBlur',()=>{
        BackgroundTimer.clearInterval(tokenExpiration);
        console.log('did blur');
      });
      return { title: '', header: null }
    },
  },
});

export default createAppContainer(appStack);