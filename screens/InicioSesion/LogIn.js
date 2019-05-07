import React, { Component }  from 'react';
import { 
    View,
    Text, 
    TouchableOpacity,
    TextInput, StyleSheet, Image, ScrollView, ToastAndroid } from 'react-native';
//import Hr from 'react-native-hr-plus';
import Hr from '../sharedComponents/Hr';
import { Button, Icon } from 'native-base';
import { signInGoogle } from '../../Api/SessionManager/googleApi';
import { singInFacebook} from '../../Api/SessionManager/facebookApi';
import { sendUserLogin, sendUserSignUp } from '../../Api';
import { validateEmail,validatePassword, appAlert } from '../../helpers';
import LoaderScreen from '../sharedComponents/LoadScreen';

import globalStyles from '../../styles';

class LogIn extends Component{
    constructor(props){
        super(props);
        this.notSignedUp = false;
        this.state = {
            user: '',
            password: '',
            disableSubmit: false,
            errorUser:'',
            errorPassword:''
        }
    }

    signInAppOAuth = async (userData)=>{
        try {
            const {userAccount, userDataModel} = userData;
            if(!this.notSignedUp)
                await this.signInApp(userAccount);
            else{
                this.notSignedUp = false;
                await sendUserSignUp(userAccount);
                await this.signInApp(userAccount, userDataModel);
            }
        } catch(ex){
            console.log('login error');
            const message = (ex.message)?ex.message:ex;
            console.log(message);
            const description = message.description?message.description:'other';
            console.log('description'+JSON.stringify(description));
            if(description.includes('email not exist') && !this.notSignedUp){
                this.notSignedUp = true;
                this.signInAppOAuth(userData);
            }else{
                if(description === 'active session')
                    appAlert('Sesion ya iniciada','Cierre la sesion activa y vuelva a ingresar');
                throw message;
            }
        }
    }

    signInApp = async(user, data) =>{
        try {
            const response = await sendUserLogin(user, data);
            if(response){
               this.props.navigation.navigate('home');
            } else 
                throw 'No data was received';
        } catch(ex){
            throw ex.message;
        }
    }

    handlePressSingUp = ()=>{
        this.setState(()=>({user:'', password:'', errorUser:'', errorPassword: ''}),()=>{
            this.props.navigation.navigate('singup');
        })
    }

    handleLoginPress = async () => {
        try{
            const email = this.state.user;
            const password = this.state.password;
            let errorUser = '';
            let errorPassword = '';
            if(!validateEmail(this.state.user)) errorUser = "This email doesn't match the format"
            if(!validatePassword(this.state.password)) errorPassword = "The password doesn't match the format"; 
            if(errorUser !== '' || errorPassword !== '') 
                this.setState({errorUser, errorPassword});
            else {
                this.setState(()=>({disableSubmit:true, errorUser: '', errorPassword:''}),()=>{
                    this.signInApp({email, password})
                    .catch((ex)=>{
                        this.setState({disableSubmit:false});
                        console.log(ex);
                    });
                });
            }
        } catch(ex) {
            console.log(ex);
        }
    }

    handlePressGoogleFacebook = async (isGoogle) => {
        this.setState(()=>({disableSubmit:true}),async ()=>{
            try{
                let user;
                if(isGoogle) user = await signInGoogle(); else user = await singInFacebook();
                await this.signInAppOAuth(user);
            }catch(ex){
                this.setState({disableSubmit:false});
                console.log(ex);
            }
        })
    }
    
    handleChangeUser = (value) => {
        this.setState({user:value});
    }

    handleChangePassword = (value) => {
        this.setState({password:value});
    }

    handleCancelPress = (value)=>{
        this.props.navigation.goBack();
    }

    handleSubmitEditing = (value)=>{
        this.secondTextInput.focus();
    }
    render(){
        return (
            <ScrollView style ={{backgroundColor: globalStyles.fontBrown}}>
                <View style ={styles.container}>
                    <LoaderScreen loading ={this.state.disableSubmit}/>
                    <Image 
                        style={styles.image}
                        source={require('../../assets/DICABEG.png')}/>
                    <Text style={styles.textImage}>DICABEG</Text>
                    <View style = {styles.formContainer}>
                        <TextInput
                            style = {[styles.inputContainer,{borderColor:this.state.errorUser?'red':'rgba(255,255,255,0)',borderWidth:1}]}
                            placeholder = "Email"
                            placeholderTextColor = "rgba(255,255,255,0.7)"
                            onChangeText={this.handleChangeUser}
                            onSubmitEditing = {this.handleSubmitEditing}
                            returnKeyType = "next"
                            blurOnSubmit={false}
                            value = {this.state.user}
                        ></TextInput>
                        {(this.state.errorUser !== '')&&(<Text style={styles.errorMessage}>{this.state.errorUser}</Text>)}
                        <TextInput ref={(input) => { this.secondTextInput = input; }}
                            style = {[styles.inputContainer,{borderColor:this.state.errorPassword?'red':'rgba(255,255,255,0)', borderWidth:1}]}
                            placeholder = "Password"
                            placeholderTextColor = "rgba(255,255,255,0.7)"
                            secureTextEntry = {true}
                            onChangeText={this.handleChangePassword}
                            value = {this.state.password}
                        ></TextInput>
                        {(this.state.errorPassword !== '')&&(<Text style={styles.errorMessage}>{this.state.errorPassword}</Text>)}
                        <TouchableOpacity 
                            style = {[styles.buttonContainer,{backgroundColor:globalStyles.darkBlue}]}
                            onPress = {this.handleLoginPress}
                            disabled={this.state.disableSubmit}>
                            <Text style = {styles.textButton}>LOGIN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style = {[styles.buttonContainer ,{backgroundColor:globalStyles.lightBlue}]}
                            onPress={this.handlePressSingUp}
                            disabled={this.state.disableSubmit}>
                            <Text style = {styles.textButton}>SING UP</Text>
                        </TouchableOpacity>
                        {/* <Text style={{color:"#FFFFFFaa", textAlign:'center' , marginBottom:10}}
                            onPress={()=>this.props.navigation.navigate('sendEmail')}>
                            Forgot Password?
                        </Text> */}
                    </View>
                    <Hr color='white' width={1}>
                        <Text style={styles.textHr}>OR</Text>
                    </Hr>
                    <View style={styles.socialButtonContainer}>
                        <Button style={[styles.socialButton,{ backgroundColor: '#3B5998' }]} disabled={this.state.disableSubmit}
                            onPress={()=>this.handlePressGoogleFacebook(false)}>
                            <Icon name="logo-facebook" style={{color: 'white'}}/>
                        </Button>
                        <Button style={[styles.socialButton,{ backgroundColor: '#DD5144' }]} disabled={this.state.disableSubmit}
                            onPress={()=>this.handlePressGoogleFacebook(true)}>
                            <Icon name="logo-google" style={{color: 'white'}}/>
                        </Button>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 30
    },
    image:{
        width: 100,
        height: 100,
        borderRadius: 500,
        alignSelf: 'center'
    },
    textImage:{
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20, 
        fontWeight: '300',
        marginTop: 10,
        marginBottom: 20
    },
    formContainer: {
        marginBottom: 10
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
    textHr: {
        color: 'rgba(255,255,255,0.3)',
        marginBottom: 15,
        paddingHorizontal: 10
    },
    socialButtonContainer: {
        flexDirection:'row',
        justifyContent: 'center'
    },
    socialButton: {
        margin: 10,
        borderRadius: 20
    },
    errorMessage: {
        color:'red',
        marginBottom: 10,
    }
});

export default LogIn;