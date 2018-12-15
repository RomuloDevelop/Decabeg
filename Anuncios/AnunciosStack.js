import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Anuncio from './Anuncio';
import ListAnuncios from './ListAnuncios';

export default AnunciosStack = createStackNavigator( {
  listAnuncios: {
    screen: ListAnuncios,
    navigationOptions: ()=> ({
      title: '',
      header: null
    }),
  },
  anuncio: {
    screen: Anuncio,
    navigationOptions: ()=> ({
      title: '',
      header: null
    }),
  }
});
