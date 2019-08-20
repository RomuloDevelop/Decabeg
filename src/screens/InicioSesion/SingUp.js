import React, {Component}  from 'react';
import { View, ScrollView, TextInput, StyleSheet} from 'react-native';
import { Badge, Text, Icon } from 'native-base';
import { sendUserSignUp } from '../../Api';
import {appAlert, validateEmail, validatePassword, validateChangePassword} from '../../helpers';
import LoaderScreen from '../../sharedComponents/LoadScreen';
import {PickerLogin, CheckBoxFormApp} from '../../sharedComponents/InputDicabeg';
import DynamicForm from '../../sharedComponents/DynamicForm';
import SubmitButton from '../../sharedComponents/SubmitButton';
import {InputLogin} from '../../sharedComponents/InputDicabeg';
import globalStyles from '../../styles';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment-timezone';

class SingUp extends Component{
    constructor(props){
        super(props);
        this.timezones=moment.tz.names().map((item)=>(
            {
                label:` (GMT+${moment.tz(item).format('z')}) ${item}`, 
                value:item
            }
        ));
        this.validEmail= false;
        this.validRepassword = false;
        this.validPassword = false;
        this.state = {
            username: '',
            email: '',
            password: '',
            invite_code:'',
            repeatpassword: '',
            timezone: DeviceInfo.getTimezone(),
            acceptTerms:false,
            validEmail: false,
            showInvalidEmail:false,
            showInvalidRepeatPassword: false,
            showInvalidPassword: false,
            iconName: 'eye',
            security: true,
            showCode:false,
            disableSubmit: false,
            errorDuplicatedUser:'',
            errorDuplicatedEmail:''
        }
    }
    componentDidMount(){
        const {navigation} = this.props;
        const showCode = navigation.getParam('showCode', false);
        const invite_code = navigation.getParam('code','');
        this.setState({invite_code, showCode});
    }

    errorForDuplicatedKey(ex){
        try {
            if(!ex.message.description)
                throw ex;
            const description = ex.message.description;
            if(typeof description === 'string'){
                if(description.includes('email') && description.includes('exist'))
                    this.setState({errorDuplicatedEmail:'El correo ya existe'});
            } else if(description.message){
                if(description.message === "username exist"){
                    this.setState({errorDuplicatedUser:`Se sugiere ${description.suggested_username}`});
                } else throw ex;
            } else 
                throw ex;
        } catch(ex) {
            console.log(ex);
        }
    }

    goToGetCode=()=>this.props.navigation.navigate('sendCode',{email:this.state.email})
    
    handlePickerValueChange = (itemValue, itemIndex) =>this.setState({timezone: itemValue})

    handleChangeUsername = (value) => this.setState({username:value})
    
    handleChangeEmail = (value) => {
        const validEmail = validateEmail(value);
        this.setState({email:value, validEmail});
    }
    
    handleBlurEmail = (value) => {
        this.setState({showInvalidEmail:true});
    }

    handleChangePassword = (value) => {
        this.validPassword = validatePassword(value);
        this.validRepassword = validateChangePassword(this.state.repeatpassword, value);
        this.setState({password:value});
    }
    
    handleBlurPassword = () => {
        this.setState({showInvalidPassword: !this.validPassword});
    }

    handleChangeRepeatpassword = (value) => {
        let {password} = this.state;
        this.validRepassword = validateChangePassword(value,password);
        this.setState({repeatpassword: value});
    }

    handleBlurRepeatpassword = () => {
        this.setState({showInvalidRepeatPassword: !this.validRepassword});
    }

