import React from 'react';
import { StyleSheet, Text, Button, Easing, Animated } from 'react-native';
 import {createStackNavigator} from 'react-navigation';
 import LogIn from '../screens/InicioSesion/LogIn';
 import SingUp from '../screens/InicioSesion/SingUp';
 import SendEmail from '../screens/InicioSesion/SendEmail';
 import SendCode from '../screens/InicioSesion/SendCode';
 import ForgotPassword from '../screens/InicioSesion/ForgotPassword';

 import globalStyles from '../styles';

let CollapseExpand = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  });

  const scaleY = position.interpolate({
    inputRange,
    outputRange: ([0, 1, 1]),
  });

  return {
    opacity,
    transform: [
      { scaleY }
    ]
  };
};


let SlideFromRight = (index, position, width) => {
  const inputRange = [index - 1, index, index + 1];
  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [width, 0, 0]
  })
  const slideFromRight = { transform: [{ translateX }] }
  return slideFromRight
};

const TransitionConfiguration = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: (sceneProps) => {
      //console.log(sceneProps);
      const { layout, position, scene } = sceneProps;
      const width = layout.initWidth;
      const { index, route } = scene
      const params = route.params || {}; // <- That's new
      const transition = params.transition || 'default'; // <- That's new
      return {
        collapseExpand: CollapseExpand(index, position),
        default: SlideFromRight(index, position, width),
      }[transition];
    },
  }
}


export default SessionStack = createStackNavigator({
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
      title: 'Registrarse'
    }),
  },
  sendEmail: {
    screen: SendEmail,
    navigationOptions: ()=> ({
      title: 'Enviar email'
    })
  },
  sendCode: {
    screen: SendCode,
    navigationOptions: ()=> ({
      title: 'Enviar codigo'
    })
  },
  forgotPassword: {
    screen: ForgotPassword,
    navigationOptions: ()=> ({
      title: 'Recuperar contraseña'
    })
  }
},{
  transitionConfig:TransitionConfiguration,
  defaultNavigationOptions:{
    headerStyle: {
      backgroundColor: globalStyles.navbarColor,
    },
    headerTintColor: '#fff'
  }
})