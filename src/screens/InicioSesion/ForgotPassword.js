import React, {Component}  from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { sendForgotPassword } from '../../Api';
import { checkLoginField, appAlert } from '../../helpers';
import { InputLogin } from '../../sharedComponents/InputDicabeg';
import SubmitButton from '../../sharedComponents/SubmitButton';
import LoaderScreen from '../../sharedComponents/LoadScreen';
import DynamicForm from '../../sharedComponents/DynamicForm';
import globalStyles from '../../styles';
    
// ...
// Attempt a login using the Facebook login dialog,
// asking for default permissions.

class ForgotPassword extends Component{
    constructor(props){
        super(props);
        this.state = {
            temporal_code:'',
            email:'',
            password:'',
            repeatpassword:'',
            errorPassword:'',
            errorRepeatPassword:'',
            errorCode:'',
            errorEmail:'',
            loading:false
        }
    }

    handleSendPress = async () => {
        try{
            const {repeatpassword, password, temporal_code, email} = this.state;
            const errorEmail = checkLoginField(email, 'email');
            const errorPassword = checkLoginField(password, 'password');
            const errorRepeatPassword = checkLoginField(repeatpassword,'repeatpassword',password);
            if(temporal_code === '') 
                this.setState({errorCode: 'El codigo es requerido'});
            else if(errorEmail !== 'Correct') 
                this.setState({errorEmail,  errorPassword: '', errorRepeatPassword:'', errorCode:''});
            else if(errorPassword !== 'Correct') 
                this.setState({errorEmail: '', errorPassword, errorRepeatPassword:'', errorCode:''});
            else if(errorRepeatPassword !== 'Correct'){
                this.setState({errorEmail: '', errorPassword:'', errorRepeatPassword, errorCode:''});
            } else {
                this.setState(()=>({loading:true}),()=>{
                    const data = { 
                        email: this.state.email,
                        temporal_code:this.state.temporal_code,
                        password:this.state.password 
                    };
                    console.log(data);
                    sendForgotPassword(data)
                    .then(()=>this.props.navigation.navigate('login'))
                    .catch((ex)=>{
                        if(ex.message.description) {
                            if(ex.message.description === 'code incorrect or used')
                                appAlert('Código inválido', 'Este código caducó o es inválido');
                        }
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
                    <DynamicForm style = {styles.formContainer}>
                        <Text style={{fontSize:14, color:(this.state.errorPassword)?'red':'rgba(255,255,255,0.5)', textAlign:'left', margin:10}}>
                            * Recuerda que la contraseña debe tener entre 8 y 15 caracteres, al menos 1 digito y un 1 caracter especial (@$!%*#?&_-)
                        </Text>
                        <InputLogin 
                            inputRef={(input) =>this.codeTextInput = input}
                            placeholder = "Codigo"
                            onSubmitEditing = {(value)=>this.emailTextInput.focus()}
                            onChangeText={this.handleChangeCode}
                            error = {this.state.errorCode}
                            value = {this.state.temporal_code}
                            autoFocus={true}>
                        </InputLogin>
                        <InputLogin 
                            inputRef={(input) =>this.emailTextInput = input}
                            placeholder = "Email"
                            onSubmitEditing = {(value)=>this.passwordTextInput.focus()}
                            onChangeText={(email)=>this.setState({email})}
                            error = {this.state.errorEmail}
                            value = {this.state.email}
                            autoFocus={true}>
                        </InputLogin>
                        <InputLogin 
                            inputRef={(input) =>this.passwordTextInput = input}
                            placeholder = "Contraseña"
                            onSubmitEditing = {(value)=>this.repeatTextInput.focus()}
                            onChangeText={this.handleChangePassword}
                            error = {this.state.errorPassword}
                            secureTextEntry = {true}
                            maxLength={15}
                            value = {this.state.password}>
                        </InputLogin>
                        <InputLogin 
                            inputRef={(input) =>this.repeatTextInput = input}
                            placeholder = "Repite Contraseña"
                            onSubmitEditing = {(value)=>this.codeTextInput.focus()}
                            onChangeText={this.handleChangeRepeatPassword}
                            error = {this.state.errorRepeatPassword}
                            secureTextEntry = {true}
                            maxLength={15}
                            value = {this.state.repeatpassword}>
                        </InputLogin>
                        <SubmitButton text='enviar' onPress = {this.handleSendPress} style={{ marginHorizontal: 0}}/>
                    </DynamicForm>
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