import React from 'react';
import { StyleSheet, Text, Button } from 'react-native';
 import {createStackNavigator, createAppContainer} from 'react-navigation';
 import LogIn from './InicioSesion/LogIn';
 import SingUp from './InicioSesion/SingUp';
 import HomeStack from './Home/HomeStack'


const sessionStack = createStackNavigator({
  login: {
    screen: LogIn,
    navigationOptions: ()=> ({
      title: '',
      header: null
    }),
  },
  singup: {
    screen: SingUp,
    navigationOptions: ()=> ({
      title: 'Sing Up',
      headerStyle: {
        backgroundColor: 'rgba(22, 122, 199,1.0)',
      },
      headerTintColor: '#fff'
    }),
  }
})
export default createStackNavigator( {
  sesion: {
    screen: sessionStack,
    navigationOptions: ()=> ({
      title: '',
      header: null
    }),
  },
  home: {
    screen: HomeStack,
    navigationOptions: ()=> ({
      title: '',
      header: null
    }),
  },
});