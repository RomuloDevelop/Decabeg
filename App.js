import React from 'react';
import { StyleSheet, Text, Button } from 'react-native';
 import { createSwitchNavigator} from 'react-navigation';
 import HomeStack from './screens/Home/HomeStack';
 import SessionStack from './screens/InicioSesion/SessionStack';
 import LoadingSession from './screens/InicioSesion/LoadingSession';


 import {calcRemainingTime, logout, appAlert} from './Api/helpers';
 import {sendUserLogOut, sendUserResetToken} from './Api/api';
 import BackgroundTimer from 'react-native-background-timer'
 import { getAppToken, clearData } from './dataStore/sessionData';
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
      navigation.addListener('didFocus',()=>{
        console.log('sessioon focused');
      });
      return{
      title: '',
      header: null
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
            if(remainigTime.minutes === 3) {
              console.log('alert');
              if(showMessage) {
              appAlert('Sesion','Desea mantener la sesion activa?',sendUserResetToken/*,async ()=>{
                try{
                  showMessage = false;
                  await logout();
                  navigation.navigate('login');
                } catch(ex){
                  console.log(ex);
                }
              }*/);
              showMessage = false;
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