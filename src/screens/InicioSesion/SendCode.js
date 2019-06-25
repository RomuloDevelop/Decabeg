import React,  { Component }  from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    TextInput, StyleSheet, Image, ScrollView} from 'react-native';
import {Button, Icon} from 'native-base';
import { sendUserActivation, sendUserActivationAgain } from '../../Api';
import {appAlert} from '../../helpers'; 
import SubmitButton from '../../sharedComponents/SubmitButton';
import {InputLogin} from '../../sharedComponents/InputDicabeg';
import SendEmailCode from '../../sharedComponents/SendEmailCode';
import LoaderScreen from '../../sharedComponents/LoadScreen';
import globalStyles from '../../styles';
    
// ...

// Attempt a login using the Facebook login dialog,
// asking for default permissions.
class SendCode extends Component {
    constructor(props){
        super(props);
        this.state = {
            temporal_code:'',
            loading: false
        }
    }

    handleSubmit = async () => {
        try{
            const temporal_code = this.state.temporal_code;
            console.log(temporal_code);
            if(!temporal_code)
                return appAlert('Codigo', 'Ingrese un codigo de verificacion valido');
            this.setState(()=>({loading:true}),()=>{
                sendUserActivation(temporal_code)
                .then(()=>{
                    appAlert('Codigo recibido', 'Ya puedes iniciar sesion en la app!');
                    this.props.navigation.navigate('login');
                })
                .catch((ex) => {
                    if(ex.message.description) {
                        if(ex.message.description === 'code invalid or used')
                            appAlert('Codigo invalido', 'Este Codigo caduco o es invalido');
                    }
                    this.setState({loading:false});
                    console.log(ex);
                });
            });
        } catch(ex) {
            this.setState({loading:false});
            console.log(ex);
        }
    };

    handleReSubmit = async (email)=> {
        try{
            if(!email)
                return;
            this.modal.Close();
            this.setState(()=>({loading:true}),()=>{
                sendUserActivationAgain(email)
                .then(()=>{
                    appAlert('Código enviado', 'Hemos enviado un codigo a tu correo');
                    this.setState({loading:false});
                })
                .catch((ex) => {
                    if(ex.message.description) {
                        if(ex.message.description === 'email not found')
                            appAlert('Correo invalido', 'Este correo no existe');
                    }
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
                <SendEmailCode ref={ref=>this.modal = ref} onPressSubmit ={this.handleReSubmit}/>
                <View style ={styles.container}>
                    <Image 
                        style={styles.image}
                        source={require('../../assets/DICABEG.png')}
                    />
                    <Text style={styles.textImage}>DICABEG</Text>
                    <View style = {styles.formContainer}>
                        <Text style={globalStyles.infoText}>
                            &nbsp;Te enviamos un codigo a tu correo para la veficacion de tu cuenta.
                            {"\n"}
                            &nbsp;Si no has recibido un codigo puedes volver a enviar la solicitud.
                        </Text>
                        <InputLogin
                            placeholder = "Codigo"
                            onChangeText={(temporal_code)=>{this.setState({temporal_code})}}
                            value = {this.state.temporal_code}>
                        </InputLogin>
                        <SubmitButton text = 'Enviar' onPress = {this.handleSubmit} 
                            style={{ marginHorizontal: 0}}
                            textStyle = {styles.buttonText}/>
                        <SubmitButton text = 'Volver a Enviar' 
                            onPress = {()=>this.modal.Open()} 
                            style={{ marginHorizontal: 0, marginTop:0, backgroundColor:globalStyles.lightBlue}}
                            textStyle = {styles.buttonText}/>
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
    buttonText:{
        textTransform:'uppercase'
    }
});

export default SendCode;