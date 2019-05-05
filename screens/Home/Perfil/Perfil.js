import React, {Component} from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Container,Content, ListItem, Text, Separator, IconNB, Header, Right, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {NavigationActions} from 'react-navigation';
import { GoogleSignin , statusCodes } from 'react-native-google-signin';
import { LoginManager } from 'react-native-fbsdk';
import SubmitButton from '../../sharedComponents/SubmitButton';
import { getUserData } from '../../../helpers';

class Perfil extends Component {
    constructor(props){
      super(props);
        this.state = {
          userData:{}
        }
    }

    componentWillMount(){
       userInfo();
    }

    async userInfo(){
      const userData = await getUserData();
      this.setState({userData});
    }
    signOut = async () => {
      try {
        if(await GoogleSignin.isSignedIn()){
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
        } else {
          LoginManager.logOut();
        }
        this.setState({ user: null }); // Remember to remove the user from your app's state as well
        this.props.navigation.dispatch(NavigationActions.back());
      } catch (error) {
        alert(error);
        console.error(error);
      }
    };
    render() {

        return (
          <Container>
            <Content>
                <Grid>
                  <Row size={5} style={{ backgroundColor: 'rgba(41, 128, 185,1.0)', alignItems: 'center', justifyContent: 'center'}}>
                    <Image 
                        style={styles.image}
                        source={this.state.userData.image?
                          this.state.userData.image:
                          require('../../../assets/reactIcon.png')}
                        />
                  </Row>
                  <Row size={2}>
                  <Col style={{ backgroundColor: '#FFFFFF'}}>
                    <Separator bordered>
                      <Text style={styles.textSeparator}>Teléfono</Text>
                    </Separator>
                    <ListItem>
                      <Text>{this.state.userData.phone}</Text>
                    </ListItem>
                    <Separator bordered>
                      <Text style={styles.textSeparator}>Nómbre</Text>
                    </Separator>
                    <ListItem>
                      <Text>{`${this.state.userData.names} ${this.state.userData.lastnames}`}</Text>
                    </ListItem>
                   </Col>
                   </Row>
                   <Row>
                    <Col>
                    <SubmitButton  onPress = {this.signOut} text="SING OUT"/>
                     {/* <TouchableOpacity 
                       style = {style.buttonContainer}
                       onPress = {this.signOut}>
                       <Text style = {style.textButton}>SING OUT</Text>
                     </TouchableOpacity> */}
                    </Col>
                   </Row>
                </Grid>
            </Content>
          </Container>
        )
    }

}
export default Perfil;

 
// Later on in your styles..
var styles = StyleSheet.create({
  image: {
      width: 200,
      height: 200,
      borderRadius: 200
  },
  textSeparator: {
      fontSize: 13,
  },    
  buttonContainer: {
    paddingVertical: 10,
    marginHorizontal: 15,
    marginVertical: 15,
    backgroundColor: 'rgba(41, 128, 185,1.0)',
    borderRadius: 10,
    elevation: 1,
    shadowOpacity: 2,
    shadowRadius: 2,
    shadowColor: '#000'
  },  
  textButton: {
    color: '#FFF',
    textAlign: 'center'
  },
});