import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator, NavigationActions } from 'react-navigation';
import { IconNB, Icon, Button, Text } from 'native-base';
import Configurations from '../screens/Configurations/Configurations';
import PrivacyPolicy from '../screens/Configurations/PrivacyPolicy';

import globalStyles from '../styles';


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

const ConfigurationStack = createStackNavigator({
  configurationlist: {
    screen: Configurations,
    navigationOptions: ({navigation})=>options(navigation,'Configuraciones'),
  },
  privacypolicy: {
    screen: PrivacyPolicy,
    navigationOptions: ({navigation})=>options(navigation,'Politicas de Privacidad')
  },
});

export default ConfigurationStack;