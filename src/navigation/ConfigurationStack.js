import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator, NavigationActions } from 'react-navigation';
import { IconNB, Icon, Button, Text } from 'native-base';
import Configurations from '../screens/Configurations/Configurations';
//import PrivacyPolicy from '../screens/Configurations/PrivacyPolicy';
import VersionScreen from '../screens/Configurations/Version';
import InformationHome from '../screens/Configurations/InformationHome';
import WebViewComponent from '../sharedComponents/WebViewComponent';

import globalStyles from '../styles';

const PrivacyPolicy =()=><WebViewComponent uri="https://edixonalberto.github.io/doc-dicabeg/menu/politic.html"/>
const TermsAndConditions =()=><WebViewComponent uri="https://edixonalberto.github.io/doc-dicabeg/menu/terms.html"/>

function BackButton(text, navigation){            
  return (
  <View style={{flex: 1, flexDirection: 'row'}}>
    <Button transparent onPress={()=>navigation.dispatch(NavigationActions.back())}>
      <Icon name='arrow-back' style = {{color: '#FFF'}}/>
      <Text style = {{color:'#FFF', fontWeight:'300', fontSize: 20}}>
        {text}
      </Text>
    </Button>
  </View>
  );
}

const options = (navigation, text, headerRight)=>{
  const obj = {
    headerLeft: BackButton(text, navigation),
    headerStyle: {
      backgroundColor: globalStyles.navbarColor,
    }
  };
  if(headerRight) obj.headerRight = headerRight;
  return obj;
};
const AppInformation = createStackNavigator({
  informationHome: {
    screen: InformationHome,
    navigationOptions: ({navigation})=>options(navigation,'Informacion'),
  },
  privacypolicy: {
    screen: PrivacyPolicy,
    navigationOptions: ({navigation})=>options(navigation,''),
  },  
  terms: {
    screen: TermsAndConditions,
    navigationOptions: ({navigation})=>options(navigation,''),
  },
  version: {
    screen: VersionScreen,
    navigationOptions: ({navigation})=>options(navigation,'Versión'),
  }

})

const ConfigurationStack = createStackNavigator({
  configurationlist: {
    screen: Configurations,
    navigationOptions: ({navigation})=>options(navigation,'Configuraciones'),
  },
  information: {
    screen: AppInformation,
    navigationOptions: ()=> ({
      title: '',
      header: null
    }),
  },
});

export default ConfigurationStack;