import React from 'react';
import { StyleSheet, Text, Button } from 'react-native';
 import {createStackNavigator, createAppContainer} from 'react-navigation';
 import LogIn from './InicioSesion/LogIn';
 import SingUp from './InicioSesion/SingUp';
 import PerfilAnuncioStack from './Home/PerfilAnuncioStack'

export default createStackNavigator( {
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
  },
  home: {
    screen: PerfilAnuncioStack,
    navigationOptions: ()=> ({
      title: '',
      header: null
    }),
  },
});