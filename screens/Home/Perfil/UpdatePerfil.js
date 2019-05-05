import React, {Component} from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Left, Button, Icon, Body, Right, Text,
        Card, CardItem, ListItem, CheckBox } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import ImagePicker from 'react-native-image-picker';
import SubmitButton from '../../sharedComponents/SubmitButton';
import { getUserData, validateEmail, validatePassword } from '../../../helpers';
import { sendUpdateUserData } from '../../../Api';
import FadeIn from '../../../Animations/FadeIn';
import globalStyles from '../../../styles';
class UpdatePerfil extends Component {
    state = {
      username: '',
      user:'',
      password: '',
      changepassword:'',
      repeatpassword: '',
      phone: '',
      image: require('../../../assets/reactIcon.png'),
      showPasswordForm: false,
      error:2
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

    handleUser = (value) => {
      this.setState({user:value});
    }

    handlePassword = (value) => {
      this.setState({password:value});
    }
    
    handleChangePassword = (value) => {
      this.setState({changepassword:value});
    }

    handleRepeatPassword = (value) => {
      this.setState({repeatpassword:value});
    }

    handlePhone = (value) => {
      this.setState({phone:value});
      
    }
    
    handleLoginPress = () => {
      if(this.state.showPasswordForm) {
        const {password, changepassword, repeatpassword} = this.state;
        if(!validatePassword(changepassword)) {
          this.setState({error:2})
          return;
        }
        if(changepassword !== repeatpassword){
          this.setState({error:3})
          return;
        }
      }
      sendUpdateUserData(this.state).then(()=>this.props.navigation.goBack())
      .catch((ex)=>{console.log(`error enviando data:${JSON.stringify(ex)}`)});
    }

    render() {
        return (
            <Container>
              <Content>
                <Grid style = {{paddingTop:20}}>
                  <Row style={{alignItems:'flex-start', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={this.handleImgPress} style={{marginBottom:15}}>
                      <Image style={styles.image} source={this.state.image}/>
                      <Label style={{textAlign:'center'}}>Choose Image</Label>
                    </TouchableOpacity>
                  </Row>
                  <Row style={{marginBottom:20}}>
                  <Col>
                    <Form style={{marginLeft:5, padding:0}}>
                        <Item floatingLabel>
                          <Label>Nombre de Usuario</Label>
                          <Input onChangeText={this.handleUsername} value={this.state.username}/>
                        </Item>
                        {/* <Item floatingLabel>
                          <Label>Email</Label>
                          <Input onChangeText={this.handleUser} value={this.state.user}/>
                        </Item> */}
                        <Item floatingLabel>
                          <Label>Numero</Label>
                          <Input onChangeText={this.handlePhone} value={this.state.phone}/>
                        </Item>
                    </Form>
                  </Col>
                  </Row>
                  <Row style={{ marginVertical: 15}}>
                    <Col>
                    <View style={{ flex:1,flexDirection:'row', marginLeft:10}}>
                      <CheckBox checked={this.state.showPasswordForm} 
                        style={{marginRight:15}}
                        color={globalStyles.darkBlue}
                        onPress={()=>this.setState({showPasswordForm:!this.state.showPasswordForm})}/>
                      <Text>Cambiar Contraseña</Text>
                    </View>
                    </Col>
                  </Row>
                  {this.state.showPasswordForm && (
                  <Row>
                    <Col>
                    <FadeIn>
                    <View style={{marginLeft:15}}>
                      <Text style={{fontSize:14, color:this.state.error===2?'rgba(255,0,0.7)':'rgba(0,0,0,0.7)', textAlign:'left'}}>
                      * Password must have lenght 8, at least 1 digit, 1 special character (@$!%*#?&_-)
                      </Text>
                    </View>
                    <Form style={{marginLeft:5}}>
                        <Item floatingLabel>
                          <Label>Contraseña anterior</Label>
                          <Input onChangeText={this.handlePassword} value={this.state.password}/>
                          <Icon name='checkmark-circle' />
                        </Item>
                        <Item floatingLabel>
                          <Label>Nueva contraseña</Label>
                          <Input onChangeText={this.handleChangePassword} value={this.state.changepassword}/>
                          <Icon name='checkmark-circle' />
                        </Item>
                        <Item floatingLabel>
                          <Label>Confirmar nueva contraseña</Label>
                          <Input onChangeText={this.handleRepeatPassword} value={this.state.repeatpassword}/>
                          <Icon name='checkmark-circle' />
                        </Item>
                    </Form>
                    </FadeIn>
                    </Col>
                  </Row>)}
                  <Row>
                    <Col>
                    <SubmitButton onPress = {this.handleLoginPress} text="Update" style={{marginHorizontal:15, marginVertical:25}}/>
                      {/* <TouchableOpacity 
                            style = {[styles.buttonContainer,{marginHorizontal:15}]}
                            onPress = {this.handleLoginPress}>
                            <Text style = {styles.textButton}>Update</Text>
                      </TouchableOpacity> */}
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
      width: Dimensions.get('window').height / 5,
      height: Dimensions.get('window').height / 5,
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