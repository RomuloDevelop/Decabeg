import React, {Component}  from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import { Button, Icon } from 'native-base';
import { GoogleSignin , statusCodes } from 'react-native-google-signin';
import { sendForgotPassword } from '../../Api';
import { checkLoginField } from '../../helpers';
import {InputLogin} from '../sharedComponents/InputDicabeg';
import SubmitButton from '../sharedComponents/SubmitButton';
import globalStyles from '../../styles';
    
// ...
// Attempt a login using the Facebook login dialog,
// asking for default permissions.

class ForgotPassword extends Component{
    constructor(props){
        super(props);
        this.state = {
            temporal_code: '',
            password: '',
            repeatpassword: '',
            errorPassword:''
        }
    }

    handleSendPress = async () => {
        try{
            const {repeatpassword, password} = this.state;
            if(repeatpassword !== password){
                this.setState({errorPassword: 'Las contaseñas son diferentes'});
                return;
            }
            const message = checkLoginField(password, isEmail=false);
            if(message === 'Correct'){
                const data = { temporal_code:this.state.temporal_code, password: this.state.password };
                await sendForgotPassword(data);
                this.props.navigation.navigate('login');
            } else this.setState({errorPassword: message});
        } catch(ex) {
            console.log(`${ex.method}: ${ex.message}`);
        }
    }

    handleChangeCode = (temporal_code)=>this.setState({temporal_code});
    
    handleChangePassword = (password)=>this.setState({password});

    handleChangeRepeatPassword = (repeatpassword)=>this.setState({repeatpassword});

    render(){
        return (
            <ScrollView style ={{backgroundColor: globalStyles.fontBrown}}>
                <View style ={styles.container}>
                    <Image 
                        style={styles.image}
                        source={require('../../assets/DICABEG.png')}
                    />
                    <Text style={styles.textImage}>DICABEG</Text>
                    <View style = {styles.formContainer}>
                        {/* <TextInput
                            style = {styles.inputContainer}
                            placeholder = "Code"
                            placeholderTextColor = "rgba(255,255,255,0.7)"
                            onChangeText={this.handleChangeCode}
                            value = {this.state.temporal_code}>
                        </TextInput> */}
                        <InputLogin 
                            inputRef={(input) =>this.codeTextInput = input}
                            placeholder = "Codigo"
                            onSubmitEditing = {(value)=>this.passwordTextInput.focus()}
                            onChangeText={this.handleChangeCode}
                            value = {this.state.temporal_code}>
                        </InputLogin>
                        {/*<TextInput
                            style = {styles.inputContainer}
                            placeholder = "Password"
                            placeholderTextColor = "rgba(255,255,255,0.7)"
                            onChangeText={this.handleChangePassword}
                            value = {this.state.password}>
                        </TextInput> */}
                        <InputLogin 
                            inputRef={(input) =>this.passwordTextInput = input}
                            placeholder = "Contraseña"
                            onSubmitEditing = {(value)=>this.repeatTextInput.focus()}
                            onChangeText={this.handleChangePassword}
                            error = {this.state.errorPassword}
                            secureTextEntry = {true}
                            value = {this.state.password}>
                        </InputLogin>
                        <InputLogin 
                            inputRef={(input) =>this.repeatTextInput = input}
                            placeholder = "Repite Contraseña"
                            onSubmitEditing = {(value)=>this.codeTextInput.focus()}
                            onChangeText={this.handleChangeRepeatPassword}
                            error = {this.state.errorPassword}
                            value = {this.state.repeatpassword}>
                        </InputLogin>
                        {/* <TextInput
                            style = {styles.inputContainer}
                            placeholder = "Repeat Password"
                            placeholderTextColor = "rgba(255,255,255,0.7)"
                            onChangeText={this.handleChangeRepeatPassword}
                            value = {this.state.repeatpassword}>
                        </TextInput> */}
                        <SubmitButton text='LOGIN' onPress = {this.handleSendPress}/>
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
    }
});

export default ForgotPassword;