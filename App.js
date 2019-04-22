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
import BackgroundTimer from 'react-native-background-timer';
import OneSignal from 'react-native-onesignal';

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

  constructor(props) {
    super(props);
    //OneSignal.setLogLevel(5, 4);
    OneSignal.init("84e9a73f-0e37-4b1a-94cb-ecf464328fb1");

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }
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