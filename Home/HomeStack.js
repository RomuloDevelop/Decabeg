import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
 import {createStackNavigator, createBottomTabNavigator, NavigationActions} from 'react-navigation';
 import { IconNB, Icon, Button } from 'native-base';
 import UpdatePerfil from './Perfil/UpdatePerfil'
 import Anuncio from './Anuncio'
 import Perfil from './Perfil/Perfil';
 import Monedero from './Monedero/Monedero';

 const backButton = (text, navigation)=>(            
    <View style={{flex: 1, flexDirection: 'row'}}>
      <Button transparent 
        onPress={() => navigation.dispatch(NavigationActions.back())}>
        <Icon name='arrow-back' style = {{color: '#000'}}/>
        <Text style = {{color:'#000', fontWeight:'300', fontSize: 20
      }}>{text}</Text>
      </Button>
    </View>)
    
 const MenuTab = createBottomTabNavigator({
  perfil: {
      screen: Perfil,
      navigationOptions: {
        tabBarLabel: 'Perfil', 
        tabBarIcon:({tintColor})=> (<Icon name='ios-contact' size={24}/>)
      }
  },
  monedero:{
    screen: Monedero,
    navigationOptions: {
      tabBarLabel: 'Monedero', 
      tabBarIcon:({tintColor})=> (<Icon name='ios-card' size={24}/>)
    }
  },
});

export default HomeStack = createStackNavigator( {
  home: {
    screen: MenuTab,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: backButton('Profile', navigation),
        headerRight: (
          <View style={{flex: 1, flexDirection: 'row'}}>
              <Button transparent 
                onPress={() => navigation.navigate('updateperfil')}> 
                  <IconNB  type="FontAwesome" name='pencil' style = {{color: 'rgba(41, 128, 185,1.0)'}}/>
              </Button>
              <Button transparent 
                onPress={() => navigation.navigate('anuncios')}
              > 
                 <Icon type="FontAwesome" name="video-camera" style = {{color: 'rgba(41, 128, 185,1.0)'}}/>
              </Button>
          </View>
        ),
      };
    },
  },
  updateperfil: {
    screen: UpdatePerfil,
    navigationOptions: ({navigation})=> ({
      headerLeft: backButton('Update Profile', navigation)
    }),
  },
  anuncios: {
    screen: Anuncio,
    navigationOptions: ({navigation})=> ({
      title: 'Anuncios'
    }),
  }
});
  