import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
 import {createStackNavigator, createBottomTabNavigator, NavigationActions} from 'react-navigation';
 import { IconNB, Icon, Button } from 'native-base';
 import UpdatePerfil from './UpdatePerfil'
 import History from './History';
 import Contacts from './Contacts';
 import HomeList from './HomeList';
 import CreateReferralsCode  from './CreateReferralsCode';

const backButton = (text, navigation)=>(            
    <View style={{flex: 1, flexDirection: 'row'}}>
      <Button transparent 
        onPress={() => navigation.dispatch(NavigationActions.back())}>
        <Icon name='arrow-back' style = {{color: '#FFF'}}/>
        <Text style = {{color:'#FFF', fontWeight:'300', fontSize: 20
      }}>{text}</Text>
      </Button>
    </View>)

  const ProfileStack = createStackNavigator({
  perfil: {
      screen: HomeList,
      navigationOptions: ({navigation})=> ({
        //headerLeft: backButton('Profile', navigation)
        header:null,
      }),
  },
  history: {
    screen: History,
    navigationOptions: ({navigation})=> ({
      headerLeft: backButton('History', navigation),
      headerStyle: {
        backgroundColor: 'rgba(22, 122, 199,1.0)',
      }
    }),
  },
  updateperfil: {
    screen: UpdatePerfil,
    navigationOptions: ({navigation})=> ({
      headerLeft: backButton('Update Profile', navigation),
      headerStyle: {
        backgroundColor: 'rgba(22, 122, 199,1.0)',
      }
    }),
  },
  contacts: {
    screen: Contacts,
    navigationOptions: ({navigation})=> ({
      headerLeft: backButton('Contacts', navigation),
      headerRight:(
      <Button transparent style={{justifyContent:'center', alignItems:'center'}}
      onPress={()=>{
        navigation.navigate('code');
      }}>
        <Icon name='plus' type='FontAwesome' style={{color:'#FFF'}}/>
      </Button>),
      headerStyle: {
        backgroundColor: 'rgba(22, 122, 199,1.0)',
      }
    }),
  },
  code: {
    screen: CreateReferralsCode,
    navigationOptions: ({navigation})=> ({
      headerLeft: backButton('Get Code', navigation),
      headerStyle: {
        backgroundColor: 'rgba(22, 122, 199,1.0)',
      }
    }),
  },
});

export default ProfileStack;