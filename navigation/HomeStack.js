 import React from 'react';
 import { StyleSheet, Text, View} from 'react-native';
 import {createBottomTabNavigator} from 'react-navigation';
 import { IconNB, Icon } from 'native-base';
 import ProfileStack from '../screens/Home/Perfil/ProfileStack';
 import Actions from '../screens/Home/Monedero/ActionStack';

 import globalStyles from '../styles';


 export default HomeStack = createBottomTabNavigator({
  perfilMenu: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: 'Profile', 
      tabBarIcon:({tintColor})=> (<Icon name='ios-contact' style={{color:'#fff', fontSize:35}}/>)
    }
  },
  tabs:{
    screen: Actions,
      navigationOptions: {
        tabBarLabel: 'Monedero', 
        tabBarIcon:({tintColor})=> {
            
          return(<Icon name='ios-card' style={{color:'#fff', fontSize:35}}/>)
        }
      }
  }
},
{
  tabBarOptions: {
    activeBackgroundColor: globalStyles.mediumLightBlue,
    activeTintColor:'rgba(255,255,255,1.0)',
    inactiveTintColor: 'rgba(255,255,255,0.7)',
    labelStyle:{
      fontSize:12
    },
    style:{
      backgroundColor:globalStyles.mediumBlue
    }
  },
});