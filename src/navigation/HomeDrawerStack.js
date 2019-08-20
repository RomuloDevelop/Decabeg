import React from 'react';
import { StyleSheet, View, Image, ScrollView, Alert} from 'react-native';
import {createDrawerNavigator, createStackNavigator, SafeAreaView} from 'react-navigation';
import { IconNB, Icon, Button, Text, List, ListItem, Body,Title, Left, Right, Header } from 'native-base';
import Actions from './ActionStack';
import UpdatePerfil from '../screens/Home/Perfil/UpdatePerfil'
import History from '../screens/Home/Perfil/History';
import Transacciones from '../screens/Home/Perfil/Transacciones';
import Contacts from '../screens/Home/Perfil/Contacts';
import CreateReferralsCode  from '../screens/Home/Perfil/CreateReferralsCode';
import SubmitButton from '../screens/../sharedComponents/SubmitButton';
import LoaderScreen from '../screens/../sharedComponents/LoadScreen';
import {signOut, getUserData} from '../helpers';
import globalStyles from '../styles';
import EventEmitter from 'events';

const emitter = new EventEmitter();

class CustomDrawerContentComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username:'',
      image:'',
      email:'',
      disableSubmit: false
    };
  }
  async getDrawerData(){
    try {
      const {username,image,email} = await getUserData();
      this.setState({username,image,email});
    } catch(ex) {
      console.log(ex);
    }
  }
  componentDidMount(){
    this.getDrawerData();
    this.props.emitter.on('userchange',async()=>{
      await this.getDrawerData();
    });
  }

  render(){
    return (
  <ScrollView>
    <LoaderScreen loading ={this.state.disableSubmit}/>
    <View style={{
      borderRadius:27,
      flexDirection:'column', 
      alignItems:'center', 
      margin:13, //'rgb(180,180,180)',
      paddingVertical: 20,
      backgroundColor:globalStyles.mediumBlue}}>
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 100
          }}
          source={require('../assets/no_image.png')} />
        <View style={{justifyContent:'center'}}>
          <Text style={{fontSize:18, textAlign:'center', color:'white'}}>
            {this.state.username}
          </Text>
          <Text style={{fontSize:15, textAlign:'center', color:'white'}}>{this.state.email}</Text>
        </View>
    </View>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <List>
        <ListItem noIndent onPress={() => this.props.navigation.navigate('home',{username:this.state.username})}>
          <Left>
            <Button transparent>
              <Icon name='ios-card' style = {{color: globalStyles.darkBlue, marginRight:10, fontSize:24}}/>
            </Button>
            <Text style={{fontSize:18}}>Monedero</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem noIndent onPress={() => this.props.navigation.navigate('updateperfil')}>
          <Left>
            <Button transparent>
              <IconNB  type="FontAwesome" name='pencil'
              style = {{color: globalStyles.darkBlue, marginRight:10, fontSize:24}}/>
            </Button>
            <Text style={{fontSize:18}}>Editar</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem noIndent onPress={() => this.props.navigation.navigate('history')}>
          <Left>
            <Button transparent>
              <Icon name='history' type="FontAwesome"
              style={{color: globalStyles.darkBlue, marginRight:10}}/>
            </Button>
            <Text style={{fontSize:18}}>Historial</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem noIndent onPress={() => this.props.navigation.navigate('transacciones')}>
          <Left>
            <Button transparent>
              <Icon name='search' type="FontAwesome"
              style={{color: globalStyles.darkBlue, marginRight:10}}/>
            </Button>
            <Text style={{fontSize:18}}>Transacciones</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        {/* <ListItem noIndent onPress={() => this.props.navigation.navigate('contacts')}>
          <Left>
            <Button transparent>
              <Icon name='address-book' type="FontAwesome"
              style={{color: globalStyles.darkBlue, marginRight:10}}/>
            </Button>
            <Text style={{fontSize:18}}>Referidos</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem> */}
        {/* <ListItem noIndent onPress={() => this.props.navigation.navigate('code')}>
          <Left>
            <Button transparent>
              <Icon name='connectdevelop' type="FontAwesome"
              style={{color: globalStyles.darkBlue, marginRight:10}}/>
            </Button>
            <Text style={{fontSize:18}}>Generar Codigo</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem> */}
      </List>
      <SubmitButton
        style={{marginVertical:25}}
        onPress = {()=>{
          Alert.alert(
            'Cerrando sesion',
            '¿Estas seguro de cerrar sesion?',
            [
              {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK', onPress: ()=>{
                  this.setState(()=>({disableSubmit:true}),signOut);
                }
              },
            ],
            {cancelable: false},
          );}
        }
        text = "Cerrar sesion"/>
    </SafeAreaView>
  </ScrollView>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const HomeDrawerStack = createDrawerNavigator({  
  home:{
    screen: createStackNavigator({
      actions:{
        screen: Actions,
        navigationOptions: ({navigation})=> ({
          //title: 'Monedero',
          headerTintColor: '#fff',
          headerLeft: (
            <Button transparent onPress={()=>navigation.openDrawer()}>
              <Icon name='menu' style={{color:'#ffffff', fontSize:30}}/>
            </Button>
          ),
          headerRight: (
            <Button transparent onPress={()=>navigation.navigate('configurations')}>
              <Icon type='FontAwesome' name='cog' style={{color:'#ffffff', fontSize:30}}/>
            </Button>
          ),
          headerStyle: {

            backgroundColor: globalStyles.mediumBlue,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitle:(<Text style={{marginLeft:20, color:'#fff', fontSize:20}}>Monedero</Text>)
        })
      }
    }),
  },
  history: {
    screen: History,
  },
  transacciones: {
    screen: Transacciones,
  },
  updateperfil: {
    screen: (props)=><UpdatePerfil {...props} emitter={emitter}/>,
  },
  contacts: {
    screen: Contacts,
  },
  code: {
    screen: CreateReferralsCode,
  }
},{
  hideStatusBar: true,
  contentComponent: (props)=><CustomDrawerContentComponent {...props} emitter = {emitter}/>,
});


export default HomeDrawerStack;