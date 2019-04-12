 import React from 'react';
 import { StyleSheet, Text, View} from 'react-native';
 import {createDrawerNavigator} from 'react-navigation';
 import { IconNB, Icon } from 'native-base';
 import Actions from './Monedero/ActionStack';
  import UpdatePerfil from './Perfil/UpdatePerfil'
 import History from './Perfil/History';
 import Contacts from './Perfil/Contacts';
 import HomeList from './Perfil/HomeList';
 import CreateReferralsCode  from './Perfil/CreateReferralsCode';



const HomeDrawerStack = createDrawerNavigator({  
  tabs:{
    screen: Actions,
      navigationOptions: {
        tabBarLabel: 'Monedero', 
        tabBarIcon:({tintColor})=> {
            
          return(<Icon name='ios-card' style={{color:'#fff', fontSize:35}}/>)
        }
      }
  },
  perfil: {
    screen: HomeList,
  },
  history: {
    screen: History,
  },
  updateperfil: {
    screen: UpdatePerfil,
  },
  contacts: {
    screen: Contacts,
  },
  code: {
    screen: CreateReferralsCode,
  },
});

export default HomeDrawerStack;