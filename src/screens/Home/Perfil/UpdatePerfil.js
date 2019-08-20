import React, {Component} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Container, Content, Form, Text, CheckBox } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import ImagePicker from 'react-native-image-picker';
import SubmitButton from '../../../sharedComponents/SubmitButton';
import Header from '../../../sharedComponents/Header';
import { InputFormApp } from '../../../sharedComponents/InputDicabeg';
//import {InputPhoneNumber, PhoneNumberPerCountry} from '../../../sharedComponents/InputPhoneNumber';
import DynamicForm from '../../../sharedComponents/DynamicForm';
import LoaderScreen from '../../../sharedComponents/LoadScreen';
import SendEmailCode from '../../../sharedComponents/SendEmailCode';
import { getUserData, appAlert, setUserData } from '../../../helpers';
import { sendUpdateUserData, sendCodeForNewPassword, sendCodeForNewEmail } from '../../../Api';
import FadeIn from '../../../Animations/FadeIn';
import globalStyles from '../../../styles';
import EventEmitter from 'events';

const CheckBoxWithText = (props)=>(
  <Row style={{ marginVertical: 15}}>
    <Col>
  <View style={{ flex:1,flexDirection:'row', marginLeft:10}}>
    <CheckBox
      style={{marginRight:15}}
      color={globalStyles.darkBlue}
      {...props}/>
    <Text>{props.text}</Text>
  </View>
  </Col>
  </Row>
)


