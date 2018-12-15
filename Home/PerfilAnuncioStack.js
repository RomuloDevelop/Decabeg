import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
 import {createStackNavigator} from 'react-navigation';
 import { IconNB, Icon, Button } from 'native-base';
 import HomeTab from './HomeTab';
 import UpdatePerfil from './Perfil/UpdatePerfil'
 import AnunciosStack from '../Anuncios/AnunciosStack'

export default PerfilAnuncioStack = createStackNavigator( {
    home: {
      screen: HomeTab,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: (
            <Text style = {{fontSize: 20, fontWeight: "bold"}}> Perfil</Text>
            ),
          headerRight: (
            <View style={{flex: 1, flexDirection: 'row'}}>
                <Button transparent 
                  onPress={() => {navigation.navigate('updateperfil')}}
                > 
                    <IconNB  type="FontAwesome" name='pencil' style = {{color: 'blue'}}/>
                </Button>
                <Button transparent 
                  onPress={() => {navigation.navigate('anunciosStack')}}
                > 
                   <Icon type="FontAwesome" name="video-camera" />
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
    anunciosStack: {
      screen: AnunciosStack,
      navigationOptions: ()=> ({
        title: 'Lista de Anuncios'
      }),
    }
  });
  