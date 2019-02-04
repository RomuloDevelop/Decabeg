import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
 import {createStackNavigator, createBottomTabNavigator, NavigationActions} from 'react-navigation';
 import { IconNB, Icon, Button } from 'native-base';
 import UpdatePerfil from './Perfil/UpdatePerfil'
 import History from './Perfil/History';
 import Contacts from './Perfil/Contacts';
 import AddRefers from './Perfil/AddRefers';
 import HomeList from './Perfil/HomeList';
 import Actions from './Monedero/ActionStack';
 //import Tabs from './Monedero/ActionStack';

 import globalStyles from '../../styles';

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
        navigation.navigate('addRefers');
      }}>
        <Icon name='plus' type='FontAwesome' style={{color:'#FFF'}}/>
      </Button>),
      headerStyle: {
        backgroundColor: 'rgba(22, 122, 199,1.0)',
      }
    }),
  },
  addRefers: {
    screen: AddRefers,
    navigationOptions: ({navigation})=> ({
      headerLeft: backButton('Add Refers', navigation)
    }),
  }

}
 )
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

// const HomeStack = createStackNavigator( 
//   {
//     home: {
//       screen: MenuTab,
//       navigationOptions:{
//         header: null
//       }
//     },
//     anuncios: {
//       screen: Anuncio,
//       navigationOptions: {
//         title: 'Anuncios'
//       }
//     }
//   }
// );
  