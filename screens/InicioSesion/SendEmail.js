import React,  { Component }  from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    TextInput, StyleSheet, Image, ScrollView} from 'react-native';
import {Button, Icon} from 'native-base';
import { GoogleSignin , statusCodes } from 'react-native-google-signin';
import { sendForgotPassword } from '../../Api';
import { checkLoginField } from '../../helpers';
import SubmitButton from '../sharedComponents/SubmitButton';
import {InputLogin} from '../sharedComponents/InputDicabeg';
import LoaderScreen from '../sharedComponents/LoadScreen';
import globalStyles from '../../styles';
    
// ...

// Attempt a login using the Facebook login dialog,
// asking for default permissions.
class SendEmail extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            loading: false,
            error: ''
        }
    }

    handleSubmit = async ()=>{
        try{
            const email = this.state.email;
            const message = checkLoginField(email);
            if(message !== "Correct")
                this.setState({error:message});
            else{
                this.setState(()=>({loading:true}),()=>{
                    sendForgotPassword({email})
                        .then(()=> this.props.navigation.navigate('forgotPassword'))
                        .catch((ex)=>{
                            this.setState({loading:false});
                            console.log(ex);
                        });
                });
            }
        } catch(ex) {
            this.setState({loading:false});
            console.log(ex);
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
                            Te enviaremos un codigo a tu correo con el que podras cambiar tu contraseña luego 
                        </Text>
                        <InputLogin
                            placeholder = "Email"
                            onChangeText={(email)=>{this.setState({email})}}
                            value = {this.state.email}
                            error={this.state.error}>
                        </InputLogin>
                        <Text style={{color:"#FFFFFFaa", textAlign:'center' , marginBottom:10}} onPress={()=>this.props.navigation.navigate('forgotPassword')}>
                            Ya tengo un codigo
                        </Text>
                        <SubmitButton text = 'Enviar' onPress = {this.handleSubmit} style={{ marginHorizontal: 0}}/>
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
    }
});

export default SendEmail;