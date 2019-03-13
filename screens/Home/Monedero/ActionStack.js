import React, { Component } from 'react';
import {createMaterialTopTabNavigator, createStackNavigator, NavigationActions} from 'react-navigation';
import {View} from 'react-native';
import {Icon, Text, Button} from 'native-base';
import Bolsa from './Bolsa';
import Recarga from './Recarga';
import Anuncios from './Anuncios';

//styles
import globalStyles from '../../../styles';

const backButton = (text, navigation)=>(            
    <View style={{flex: 1, flexDirection: 'row'}}>
      <Button transparent 
        onPress={() => navigation.dispatch(NavigationActions.back())}>
        <Icon name='arrow-back' style = {{color: '#FFF'}}/>
      </Button>
        <Text style = {{color:'#FFF', fontWeight:'300', fontSize: 20
      }}>{text}</Text>
    </View>)

export default Actions = createMaterialTopTabNavigator({
    Recarga,
    Bolsa,
    Anuncios
},{
    tabBarOptions: {
        optimizationsEnabled: true,
        scrollEnabled: false,
        swipeEnabled: true,
        activeTintColor: '#FFF',
        inactiveTintColor: 'rgba(255,255,255,0.7)',
        labelStyle:{
            fontSize:14
        },
        style: {
            backgroundColor: globalStyles.mediumBlue
        },
        indicatorStyle: {
            height:4,
            backgroundColor: globalStyles.lightBlue,
        },
    }
});

