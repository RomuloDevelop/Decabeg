import React,  { Component }  from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    TextInput, StyleSheet, Image, ScrollView} from 'react-native';
import {Button, Icon} from 'native-base';
import { sendForgotPassword } from '../../Api';
import {appAlert} from '../../helpers'; 
import SubmitButton from '../sharedComponents/SubmitButton';
import {InputLogin} from '../sharedComponents/InputDicabeg';
import LoaderScreen from '../sharedComponents/LoadScreen';
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

    handleSubmit = ()=>{
        async () => {
            try{
                const temporal_code = this.state.temporal_code;
                this.setState(()=>({loading:true}),()=>{
                    sendForgotPassword(temporal_code).then(()=> {
                        appAlert('Codigo recibido', 'Ya puedes iniciar sesion en la app!');
                        this.props.navigation.navigate('login');
                    })
                    .catch(()=>{
                        this.setState({loading:false});
                        console.log(ex);
                    });
                });
            } catch(ex) {
                this.setState({loading:false});
                console.log(ex);
            }
        }
    };
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
                    <Text style={{color:"#FFFFFFaa", textAlign:'left' , marginBottom:10}}>
                        Te enviamos un codigo a tu correo para la veficacion de tu cuenta. Ingresalo aqui y ya podras disfrutar de la app de dicabeg
                    </Text>
                    <InputLogin
                        placeholder = "Codigo"
                        onChangeText={(temporal_code)=>{this.setState({temporal_code})}}
                        value = {this.state.temporal_code}>
                    </InputLogin>
                    <SubmitButton text = 'Enviar' onPress = {this.handleSubmit} style={{ marginHorizontal: 0}}/>
                </View>
            </View>
        </ScrollView>
    );}
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

export default SendCode;