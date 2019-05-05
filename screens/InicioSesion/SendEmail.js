import React, {Component}  from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    TextInput, StyleSheet, Image, ScrollView} from 'react-native';
import {Button, Icon} from 'native-base';
import { GoogleSignin , statusCodes } from 'react-native-google-signin';
import { sendEmail } from '../../Api';
import { checkLoginField } from '../../helpers';
import SubmitButton from '../sharedComponents/SubmitButton';
import globalStyles from '../../styles';
    
// ...

// Attempt a login using the Facebook login dialog,
// asking for default permissions.

class SendEmail extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
        }
    }

    handleSendPress = async () => {
        try{
            const email = this.state.email;
            const message = checkLoginField(email);
            if(message === "Correct")
                await sendEmail(email);
            else alert(message);
        } catch(ex) {
            console.log(`${ex.method}: ${ex.message}`);
        }
    }

    handleChangeEmail = (email)=>{this.setState({email})}
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
                        <TextInput
                            style = {styles.inputContainer}
                            placeholder = "Email"
                            placeholderTextColor = "rgba(255,255,255,0.7)"
                            onChangeText={this.handleChangeEmail}
                            value = {this.state.email}>
                        </TextInput>
                        <Text style={{color:"#FFFFFFaa", textAlign:'center' , marginBottom:10}} onPress={()=>this.props.navigation.navigate('forgotPassword')}>
                            Ya tengo un codigo
                        </Text>
                        <SubmitButton text = 'Enviar' onPress = {this.handleSendPress}/>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
export default SendEmail;

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