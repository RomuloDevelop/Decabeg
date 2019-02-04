import React, {Component}  from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    TextInput, StyleSheet, Image, ScrollView} from 'react-native';
import Hr from 'react-native-hr-plus'
import {Button, Icon} from 'native-base';
import { GoogleSignin , statusCodes } from 'react-native-google-signin';
import { sendForgotPassword } from '../../Api/api';

    
// ...

// Attempt a login using the Facebook login dialog,
// asking for default permissions.

class ForgotPassword extends Component{
    constructor(props){
        super(props);
        this.userInfo = {};
        this.state = {
            user: '',
            password: ''
        }
    }

    handleSendPress = async () => {
        try{
            const email = this.state.user;
            await sendForgotPassword(email)
        } catch(ex) {
            console.log(`${ex.method}: ${ex.message}`);
        }
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
                            value = {this.state.user}>
                        </TextInput>
                        <TouchableOpacity 
                            style = {styles.buttonContainer}
                            onPress = {this.handleSendPress}>
                            <Text style = {styles.textButton}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
export default ForgotPassword;

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