import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
 import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
 import { IconNB, Icon, Button } from 'native-base';
 //import HomeTab from './HomeTab';
 import UpdatePerfil from './Perfil/UpdatePerfil'
 import Anuncio from './Anuncio'
 import Perfil from './Perfil/Perfil';
 import Monedero from './Monedero/Monedero';

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

}
);

export default HomeStack = createStackNavigator( {
    home: {
      screen: MenuTab,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: (
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Button transparent 
                onPress={() => navigation.goBack()}>
                <Icon name='arrow-back' style = {{color: '#000'}}/>
                <Text style = {{color:'#000', fontWeight:'300', fontSize: 15}}> Perfil</Text>
              </Button>
            </View>
            ),
          headerRight: (
            <View style={{flex: 1, flexDirection: 'row'}}>
                <Button transparent 
                  onPress={() => navigation.navigate('updateperfil')}
                > 
                    <IconNB  type="FontAwesome" name='pencil' style = {{color: 'blue'}}/>
                </Button>
                <Button transparent 
                  onPress={() => navigation.navigate('anuncios')}
                > 
                   <Icon type="FontAwesome" name="video-camera" style = {{color: 'blue'}}/>
                </Button>
            </View>
          ),
        };
      },
    },
    updateperfil: {
        screen: UpdatePerfil,
        navigationOptions: ()=> ({
          title: '',
          header: null
        }),
    },
    anuncios: {
      screen: Anuncio,
      navigationOptions: ()=> ({
        title: 'Anuncios'
      }),
    }
  });
  