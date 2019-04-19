import React from 'react';
import { StyleSheet, Text, Button, ToastAndroid } from 'react-native';
import { createSwitchNavigator, createAppContainer} from 'react-navigation';
import HomeStack from './screens/Home/HomeStack';
//import HomeDrawerStack from './screens/Home/HomeDrawerStack';
import SessionStack from './screens/InicioSesion/SessionStack';
import LoadingSession from './screens/InicioSesion/LoadingSession';
import { expirationClearListener, setTopLevelNavigator } from './helpers';
import { 
  appAlert, 
  timeForExpiration, 
  getAppToken, clearData, 
  getShowResetTokenMessage, 
  setShowResetTokenMessage, 
  NetInfoManager } from './helpers';
import { sendUserResetToken } from './Api';
import BackgroundTimer from 'react-native-background-timer'
const AppStack = createSwitchNavigator({
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
            if(connectionInfo.type === 'none')
              ToastAndroid.showWithGravity('Device is offline',ToastAndroid.SHORT,ToastAndroid.BOTTOM);
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
      navigation.addListener('didBlur', expirationClearListener)
      return { title: '', header: null }
    },
  },
});

const AppContainer = createAppContainer(AppStack);

export default class App extends React.Component {
  render() {
    /* In the root component we are rendering the app navigator */
    return( 
      <AppContainer 
        ref={navigatorRef => {
          setTopLevelNavigator(navigatorRef);
      }}/>
    );
  }
}