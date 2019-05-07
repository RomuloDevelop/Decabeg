import React, {Component}  from 'react';
import { 
    View, 
    ScrollView, 
    TouchableOpacity,
    TextInput, StyleSheet, Image} from 'react-native';
import {
    Badge, Text, Icon
} from 'native-base';
import { sendUserLogin, sendUserSignUp } from '../../Api';
import { appAlert } from '../../helpers';
import LoaderScreen from '../sharedComponents/LoadScreen';
import globalStyles from '../../styles';

class SingUp extends Component{
    constructor(props){
        super(props);
        this.validEmail= false,
        this.validRepassword = false;
        this.validPassword = false;
        this.state = {
            username: '',
            email: '',
            password: '',
            invite_code:'',
            repeatpassword: '',
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
            const description = ex.message.description;
            if(description.message === "username exist"){
                this.setState({errorDuplicatedUser:`Se sugiere ${description.suggested_username}`});
            } else if(typeof description === 'string'){
                if(description.includes('duplicate key value')){
                    if(description.includes('email'))
                        this.setState({errorDuplicatedEmail:'El correo ya existe'});
                }
            }
        } catch(ex) {
            console.log(ex);
        }
    }

    goToGetCode=()=>{
        this.props.navigation.navigate('sendCode');
    }
    handleChangeUsername = (value) => {
        this.setState({username:value});
    }

    handleChangeEmail = (value) => {
        const testing = /\S+@\S+\.\S+/;
        const validEmail = testing.test(value);
        this.setState({email:value, validEmail});
    }
    
    handleBlurEmail = (value) => {
        this.setState({showInvalidEmail:true});
    }

    handleChangePassword = (value) => {
        const testing = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_\-])[A-Za-z\d@$!%*#?&_\-]{8,}$/
        this.validPassword = testing.test(value);
        this.validRepassword = this.state.repeatpassword === value;
        this.setState({password:value});
    }
    
    handleBlurPassword = () => {
        this.setState({showInvalidPassword: !this.validPassword});
    }

    handleChangeRepeatpassword = (value) => {
        let {password} = this.state;
        this.validRepassword = (password === value);
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
                    password:this.state.password
                };
                if(this.state.showCode) userAccount.invite_code = this.state.invite_code;
                //active page
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
            <View style ={styles.container}>
                <LoaderScreen loading ={this.state.disableSubmit}/>
                <Text style={{fontSize:20, color:'#fff', textAlign:'center', margin:30}}>
                    CREAR CUENTA
                </Text>
                <Text style={{fontSize:14, color:'rgba(255,255,255,0.5)', textAlign:'left', margin:10}}>
                    * Contraseña debe tener al menos longitud 8, al menos 1 digito, 1 caracter especial (@$!%*#?&_-)
                </Text>
                <TextInput
                    style = {styles.inputContainer}
                    placeholder = "Username"
                    placeholderTextColor = "rgba(255,255,255,0.7)"
                    value = {this.state.username}
                    onChangeText={this.handleChangeUsername}
                ></TextInput>
                {this.state.errorDuplicatedUser !== '' && (
                    <Badge danger style={{marginBottom: 20}}>
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems: 'center'}}>
                            <Icon name="times-circle" type='FontAwesome' style={styles.badgeIcon}/>
                            <Text>{this.state.errorDuplicatedUser}</Text> 
                        </View>
                    </Badge>
                )
                }
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
                        placeholder="Password"
                        placeholderTextColor = "rgba(255,255,255,0.7)"
                        maxLength={8}
                        secureTextEntry={this.state.security}
                        onChangeText={this.handleChangePassword}
                        onBlur={this.handleBlurPassword}
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
                            <Text>Invalid Password</Text> 
                        </View>
                    </Badge>
                )
                }
                <TextInput
                    style = {styles.inputContainer}
                    placeholder = "Repeat Password"
                    placeholderTextColor = "rgba(255,255,255,0.7)"
                    secureTextEntry = {true}
                    value = {this.state.repeatpassword}
                    secureTextEntry={true}
                    maxLength={8}
                    onChangeText={this.handleChangeRepeatpassword}
                    onBlur={this.handleBlurRepeatpassword}
                ></TextInput>
                {this.state.showInvalidRepeatPassword && (
                    <Badge danger style={{marginBottom: 20}}>
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems: 'center'}}>
                            <Icon name="times-circle" type='FontAwesome' style={styles.badgeIcon}/>
                            <Text>Password its not the same</Text> 
                        </View>
                    </Badge>
                )
                }
                {this.state.showCode&&(
                <TextInput
                    style = {styles.inputContainer}
                    placeholder = "Code"
                    placeholderTextColor = "rgba(255,255,255,0.7)"
                    value = {this.state.invite_code}
                    editable = {false}
                ></TextInput>
                )}
                <TouchableOpacity 
                    style = {[styles.buttonContainer ,{backgroundColor:globalStyles.lightBlue}]}
                    onPress={this.handlePressSingUp}
                    disabled={this.state.disableSubmit}>
                    <Text style = {styles.textButton}>REGISTRASE</Text>
                </TouchableOpacity>
                <Text style={{color:"#FFFFFFaa", textAlign:'center' , marginTop:15}} onPress={this.goToGetCode}>
                    Ya tengo un codigo
                </Text>
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
    buttonContainer: {
        paddingVertical: 10,
        marginBottom: 15,
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