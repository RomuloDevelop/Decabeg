import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, NavigationActions } from 'react-navigation';
import { IconNB, Icon, Button, Text } from 'native-base';
import UpdatePerfil from '../screens/Home/Perfil/UpdatePerfil';
import History from '../screens/Home/Perfil/History';
import Transacciones from '../screens/Home/Perfil/Transacciones'
import Contacts from '../screens/Home/Perfil/Contacts';
import HomeList from '../screens/Home/Perfil/HomeList';
import CreateReferralsCode from '../screens/Home/Perfil/CreateReferralsCode';

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

const ProfileStack = createStackNavigator({
  perfil: {
    screen: HomeList,
    navigationOptions: ({navigation})=>({
      header:null,
    }),
  },
  history: {
    screen: History,
    navigationOptions: ({navigation})=>options(navigation,'History'),
  },
  transacciones:{
    screen: Transacciones,
    navigationOptions: ({navigation})=>options(navigation,'Transacciones'),
  },
  updateperfil: {
    screen: UpdatePerfil,
    navigationOptions: ({navigation})=>options(navigation,'Update Profile'),
  },
  contacts: {
    screen: Contacts,
    navigationOptions: ({navigation})=> options(navigation,'Contacts',(
      <Button transparent style={{justifyContent:'center', alignItems:'center'}} onPress={()=>navigation.navigate('code')}>
        <Icon name='plus' type='FontAwesome' style={{color:'#FFF'}}/>
      </Button>
    )),
  },
  code: {
    screen: CreateReferralsCode,
    navigationOptions: ({navigation})=> options(navigation, 'Get Code'),
  },
});

export default ProfileStack;