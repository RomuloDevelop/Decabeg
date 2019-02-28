import React from 'react';
import { StyleSheet, Text, Button } from 'react-native';
 import { createSwitchNavigator} from 'react-navigation';
 import HomeStack from './screens/Home/HomeStack';
 import SessionStack from './screens/InicioSesion/SessionStack';
 import LoadingSession from './screens/InicioSesion/LoadingSession';


 import {calcRemainingTime, logout, appAlert} from './Api/helpers';
 import {sendUserLogOut, sendUserResetToken} from './Api/api';
 import { getAppToken } from './dataStore/sessionData';

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
    navigationOptions: ()=> ({
      title: '',
      header: null
    }),
  },
  home: {
    screen: HomeStack,
    navigationOptions: ({navigation})=> {
      let tokenExpiration;
      navigation.addListener('didFocus',()=>{
        tokenExpiration = setInterval(()=>{
          getAppToken().then(async (data)=>{
            let {expiration} = data;
            if(!expiration)
              return;
            const remainigTime = calcRemainingTime(expiration);
            console.log('Remain time from:' + JSON.stringify(remainigTime));
            if(remainigTime.minutes === 3){ 
              //after this call all code on background stop run.
              clearInterval(tokenExpiration);
              appAlert('Sesion','Desea mantener la sesion activa?',sendUserResetToken, logout);
            } else if(remainigTime.minutes === 0){
              await clearData();
              navigation.navigate('login');
            }
          }).catch(ex=>console.log(ex));
        }, 60000);
      });

      navigation.addListener('didBlur',()=>clearInterval(tokenExpiration))
      return{ title: '', header: null }
    },
  },
});

export default appStack;