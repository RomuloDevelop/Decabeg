import React from 'react';
import { StyleSheet, Text, Button } from 'react-native';
 import {createStackNavigator} from 'react-navigation';
 import createBottomTabNavigator from 'react-navigation-tabs';
 import LogInSingUp from './InicioSesion/LogInSingUp';
 import LogIn from './InicioSesion/LogIn';
 import SingUp from './InicioSesion/SingUp';
 import HomeTab from './Home/HomeTab';
 import AnunciosStack from './Anuncios/AnunciosStack'
 import PerfilAnuncioStack from './Home/PerfilAnuncioStack'

export default createStackNavigator( {
  loginsingup: {
    screen: LogInSingUp,
    navigationOptions: ()=> ({
      title: ''
    }),
  },
  login: {
    screen: LogIn,
    navigationOptions: ()=> ({
      title: 'Inicio de Sesion',
    }),
  },
  singup: {
    screen: SingUp,
    navigationOptions: ()=> ({
      title: 'sing up'
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