class UpdatePerfil extends Component {
  constructor(props){
    super(props);
    this._emitter = new EventEmitter();
    this.successPassword = false;
    this.successRepeatPassword = false;
    this.state = {
      username: '',
      temporal_code_email: '',
      email: '',
      new_email: '',
      password: '',
      showSuccessPassword: false,
      temporal_code_pass: '',
      changepassword:'',
      repeatpassword: '',
      phone: '',
      phoneNumberCode: '🇻🇪 +58',
      image: require('../../../assets/no_image.png'),
      showEmailForm: false,
      showPasswordForm: false,
      showNumberCode:false,
      userError:'',
      loading: false
    }
  }
    setData=()=>{
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
          email: data.email,
          //phone,
          //phoneNumberCode,
          image: data.image? data.image:require('../../../assets/no_image.png')
        });
      }).catch((ex)=>console.log(ex));
    }
    componentWillMount(){
      this.setData();
    }

    // handleImgPress = () => {
    //   ImagePicker.showImagePicker(null,(response) => {
    //     console.log('Response = ', response);
      
    //     if (response.didCancel) {
    //       console.log('User cancelled image picker');
    //     } else if (response.error) {
    //       console.log('ImagePicker Error: ', response.error);
    //     } else if (response.customButton) {
    //       console.log('User tapped custom button: ', response.customButton);
    //     } else {
    //       const source = { uri: response.uri };
    //       console.log(source);
    //       // You can also display the image using data:
    //       // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      
    //       this.setState({
    //         image: source,
    //       });
    //     }
    //   });
    //   }
    

    // handleUsername = ({value}) => {
    //   console.log(value);
    //   this.setState({username:value});
    // }

    // handlePhone = (value) => {
    //   this.setState({phone:value});
    // }

    handleEmail = ({value, success, errorMessage}) => {
      this.successEmail = success;
      console.log({ new_email:value })
      this.setState({ new_email:value });
    }
    
    handleChangePassword = ({value, success}) => {
      this.successPassword = success;
      this.setState({changepassword:value, showSuccessPassword:!success});
    }

    handleRepeatPassword = ({value, success}) => {
      this.successRepeatPassword = success;
      this.setState({repeatpassword:value});
    }
    
    handlePasswordState(obj, success){
      console.log(obj)
      this.setState(obj);
    }

    //handleSelectNumberCode = ({flag, dial_code})=>this.setState({phoneNumberCode:`${flag} ${dial_code}`, showNumberCode:false});
    
    handleSendEmailCode = async (data)=>{
      try{
        this.modal.Close();
        this.setState({loading:true});
        await sendCodeForNewEmail(data);
        const newData = await getUserData();
        newData.email= data.new_email;
        await setUserData(newData);
        this._emitter.emit('userchange','');
        this.setState({email:data.new_email, showEmailForm:false, loading: false});
      }catch(ex){
        this.setState({loading: false});
        appAlert('Email','Hubo un error al realizar la operación');
        console.log(ex);
      }
    }

    handleSendPasswordCode = ()=>{
      if(!this.state.showPasswordForm){
        appAlert('Cambio de Contraseña', 'Al aceptar, se le enviara un código de verificacion que debera ingresar junto con los datos de su nueva contraseña. Si ya posee uno presione cancelar',
        ()=>this.setState(()=>({loading:true}),async ()=>{
            try{
              await sendCodeForNewPassword();
              this.setState({loading:false});
            }catch(ex){
              this.setState({loading:false});
              console.log(ex);
            }
          }
        ));
      }
      this.setState({showPasswordForm:!this.state.showPasswordForm})
    }
    // handleUpdatePress = () => {
    //   const code = this.state.phoneNumberCode.split(' ');
    //   const completePhoneNumber = `${code[1]}-${this.state.phone}`;
    //   const data = {
    //     email:this.state.email,
    //     //phone:completePhoneNumber
    //   }
    //   if(this.state.showPasswordForm) {
    //     if(!this.successPassword) {
    //       appAlert('Error en Contraseñas','Revise los datos para el cambio de contraseñas')
    //       return;
    //     } else {
    //       data.password = this.state.changepassword;
    //     }
    //   }
    //   sendUpdateUserData(data).then(()=>{
    //     this.props.emitter.emit('userchange');
    //     this.props.navigation.goBack();
    //   })
    //   .catch((ex)=>{
    //     if(ex.message.description){
    //       const description = ex.message.description;
    //       if(description.message){
    //         if(description === "username exist"){
    //           this.setState({userError:`Se recomienda el siguiente nombre: ${description.suggested_username}`})
    //         }
    //       }
    //     }
    //     console.log(`error enviando data:${JSON.stringify(ex)}`)
    //   });
    
    // }

    render() {
        return (
          <Container>
            <Header color={globalStyles.darkBlue} title="Actualizar" onPress={()=>this.props.navigation.openDrawer()}/>
            <Content>
            <LoaderScreen loading = {this.state.loading}/>
            <SendEmailCode ref={ref=>this.modal = ref} onPressSubmit={this.handleSendEmailCode}
            email = {this.state.new_email} hasCloseButton/>
              {/* <PhoneNumberPerCountry show={this.state.showNumberCode}
                onClose={()=>this.setState({showNumberCode:false})}
                onSelect={this.handleSelectNumberCode}/> */}
              <DynamicForm>
                <Grid style = {{paddingTop:20}}>
                  {/* <Row style={{alignItems:'flex-start', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={this.handleImgPress} style={{marginBottom:15}}>
                      <Image style={styles.image} source={this.state.image}/>
                      <Label style={{textAlign:'center'}}>Escoger Imagen</Label>
                    </TouchableOpacity>
                  </Row> */}
                  <Row style={{marginBottom:20}}>
                  <Col>
                    <Form style={{marginLeft:5, padding:0}}>
                      <InputFormApp label="Nombre de Usuario" value={this.state.username}
                      stacked={true} disabled={true}/>
                      <InputFormApp label="Email" type="email" value={this.state.email} 
                      stacked={true} disabled={true}/>
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
                  <CheckBoxWithText text="Cambiar Email" 
                  checked={this.state.showEmailForm}
                  onPress = {()=>this.setState({showEmailForm:!this.state.showEmailForm})}/>
                  <Row>
                    {this.state.showEmailForm && (
                      <Grid>
                      <Row>
                        <Col>
                        <FadeIn>
                    <View style={{marginLeft:15}}>
                      <Text style={styles.textInfo}>
                       * Si ya tienes código puedes saltar al {"\n"}
                       <Text style={{color: '#0000ff55'}}
                       onPress={()=>this.modal.Open()}>&nbsp;siguiente paso</Text> 
                      </Text>
                    </View>
                        <Form style={{marginLeft:5}}>
                          <InputFormApp label="Nuevo Email" type="email" value={this.state.new_email} 
                          onChangeText={this.handleEmail}/>
                        </Form>
                        </FadeIn>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <SubmitButton onPress={()=>{
                            if(!this.successEmail){
                              appAlert('Email', 'El email no corresponde a un formato válido');
                              return;
                            }
                            this.setState(()=>({loading:true}),()=>{
                              sendCodeForNewEmail({new_email:this.state.new_email})
                              .then(()=>this.modal.Open())
                              .catch((ex)=>console.log(ex))
                              .finally(()=>this.setState({loading:false}));
                            });
                          }} text="Actualizar Email" style={{marginHorizontal:15, marginVertical:25}}/>
                        </Col>
                      </Row>

                      </Grid>
                    )}
                  </Row>
                  <CheckBoxWithText text="Cambiar Contraseña"
                  checked={this.state.showPasswordForm}
                  onPress={this.handleSendPasswordCode}/>
                  <Row>
                  {this.state.showPasswordForm && (
                    <Grid>
                  <Row>
                    <Col>
                    <FadeIn>
                    <View style={{marginLeft:15}}>
                      <Text style={[styles.textInfo,{color:(this.state.showSuccessPassword)?'red':'#000'}]}>
                       * Contraseña debe tener entre 8 y 15 caracteres, al menos 1 digito y 1 caracter especial (@$!%*#?&_-)
                      </Text>
                    </View>
                    <Form style={{marginLeft:5}}>
                      <InputFormApp label="Código" value={this.state.temporal_code} onChangeText={({value})=>this.setState({temporal_code_pass:value})}/>
                      <InputFormApp label="Nueva contraseña" type="password" value={this.state.changepassword} onChangeText={this.handleChangePassword}/>
                      <InputFormApp label="Confirmar nueva contraseña" type="repeatpassword" value={this.state.repeatpassword} onChangeText={this.handleRepeatPassword}
                        password={this.state.changepassword}/>
                    </Form>
                    </FadeIn>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col>
                      <SubmitButton onPress = {
                        ()=>this.setState(()=>({loading:true}),async ()=>{
                          try{
                            if(this.successRepeatPassword && this.successRepeatPassword && this.state.temporal_code_pass.length>0){
                              await sendCodeForNewPassword({
                                temporal_code:this.state.temporal_code_pass, 
                                new_password: this.state.changepassword
                              });
                              appAlert('Contraseña','Contraseña cambiada con exito');
                              this.setState({loading:false, showPasswordForm:false});
                            } else {
                              console.log(this.successRepeatPassword,this.successRepeatPassword)
                              appAlert('Error en Contraseñas','Revise los datos para el cambio de contraseñas');
                              this.setState({loading:false});
                            }
                          }catch(ex){
                            this.setState({loading:false});
                            if(ex.message)
                              if(ex.message.description === 'code invalid or used' || ex.message.description === 'code incorrect')
                                appAlert('Código inválido', 'Este código caducó o es inválido');
                          }
                        })
                      } text="Actualizar Contraseña" style={{marginHorizontal:15, marginVertical:25}}/>
                    </Col>
                  </Row>
                  </Grid>
                  )}
                  </Row>
                </Grid>
              </DynamicForm>
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
  },
  textInfo:{fontSize:14, color:'rgba(0,0,0,0.7)', textAlign:'left'}
});

export default UpdatePerfil;