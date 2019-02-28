import React, {Component} from 'react';
import { 
    View,
    StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Left, Button, Icon, Body, Right, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import ImagePicker from 'react-native-image-picker';
import { getUserData } from '../../../dataStore/sessionData';
import { sendUpdateUserData } from '../../../Api/api';

class UpdatePerfil extends Component {
    state ={
      username: '',
      phone: '',
      image: require('../../../assets/reactIcon.png')
    }

    componentWillMount(){
      getUserData().then((data)=>{
        console.log(data)
        this.setState({
          username: data.username,
          phone: data.phone,
          image: data.image? data.image:require('../../../assets/reactIcon.png')
        });
      }).catch((ex)=>console.log(ex));
    }

    handlePressGoBack = ()=>{
        this.props.navigation.goBack();
    }

    handleImgPress = () => {
      ImagePicker.showImagePicker(null,(response) => {
        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = { uri: response.uri };
          console.log(source);
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      
          this.setState({
            image: source,
          });
        }
      });
      }
    

    handleUsername = (value) => {
      this.setState({username:value});
    }

    handlePhone = (value) => {
      this.setState({phone:value});
      
    }
    
    handleLoginPress = () => {
      sendUpdateUserData(this.state).then(()=>this.props.navigation.goBack())
      .catch((ex)=>{console.log(`error enviando data:${JSON.stringify(ex)}`)});
    }

    render() {
        return (
            <Container>
              <Content>
                <Grid>
                  <Row style={{alignItems:'flex-start', justifyContent: 'center'}}>
                    <Col style={styles.formImage}>
                      <TouchableOpacity
                       onPress={this.handleImgPress}>
                        <Label>Choose Image</Label>
                      </TouchableOpacity>
                      <Image style={styles.image}
                       source={this.state.image}/>
                    </Col>
                  </Row>
                  <Row>
                  <Col>
                    <Form style={{marginHorizontal:15}}>
                        <Item floatingLabel>
                          <Label>Username</Label>
                          <Input onChangeText={this.handleUsername} value={this.state.username}/>
                        </Item>
                        <Item floatingLabel>
                          <Label>Number</Label>
                          <Input onChangeText={this.handlePhone} value={this.state.phone}/>
                        </Item>
                    </Form>
                  </Col>
                  </Row>
                  <Row>
                    <Col>
                      <TouchableOpacity 
                            style = {[styles.buttonContainer,{marginHorizontal:15}]}
                            onPress = {this.handleLoginPress}>
                            <Text style = {styles.textButton}>Update</Text>
                      </TouchableOpacity>
                    </Col>
                  </Row>
                </Grid>
              </Content>
            </Container>
        )
    }

}
export default UpdatePerfil;

 
var styles = StyleSheet.create({
  image: {
      width: 100,
      height: 100,
      borderRadius: 100
  },
  formImage: {
      margin: 15
  },
  buttonContainer: {
    paddingVertical: 10,
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
  }
});