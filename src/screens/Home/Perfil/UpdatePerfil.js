import React, {Component} from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { Container, Content, Form, Item, Input, Picker, Label, Left, Button, Icon, Body, Right, Text,
        Card, CardItem, ListItem, CheckBox } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import ImagePicker from 'react-native-image-picker';
import SubmitButton from '../../../sharedComponents/SubmitButton';
import Header from '../../../sharedComponents/Header';
import { InputFormApp } from '../../../sharedComponents/InputDicabeg';
import {InputPhoneNumber, PhoneNumberPerCountry} from '../../../sharedComponents/InputPhoneNumber';
import { getUserData, validateEmail, validatePassword, checkLoginField, appAlert } from '../../../helpers';
import { sendUpdateUserData } from '../../../Api';
import FadeIn from '../../../Animations/FadeIn';
import globalStyles from '../../../styles';
import EventEmitter from 'events';

class UpdatePerfil extends Component {
  constructor(props){
    super(props);
    this.successPassword = false;
    this._emitter = new EventEmitter();
    this.state = {
      username: '',
      password: '',
      changepassword:'',
      repeatpassword: '',
      phone: '',
      phoneNumberCode: '🇻🇪 +58',
      image: require('../../../assets/no_image.png'),
      showPasswordForm: false,
      showNumberCode:false,
      userError:''
    }
  }
    componentWillMount(){
      getUserData().then((data)=>{
        //let phone='';
        //let phoneNumberCode = '🇻🇪 +58';
        //if(data.phone) {
          //const phoneArray = data.phone.split('-');
          //phone = phoneArray[0];
          //phoneNumberCode = phoneArray[1];
        //}
        this.setState({
          username: data.username,
          //phone,
          //phoneNumberCode,
          image: data.image? data.image:require('../../../assets/no_image.png')
        });
      }).catch((ex)=>console.log(ex));
    }

    handlePressGoBack = ()=>{
      this._emitter.emit('userchange');
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
    

    handleUsername = ({value}) => {
      console.log(value);
      this.setState({username:value});
    }

    handlePhone = (value) => {
      this.setState({phone:value});
    }

    handlePassword = ({value, success, errorMessage}) => {
      this.handlePasswordState({ password:value }, success);
    }
    
    handleChangePassword = ({value, success}) => {
      this.handlePasswordState({ changepassword:value }, success);
    }

    handleRepeatPassword = ({value, success}) => {
      this.handlePasswordState({ repeatpassword:value }, success);
    }
    
    handlePasswordState(obj, success){
      this.successPassword = success;
      console.log(obj)
      this.setState(obj);
    }

    handleSelectNumberCode = ({flag, dial_code})=>this.setState({phoneNumberCode:`${flag} ${dial_code}`, showNumberCode:false});

    handleUpdatePress = () => {
      const code = this.state.phoneNumberCode.split(' ');
      const completePhoneNumber = `${code[1]}-${this.state.phone}`;
      const data = {
        username:this.state.username,
        //phone:completePhoneNumber
      }
      if(this.state.showPasswordForm) {
        if(!this.successPassword) {
          appAlert('Error en Contraseñas','Revise los datos para el cambio de contraseñas')
          return;
        } else {
          data.password = this.state.changepassword;
        }
      }
      sendUpdateUserData(data).then(()=>{
        this.props.emitter.emit('userchange');
        this.props.navigation.goBack();
      })
      .catch((ex)=>{
        if(ex.message.description){
          const description = ex.message.description;
          if(description.message){
            if(description === "username exist"){
              this.setState({userError:`Se recomienda el siguiente nombre: ${description.suggested_username}`})
            }
          }
        }
        console.log(`error enviando data:${JSON.stringify(ex)}`)
      });
    
    }

    render() {
        return (
            <Container>
            <Header color={globalStyles.darkBlue} title="Actualizar" onPress={()=>this.props.navigation.openDrawer()}/>
              <Content>
              <PhoneNumberPerCountry show={this.state.showNumberCode}
                onClose={()=>this.setState({showNumberCode:false})}
                onSelect={this.handleSelectNumberCode}/>
                <Grid style = {{paddingTop:20}}>
                  <Row style={{alignItems:'flex-start', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={this.handleImgPress} style={{marginBottom:15}}>
                      <Image style={styles.image} source={this.state.image}/>
                      <Label style={{textAlign:'center'}}>Escoger Imagen</Label>
                    </TouchableOpacity>
                  </Row>
                  <Row style={{marginBottom:20}}>
                  <Col>
                    <Form style={{marginLeft:5, padding:0}}>
                      <InputFormApp label="Nombre de Usuario" type="other" value={this.state.username} onChangeText={this.handleUsername}
                        errorMessage ={this.state.userError} stacked={true}/>
                      {/* <InputPhoneNumber 
                        onPress={()=>this.setState({showNumberCode:true})} 
                        value={{code:this.state.phoneNumberCode, number:this.state.phone}}
                        onChangeText = {(value)=>{
                          const testing = /^[0-9]*$/;
                          if(testing.test(value))
                            this.setState({phone:value});
                        }}/> */}
                    </Form>
                  </Col>
                  </Row>
                  {/* <Row style={{ marginVertical: 15}}>
                    <Col>
                    <View style={{ flex:1,flexDirection:'row', marginLeft:10}}>
                      <CheckBox checked={this.state.showPasswordForm} 
                        style={{marginRight:15}}
                        color={globalStyles.darkBlue}
                        onPress={()=>this.setState({showPasswordForm:!this.state.showPasswordForm})}/>
                      <Text>Cambiar Contraseña</Text>
                    </View>
                    </Col>
                  </Row> */}
                  {this.state.showPasswordForm && (
                  <Row>
                    <Col>
                    <FadeIn>
                    <View style={{marginLeft:15}}>
                      <Text style={{fontSize:14, color:'rgba(0,0,0,0.7)', textAlign:'left'}}>
                       * Contraseña debe tener al menos longitud 8, al menos 1 digito, 1 caracter especial (@$!%*#?&_-)
                      </Text>
                    </View>
                    <Form style={{marginLeft:5}}>
                      <InputFormApp label="Contraseña anterior" type="password" value={this.state.password} onChangeText={this.handlePassword}/>
                      <InputFormApp label="Nueva contraseña" type="password" value={this.state.changepassword} onChangeText={this.handleChangePassword}/>
                      <InputFormApp label="Confirmar nueva contraseña" type="repeatpassword" value={this.state.repeatpassword} onChangeText={this.handleRepeatPassword}
                        password={this.state.changepassword}/>
                    </Form>
                    </FadeIn>
                    </Col>
                  </Row>)}
                  <Row>
                    <Col>
                      <SubmitButton onPress = {this.handleUpdatePress} text="Actualizar" style={{marginHorizontal:15, marginVertical:25}}/>
                    </Col>
                  </Row>
                </Grid>
              </Content>
            </Container>
        );
    }

}

const styles = StyleSheet.create({
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

export default UpdatePerfil;