import React, { Component }  from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    TextInput, StyleSheet, Image, ScrollView, ToastAndroid } from 'react-native';
import Hr from 'react-native-hr-plus'
import { Button, Icon } from 'native-base';
import { signInGoogle } from '../../Api/SessionManager/googleApi';
import { sendUserLogin, sendUserSignUp } from '../../Api/api';
import { singInFacebook} from '../../Api/SessionManager/facebookApi';

class LogIn extends Component{
    constructor(props){
        super(props);
        this.googleFails= false;
        this.fromGoBack = false;
        this.OAuthSingIn = false;
        this.notSignedUp = false;
        this.state = {
            user: '',
            password: '',
            disableButton: false,
        }
    }

    signInAppOAuth = async (userData)=>{
        try {
            const {userAccount, userDataModel} = userData;
            if(!this.notSignedUp)
                await this.signInApp(userAccount);
            else{
                console.log('Entro Again');
                this.notSignedUp = false;
                await sendUserSignUp(userAccount);
                await this.signInApp(userAccount, userDataModel);
            }
        } catch(ex){
            console.log('login error');
            console.log(ex);
            const message = (ex.message)?ex.message:ex;
            if(message.includes('email not exist') && !this.notSignedUp){
                this.notSignedUp = true;
                console.log('Entro catch');
                this.signInAppOAuth(userData);
            }else{
                console.log('An error ocurred while login/registration, please try again');
                console.log(ex);
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
        this.props.navigation.navigate('singup');
    }

    handleLoginPress = async () => {
        try{
            const email = this.state.user;
            const password = this.state.password;
            await this.signInApp({email, password});
        } catch(ex) {
            console.log(ex);
        }
    }

    handlePressFacebook = async () => {
        try{
            const user = await singInFacebook();
            await this.signInAppOAuth(user);
        }catch(ex){
            console.log(ex);
        }
    }

    handlePressGoogle = async () => {
        try{
            const user = await signInGoogle();
            await this.signInAppOAuth(user);
        }catch(ex){
            console.log(ex);
        }
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
            <ScrollView style ={{backgroundColor: 'rgba(52, 152, 219,1.0)'}}>
                <View style ={styles.container}>
                    <Image 
                        style={styles.image}
                        source={require('../../assets/DICABEG.jpeg')}
                    />
                    <Text style={styles.textImage}>DICABEG</Text>
                    <View style = {styles.formContainer}>
                        <TextInput
                            style = {styles.inputContainer}
                            placeholder = "Email"
                            placeholderTextColor = "rgba(255,255,255,0.7)"
                            onChangeText={this.handleChangeUser}
                            onSubmitEditing = {this.handleSubmitEditing}
                            returnKeyType = "next"
                            blurOnSubmit={false}
                            value = {this.state.user}
                        ></TextInput>
                        <TextInput ref={(input) => { this.secondTextInput = input; }}
                            style = {styles.inputContainer}
                            placeholder = "Password"
                            placeholderTextColor = "rgba(255,255,255,0.7)"
                            secureTextEntry = {true}
                            onChangeText={this.handleChangePassword}
                            value = {this.state.password}
                        ></TextInput>
                        <TouchableOpacity 
                            style = {styles.buttonContainer}
                            onPress = {this.handleLoginPress}
                            disabled={this.state.disableButton}>
                            <Text style = {styles.textButton}>LOGIN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style = {[styles.buttonContainer ,{backgroundColor:"rgba(65, 197, 240,1.0)"}]}
                            onPress={this.handlePressSingUp}
                            disabled={this.state.disableButton}>
                            <Text style = {styles.textButton}>SING UP</Text>
                        </TouchableOpacity>
                        <Text style={{color:"rgba(65, 197, 240,1.0)", textAlign:'center' , marginBottom:10}}
                            onPress={()=>{this.props.navigation.navigate('forgotPassword',{
                                    onGoBack: () => {this.fromGoBack=true;}
                                });
                            }}>
                            Forgot Password?
                        </Text>
                    </View>
                    <Hr color='white' width={1}>
                        <Text style={styles.textHr}>OR</Text>
                    </Hr>
                    <View style={styles.socialButtonContainer}>
                        <Button style={[styles.socialButton,{ backgroundColor: '#3B5998' }]} disabled={this.state.disableButton}>
                            <Icon name="logo-facebook" 
                            onPress={this.handlePressFacebook}/>
                        </Button>
                        <Button style={[styles.socialButton,{ backgroundColor: '#DD5144' }]}
                            onPress={this.handlePressGoogle} disabled={this.state.disableButton}>
                            <Icon name="logo-google" />
                        </Button>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
export default LogIn;

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
    }
});