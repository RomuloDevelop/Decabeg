import React, { Component } from 'react';
import {createMaterialTopTabNavigator, createStackNavigator, NavigationActions} from 'react-navigation';
import {View} from 'react-native';
import {Icon, Text, Button} from 'native-base';
import Bolsa from '../screens/Home/Monedero/Bolsa';
import VideoAds from '../screens/Home/Monedero/VideoAds';
import Anuncios from '../screens/Home/Monedero/Anuncios';
import Transferir from '../screens/Home/Monedero/Transferir';

//styles
import globalStyles from '../styles';

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
    //Recarga,
    Anuncios,
    Publicidad:{screen:VideoAds},
    Transferir
},{
    backBehavior: 'none',
    tabBarOptions: {
        optimizationsEnabled: false,
        scrollEnabled: true,
        swipeEnabled: true,
        activeTintColor: '#FFF',
        inactiveTintColor: 'rgba(255,255,255,0.7)',
        labelStyle:{
            fontSize:13
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

