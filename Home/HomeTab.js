import React, {Component} from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import ListAnuncios from './Anuncios/ListAnuncio';
import Perfil from './Perfil/Perfil';
import Monedero from './Monedero/Monedero';

export default HomeTab = createBottomTabNavigator({
    /*anuncios:{
        screen: ListAnuncios,
        navigationOptions: {
          tabBarLabel: 'Anuncios', 
          tabBarIcon:({tintColor})=> (<Icon name='ios-home' size={24}/>)
        }
    }*/
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