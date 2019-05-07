import React from 'react';
import { StyleSheet, Text, Button, ToastAndroid, View } from 'react-native';
import { createSwitchNavigator, createAppContainer} from 'react-navigation';
import HomeStack from './screens/Home/HomeStack';
//import HomeDrawerStack from './screens/Home/HomeDrawerStack';
import OfflineMessage from './screens/sharedComponents/OfflineMessage';
import SessionStack from './screens/InicioSesion/SessionStack';
import LoadingSession from './screens/InicioSesion/LoadingSession';
import { expirationClearListener, setTopLevelNavigator, getOneSignalId, setOneSignalId } from './helpers';
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
    this.state = {
      connected: true
    }
    OneSignal.init("2c4010d0-c7b2-458d-923a-eda58dfbd643");
    OneSignal.configure();
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.enableSound(true);
    NetInfoManager.addListener((connectionInfo)=>{
      if(connectionInfo.type === 'none'){
        //ToastAndroid.showWithGravity('Device is offline',ToastAndroid.SHORT,ToastAndroid.BOTTOM);
        this.setState({connected:false});
      } else 
        this.setState({connected:true});
    });
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
    NetInfoManager.removeListener();
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
    getOneSignalId().then((id)=>{
      if(device.userId !== id){
        //Manda el id al servidor
        console.log(`Saved id: ${device.userId}`);
        setOneSignalId(device.userId);
      }
    });
  }
  render() {
    return( 
      <View style={{flex:1}}>
      <AppContainer 
        ref={navigatorRef => {
          setTopLevelNavigator(navigatorRef);
      }}/>
      {(!this.state.connected)&&(<OfflineMessage/>)}
      </View>
    );
  }
}