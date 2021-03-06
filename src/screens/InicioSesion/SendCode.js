import React,  { Component }  from 'react';
import { View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import { sendUserActivation, sendUserActivationAgain } from '../../Api';
import {appAlert} from '../../helpers'; 
import SubmitButton from '../../sharedComponents/SubmitButton';
import {InputLogin} from '../../sharedComponents/InputDicabeg';
import SendEmailCode from '../../sharedComponents/SendEmailCode';
import LoaderScreen from '../../sharedComponents/LoadScreen';
import DynamicForm from '../../sharedComponents/DynamicForm';
import globalStyles from '../../styles';
    
// ...

// Attempt a login using the Facebook login dialog,
// asking for default permissions.
class SendCode extends Component {
    constructor(props){
        super(props);
        this.state = {
            temporal_code:'',
            loading: false,
            emai: '',
            errorEmail: '',
        }
    }

    errorPrompt(ex){
        if(ex === 'code invalid or used' || ex === 'code incorrect')
            appAlert('Código inválido', 'Este código caducó o es inválido');
        if(ex === 'email not found')
            appAlert('Correo inválido', 'Este correo no existe');
    }

    componentDidMount(){
        const email = this.props.navigation.getParam('email', '');
        if(email !== '')
            this.setState({email});
    }

    validateEmail = ()=>{
        const email = this.state.email;
        const message = checkLoginField(email);
        const valid = message === "Correct";
        if(!valid)
            this.setState({error:message});
        return valid;
    }

    handleSubmit = async () => {
        try{
            if(!(this.state.email !== '')){
                appAlert('Error al validar código', 'Debe especificar un email para validar el código');
                return;
            }

            if(!this.validateEmail) return;

            const temporal_code = this.state.temporal_code;
            if(!temporal_code)
                return appAlert('Codigo', 'Ingrese un codigo de verificacion valido');
            this.setState(()=>({loading:true}),()=>{
                sendUserActivation(temporal_code,this.state.email)
                .then(()=>{
                    appAlert('Codigo recibido', 'Ya puedes iniciar sesion en la app!');
                    this.props.navigation.navigate('login');
                })
                .catch((ex) => {
                    if(ex.message.description) this.errorPrompt(ex.message.description)
                    this.setState({loading:false});
                    console.log(ex);
                });
            });
        } catch(ex) {
            this.setState({loading:false});
            console.log(ex);
        }
    };

    handleReSubmit = async ()=> {
        try{
            if(!(this.state.email !== '')){
                appAlert('Error en el reenvio de código', 'Debe especificar un email para poder reenviar el código');
                return;
            }

            if(!this.validateEmail) return;

            const email = this.state.email;
            this.setState(()=>({loading:true}),()=>{
                sendUserActivationAgain(email)
                .then(()=>{
                    appAlert('Código enviado', 'Hemos enviado un codigo a tu correo');
                    this.setState({loading:false, email});
                })
                .catch((ex) => {
                    if(ex.message.description) this.errorPrompt(ex.message.description);
                    this.setState({loading:false});
                    console.log(ex);
                });
            });
        } catch(ex) {
            this.setState({loading:false});
            console.log(ex);
        }

    }
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
                        <Text style={globalStyles.infoText}>
                            &nbsp;Te enviamos un codigo a tu correo para la veficacion de tu cuenta.
                            {"\n"}
                            &nbsp;Si no has recibido un código, puedes volver a enviar la solicitud.
                        </Text>
                        <InputLogin
                            placeholder = "Email"
                            onChangeText={(email)=>{this.setState({email})}}
                            value = {this.state.email}
                            error={this.state.errorEmail}
                            autoFocus={true}>
                        </InputLogin>
                        <InputLogin
                            placeholder = "Codigo"
                            onChangeText={(temporal_code)=>{this.setState({temporal_code})}}
                            value = {this.state.temporal_code}
                            autoFocus={true}>
                        </InputLogin>
                        <SubmitButton text = 'Enviar' onPress = {this.handleSubmit} 
                            style={{ marginHorizontal: 0}}
                            textStyle = {styles.buttonText}/>
                        <SubmitButton text = 'Volver a Enviar' 
                            onPress = {this.handleReSubmit} 
                            style={{ marginHorizontal: 0, marginTop:0, backgroundColor:globalStyles.lightBlue}}
                            textStyle = {styles.buttonText}/>
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
    buttonText:{
        textTransform:'uppercase'
    }
});

export default SendCode;