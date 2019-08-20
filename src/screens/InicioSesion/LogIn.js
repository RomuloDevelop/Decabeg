import React, { Component }  from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
//import Hr from '../../sharedComponents/Hr';
import { signInGoogle } from '../../Api/SessionManager/googleApi';
import { singInFacebook} from '../../Api/SessionManager/facebookApi';
import { sendUserLogin, sendUserSignUp } from '../../Api';
import { validateEmail,validatePassword, appAlert } from '../../helpers';
import SubmitButton from '../../sharedComponents/SubmitButton';
import {InputLogin} from '../../sharedComponents/InputDicabeg';
import LoaderScreen from '../../sharedComponents/LoadScreen';
import DynamicForm from '../../sharedComponents/DynamicForm';

import globalStyles from '../../styles';

class LogIn extends Component{
    constructor(props){
        super(props);
        this.bugsnag = props.screenProps.bugsnag;
        this.notSignedUp = false;
        this.state = {
            user: '',
            password: '',
            disableSubmit: false,
            errorUser:'',
            errorPassword:'',
            dinamycWidth:{width:'auto', alignSelf:'stretch'}
        }
    }
    componentDidMount(){
        Dimensions.addEventListener("change",(value)=>{
            const {window} = value;
            const dinamycWidth = (window.width<500)?
            {width:'auto', alignSelf:'stretch'}:{width:400, alignSelf:'center'}
            this.setState({dinamycWidth});
        })
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
            const message = (ex.message)?ex.message:ex;
            console.log(message);
            const description = message.description?message.description:'other';
            console.log('description'+JSON.stringify(description));
            if(description.includes('email not exist') && !this.notSignedUp){
                this.notSignedUp = true;
                this.signInAppOAuth(userData);
            }else{
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
            if(!validateEmail(this.state.user)) errorUser = "El email no corresponde al formato";
            if(!validatePassword(this.state.password)) errorPassword = "La contraseña no corresponde al formato"; 
            if(errorUser !== '' || errorPassword !== '') 
                this.setState({errorUser, errorPassword});
            else {
                this.setState(()=>({disableSubmit:true, errorUser: '', errorPassword:''}),()=>{
                    this.signInApp({email, password})
                    .catch((ex)=>{
                        if(ex.description) {
                            if(ex.description === 'email not found' || ex.description === "passsword incorrect")
                                appAlert('Error de sesion', 'El email o la contraseña son incorrectos');
                        }
                        console.log(ex);
                        this.setState({disableSubmit:false});
                    });
                });
            }
        } catch(ex) {
            console.log(ex);
            this.setState({disableSubmit:false});
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
    
    handleChangeUser = (value) => this.setState({user:value})

    handleChangePassword = (value) =>this.setState({password:value});

    handleCancelPress = (value)=>this.props.navigation.goBack()

    handleSubmitEditing = (value)=>this.secondTextInput.focus();

    render(){
        return (
            <ScrollView style ={{backgroundColor: globalStyles.fontBrown}}>
                <View style ={styles.container}>
                    <LoaderScreen loading ={this.state.disableSubmit}/>
                    <Image 
                        style={styles.image}
                        source={require('../../assets/DICABEG.png')}/>
                    <Text style={styles.textImage}>DICABEG</Text>
                    <DynamicForm>   
                        <InputLogin
                            placeholder = "Email"
                            onChangeText={this.handleChangeUser}
                            onSubmitEditing = {this.handleSubmitEditing}
                            error = {this.state.errorUser}
                            value = {this.state.user}/>
                        <InputLogin inputRef={(input) => { this.secondTextInput = input; }}
                            placeholder = "Contraseña"
                            secureTextEntry = {true}
                            onChangeText={this.handleChangePassword}
                            value = {this.state.password}
                            error = {this.state.errorPassword}/>
                        <SubmitButton 
                            text = "INICIA SESION"
                            onPress = {this.handleLoginPress}
                            disabled={this.state.disableSubmit}
                            style={{marginHorizontal:0}}/>
                        <SubmitButton
                            text = "REGISTRATE" 
                            style = {{backgroundColor:globalStyles.lightBlue, marginTop:0, marginHorizontal:0}}
                            onPress={this.handlePressSingUp}
                            disabled={this.state.disableSubmit}/>
                        <Text style={{color:"#FFFFFFaa", textAlign:'center' , marginBottom:10}}
                            onPress={()=>this.props.navigation.navigate('sendEmail')}>
                            ¿Olvidaste tu contraseña?
                        </Text>
                    </DynamicForm>
                    {/* <Hr color='white' width={1}>
                        <Text style={styles.textHr}>O</Text>
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
                    </View> */}
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
    }
});

export default LogIn;