    handlePressSingUp = async ()=>{
        try {
            if(this.state.validEmail && this.validPassword && this.validRepassword){
                const userAccount = {
                    username:this.state.username,
                    email:this.state.email,
                    password:this.state.password,
                    send_email:true,
                    time_zone:this.state.timezone
                };
                if(this.state.showCode) userAccount.invite_code = this.state.invite_code;
                //active page
                if(!this.state.acceptTerms){
                    appAlert('Terminos y Condiciones', "Debe aceptar nuestros Terminos y Condiciones");
                    return;
                }
                this.setState(()=>({disableSubmit:true, errorDuplicatedEmail: '', errorDuplicatedUser:''}),()=>{
                    sendUserSignUp(userAccount).then((data)=>{
                        this.setState(()=>({disableSubmit:false}),()=>{
                            this.goToGetCode();
                        });
                    }).catch((ex)=>{
                        this.errorForDuplicatedKey(ex);
                        console.log(ex);
                        this.setState({disableSubmit:false});
                    });
                });
            } else {
                this.setState({showInvalidPassword:!this.validPassword, showInvalidRepeatPassword:!this.validRepassword});
            }
        } catch(ex){
            this.setState({disableSubmit:false});
            //Inactive load page
            console.log(ex);
        }
      }
    render(){
        return (           
        <ScrollView style ={{backgroundColor: globalStyles.fontBrown}}>
            <LoaderScreen loading ={this.state.disableSubmit}/>
            <View style ={styles.container}>
                <Text style={{fontSize:25, color:'#fff', textAlign:'center', margin:30}}>
                    CREAR CUENTA
                </Text>
            <DynamicForm>
                <Text style={{fontSize:14, color:(this.state.showInvalidPassword)?'red':'rgba(255,255,255,0.5)', textAlign:'left', margin:10}}>
                    * Contraseña debe tener entre 8 y 15 caracteres, al menos 1 digito y un 1 caracter especial (@$!%*#?&_-)
                </Text>
                <InputLogin
                    placeholder = "Nombre de Usuario"
                    value = {this.state.username}
                    onChangeText={this.handleChangeUsername}
                    maxLength={20}/>
                {this.state.errorDuplicatedUser !== '' && (
                    <Badge danger style={{marginBottom: 20}}>
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems: 'center'}}>
                            <Icon name="times-circle" type='FontAwesome' style={styles.badgeIcon}/>
                            <Text>{this.state.errorDuplicatedUser}</Text> 
                        </View>
                    </Badge>
                )}
                <View style={[styles.inputIconContainer,styles.inputContainer,
                    {borderColor:this.state.showInvalidEmail?(this.state.validEmail?'green':'red'):'rgba(255,255,255,0)',
                    borderWidth:1}]}>
                    <TextInput
                        style = {styles.innerInput}
                        placeholder = "Email"
                        placeholderTextColor = "rgba(255,255,255,0.7)"
                        value = {this.state.email}
                        onBlur = {this.handleBlurEmail}
                        onChangeText={this.handleChangeEmail}
                        autoCapitalize='none'
                        autoCorrect={false}
                        selectionColor={globalStyles.darkBlue}
                    ></TextInput>{
                        this.state.showInvalidEmail&&
                    <Icon 
                        style={[styles.inputIcon, {
                            color:(this.state.validEmail?'#00FF00':'red')
                        }]}
                        name={this.state.validEmail?'checkmark-circle':'close-circle'}
                        size={20} />
                    }
                </View>
                {this.state.errorDuplicatedEmail !== '' && (
                    <Badge danger style={{marginBottom: 20}}>
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems: 'center'}}>
                            <Icon name="times-circle" type='FontAwesome' style={styles.badgeIcon}/>
                            <Text>{this.state.errorDuplicatedEmail}</Text> 
                        </View>
                    </Badge>
                )
                }
                <View style={[styles.inputIconContainer,styles.inputContainer]}>
                    <TextInput
                        style={styles.innerInput}
                        placeholder="Contraseña"
                        placeholderTextColor = "rgba(255,255,255,0.7)"
                        maxLength={15}
                        secureTextEntry={this.state.security}
                        onChangeText={this.handleChangePassword}
                        onBlur={this.handleBlurPassword}
                        autoCapitalize='none'
                        autoCorrect={false}
                        selectionColor={globalStyles.darkBlue}
                    />
                    <Icon 
                        style={styles.inputIcon} name={this.state.iconName} type='FontAwesome' 
                        size={20}
                        value = {this.state.password}
                        onPress = {()=>{
                                if (this.state.iconName === 'eye')
                                    this.setState({iconName:'eye-slash', security:false})
                                else 
                                    this.setState({iconName:'eye', security:true})
                            }}/>
                        
                </View>
                {this.state.showInvalidPassword && (
                    <Badge danger style={{marginBottom: 20}}>
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems: 'center'}}>
                            <Icon name="times-circle" type='FontAwesome' style={styles.badgeIcon}/>
                            <Text>Contraseña Invalida</Text> 
                        </View>
                    </Badge>
                )
                }
                <InputLogin
                    placeholder = "Repite Contraseña"
                    secureTextEntry = {true}
                    value = {this.state.repeatpassword}
                    maxLength={15}
                    onChangeText={this.handleChangeRepeatpassword}
                    onBlur={this.handleBlurRepeatpassword}/>
                {this.state.showInvalidRepeatPassword && (
                    <Badge danger style={{marginBottom: 20}}>
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems: 'center'}}>
                            <Icon name="times-circle" type='FontAwesome' style={styles.badgeIcon}/>
                            <Text>Contraseñas no coinciden</Text> 
                        </View>
                    </Badge>
                )
                }
                <Text style={{fontSize:14, color:'rgba(255,255,255,0.5)', textAlign:'left', margin:10}}>
                    * Es necesario que especifiques tu zona horaria para registrar tus operaciones
                </Text>
                <PickerLogin 
                    data={this.timezones} 
                    value={this.state.timezone} 
                    onValueChange={this.handlePickerValueChange}/>
                {/* {this.state.showCode&&(
                <TextInput
                    style = {styles.inputContainer}
                    placeholder = "Code"
                    placeholderTextColor = "rgba(255,255,255,0.7)"
                    value = {this.state.invite_code}
                    editable = {false}
                ></TextInput>
                )} */}
                <CheckBoxFormApp style ={{marginTop:15}} checkBoxStyle={{marginRight:15}} color="#FFFFFF77" 
                    value={this.state.acceptTerms}
                    onPress={()=>this.setState({acceptTerms:!this.state.acceptTerms})}>
                    <Text style={globalStyles.infoText}>
                        Lee y acepta nuestros 
                        <Text style={{color: '#0000ff55'}} onPress={()=>this.props.navigation.navigate('terms')}>{' Terminos y Condiciones'}</Text>
                    </Text>
                </CheckBoxFormApp>
                <SubmitButton 
                    style = {{backgroundColor:globalStyles.lightBlue, marginTop:10}}
                    onPress={this.handlePressSingUp} text="registrarse"
                    disabled={this.state.disableSubmit}/>
                <Text style={{color:"#FFFFFFaa", textAlign:'center' , marginTop:15}} onPress={this.goToGetCode}>
                    Ya tengo un codigo
                </Text>
            </DynamicForm>
            </View>
        </ScrollView>
        );
    }
}

export default SingUp;

const styles = StyleSheet.create({
    container: {
        padding: 30,
        textAlign: 'center'
    },
    inputContainer: {
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 10,
        color: '#FFF',
        borderRadius: 10,
        elevation: 1,
        shadowOpacity: 2,
        shadowRadius: 2,
        shadowColor: '#000'
    },
    badgeIcon:{
        fontSize: 15, 
        color: "#fff", 
        lineHeight: 20, 
        marginRight: 5
    },
    inputIconContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FFF'
    },
    inputIcon: {
        padding: 10,
        color: '#FFF'
    },
    innerInput: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        color: '#FFF'
    },
});