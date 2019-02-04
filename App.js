import React from 'react';
import { StyleSheet, Text, Button } from 'react-native';
 import { createSwitchNavigator} from 'react-navigation';
 import HomeStack from './screens/Home/HomeStack';
 import SessionStack from './screens/InicioSesion/SessionStack';
 import LoadingSession from './screens/InicioSesion/LoadingSession';

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
    navigationOptions: ()=> ({
      title: '',
      header: null
    }),
  },
});

export default appStack;