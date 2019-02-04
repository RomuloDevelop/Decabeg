import React, {Component} from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Container,Content, ListItem, Text, Separator, IconNB, Header, Right, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {NavigationActions} from 'react-navigation';
import { GoogleSignin , statusCodes } from 'react-native-google-signin';
import { LoginManager } from 'react-native-fbsdk';

class Perfil extends Component {
    constructor(props){
      super(props);
        this.state = {
          user:{}
        }
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
                        source={require('../../../assets/reactIcon.png')}
                        />
                  </Row>
                  <Row size={2}>
                  <Col style={{ backgroundColor: '#FFFFFF'}}>
                    <Separator bordered>
                      <Text style={styles.textSeparator}>Teléfono</Text>
                    </Separator>
                    <ListItem>
                      <Text>0424-0547850</Text>
                    </ListItem>
                    <Separator bordered>
                      <Text style={styles.textSeparator}>Nómbre</Text>
                    </Separator>
                    <ListItem>
                      <Text>Caroline Aaron</Text>
                    </ListItem>
                   </Col>
                   </Row>
                   <Row>
                    <Col>
                     <TouchableOpacity 
                       style = {styles.buttonContainer}
                       onPress = {this.signOut}>
                       <Text style = {styles.textButton}>SING OUT</Text>
                     </TouchableOpacity>
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