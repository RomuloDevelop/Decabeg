import React , {Component} from 'react';
import {Container, Content, Icon,IconNB, List, ListItem, Text, Left, Right, Button} from 'native-base';
import {View,Image,TouchableOpacity, Alert, NativeEventEmitter } from 'react-native';
import { getUserData, clearData } from '../../../dataStore/sessionData';
import { signOut as googleSingOut } from '../../../Api/SessionManager/googleApi'
import { signOut as facebookSingOut } from '../../../Api/SessionManager/facebookApi'
import {sendUserLogOut} from '../../../Api/api';

import globalStyles, {buttonForm} from '../../../styles';

export default class HomeList extends Component {    
  constructor(props){
    super(props);
    this.state = {
      userData:{}
    }
  }

  componentWillMount(){
    const {navigation} = this.props;
    navigation.addListener('didFocus',()=>{
      getUserData().then((userData)=>{
        this.setState({userData});
      }).catch((ex)=>console.log(ex));
    });
  }

  signOutConfirmation=()=>{
    Alert.alert(
      'Sign Out',
      'Are you sure to sign out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', onPress: this.signOut
        },
      ],
      {cancelable: false},
    );
  }

  signOut = async () => {
    try {
      await googleSingOut();
      await facebookSingOut();
      const data = await sendUserLogOut();
      if(data){
        await clearData();
        this.props.navigation.navigate('login');
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  render(){
    return(
      <Container>
        <Content>
            <View style={{
              borderRadius:27,
              flexDirection:'row', 
              alignItems:'stretch', 
              margin:13, //'rgb(180,180,180)'
              backgroundColor:globalStyles.mediumBlue}}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 100}}
                    source={this.state.userData.image?
                            this.state.userData.image:
                            require('../../../assets/user.png')} />
                <View style={{justifyContent:'center'}}>
                    <Text style={{fontSize:20, textAlign:'center', color:'white'}}>
                      {(this.state.userData.username)?
                      `${this.state.userData.username}`:
                      (this.state.userData.lastnames?`
                      ${this.state.userData.names} ${this.state.userData.lastnames}`:
                      `${this.state.userData.names}`)}
                    </Text>
                    <Text style={{fontSize:20, textAlign:'center', color:'white'}}>{this.state.userData.phone}</Text>
                </View>
            </View>
          <List>
            <ListItem noIndent
                onPress={() => this.props.navigation.navigate('updateperfil')}>
              <Left>
                <Button transparent>
                  <IconNB  type="FontAwesome" name='pencil'
                  style = {{color: 'rgba(41, 128, 185,1.0)', marginRight:10, fontSize:24}}/>
                </Button>
                <Text style={{fontSize:18}}>Editar</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem noIndent
                onPress={() => this.props.navigation.navigate('history')}>
              <Left>
                <Button transparent>
                  <Icon name='history' type="FontAwesome"
                  style={{color: 'rgba(41, 128, 185,1.0)', marginRight:10}}/>
                </Button>
                <Text style={{fontSize:18}}>History</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem noIndent
                onPress={() => this.props.navigation.navigate('contacts')}>
              <Left>
                <Button transparent>
                  <Icon name='address-book' type="FontAwesome"
                  style={{color: 'rgba(41, 128, 185,1.0)', marginRight:10}}/>
                </Button>
                <Text style={{fontSize:18}}>Referrals</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem noIndent
                onPress={() => this.props.navigation.navigate('code')}>
              <Left>
                <Button transparent>
                  <Icon name='connectdevelop' type="FontAwesome"
                  style={{color: 'rgba(41, 128, 185,1.0)', marginRight:10}}/>
                </Button>
                <Text style={{fontSize:18}}>Generate Code</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
            <TouchableOpacity 
                  style = {buttonForm.buttonContainer}
                  onPress = {this.signOutConfirmation}>
                  <Text style = {buttonForm.textButton}>SING OUT</Text>
            </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}
