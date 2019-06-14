import React, {Component}  from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import { Button, Icon } from 'native-base';
import { GoogleSignin , statusCodes } from 'react-native-google-signin';
import { sendForgotPassword } from '../../Api';
import { checkLoginField } from '../../helpers';
import { InputLogin } from '../../sharedComponents/InputDicabeg';
import SubmitButton from '../../sharedComponents/SubmitButton';
import LoaderScreen from '../../sharedComponents/LoadScreen';
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
            errorPassword:'',
            errorRepeatPassword:'',
            errorCode:'',
            loading: false
        }
    }

    handleSendPress = async () => {
        try{
            const {repeatpassword, password, temporal_code} = this.state;
            const message = checkLoginField(password, 'password');
            if(temporal_code === '') this.setState({errorCode: 'El codigo es requerido'});
            else if(message !== 'Correct') 
                this.setState({errorPassword: message});
            else if(repeatpassword !== password){
                this.setState({errorRepeatPassword: 'Las contaseñas son diferentes', errorPassword: ''});
            } else {
                this.setState(()=>({loading:true}),()=>{
                    const data = { 
                        temporal_code:this.state.temporal_code, 
                        password:this.state.password 
                    };
                    console.log(data);
                    sendForgotPassword(data)
                    .then(()=>this.props.navigation.navigate('login'))
                    .catch((ex)=>{
                        this.setState({loading:false});
                        console.log(ex);
                    });
                })
            }
        } catch(ex) {
            this.setState({loading:false});
            console.log(ex);
        }
    }

    handleChangeCode = (temporal_code)=>this.setState({temporal_code});
    
    handleChangePassword = (password)=>this.setState({password});

    handleChangeRepeatPassword = (repeatpassword)=>this.setState({repeatpassword});

    render(){
        return (
            <ScrollView style ={{backgroundColor: globalStyles.fontBrown}}>
                <LoaderScreen loading ={this.state.loading}/>
                <View style ={styles.container}>
                    <Image 
                        style={styles.image}
                        source={require('../../assets/DICABEG.png')}
                    />
                    <Text style={styles.textImage}>DICABEG</Text>
                    <View style = {styles.formContainer}>
                        <InputLogin 
                            inputRef={(input) =>this.codeTextInput = input}
                            placeholder = "Codigo"
                            onSubmitEditing = {(value)=>this.passwordTextInput.focus()}
                            onChangeText={this.handleChangeCode}
                            error = {this.state.errorCode}
                            value = {this.state.temporal_code}>
                        </InputLogin>
                        <InputLogin 
                            inputRef={(input) =>this.passwordTextInput = input}
                            placeholder = "Contraseña"
                            onSubmitEditing = {(value)=>this.repeatTextInput.focus()}
                            onChangeText={this.handleChangePassword}
                            error = {this.state.errorPassword}
                            secureTextEntry = {true}
                            maxLength={8}
                            value = {this.state.password}>
                        </InputLogin>
                        <InputLogin 
                            inputRef={(input) =>this.repeatTextInput = input}
                            placeholder = "Repite Contraseña"
                            onSubmitEditing = {(value)=>this.codeTextInput.focus()}
                            onChangeText={this.handleChangeRepeatPassword}
                            error = {this.state.errorRepeatPassword}
                            secureTextEntry = {true}
                            maxLength={8}
                            value = {this.state.repeatpassword}>
                        </InputLogin>
                        <SubmitButton text='LOGIN' onPress = {this.handleSendPress} style={{ marginHorizontal: 0}}/>
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
});

export default ForgotPassword;