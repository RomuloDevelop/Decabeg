import React, {Component}  from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    TextInput, StyleSheet, Image, ScrollView} from 'react-native';
import Hr from 'react-native-hr-plus'
import {Button, Icon} from 'native-base';
//import LinearGradient from 'react-native-linear-gradient';

class LogIn extends Component{
    state = {
        user: '',
        password: ''
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

    handleLoginPress = () => {
        this.props.navigation.navigate('home');
    }

    handlePressSingUp = ()=>{
        this.props.navigation.navigate('singup');
    }
    render(){
        return (
            <ScrollView style ={{backgroundColor: 'rgba(52, 152, 219,1.0)'}}>
                {/*<LinearGradient style ={styles.container} colors={['#0fbcf9','#0174DF']}>*/}
                <View style ={styles.container}>
                    <Image 
                        style={styles.image}
                        source={require('../assets/reactIcon.png')}
                    />
                    <Text style={styles.textImage}>DECABEG</Text>
                    <View style = {styles.formContainer}>
                        <TextInput
                            style = {styles.inputContainer}
                            placeholder = "Email"
                            placeholderTextColor = "rgba(255,255,255,0.7)"
                            value = {this.state.user}
                        ></TextInput>
                        <TextInput
                            style = {styles.inputContainer}
                            placeholder = "Password"
                            placeholderTextColor = "rgba(255,255,255,0.7)"
                            secureTextEntry = {true}
                            value = {this.state.password}
                        ></TextInput>
                        <TouchableOpacity style = {styles.buttonContainer}>
                            <Text style = {styles.textButton}>LOGIN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style = {[styles.buttonContainer ,{backgroundColor:"rgba(65, 197, 240,1.0)"}]}
                            onPress={this.handlePressSingUp}>
                            <Text style = {styles.textButton}>SING UP</Text>
                        </TouchableOpacity>
                    </View>
                    <Hr color='white' width={1}>
                        <Text style={styles.textHr}>OR</Text>
                    </Hr>
                    <View style={styles.socialButtonContainer}>
                        <Button style={[styles.socialButton,{ backgroundColor: '#3B5998' }]}>
                            <Icon name="logo-facebook" />
                        </Button>
                        <Button style={[styles.socialButton,{ backgroundColor: '#DD5144' }]}>
                            <Icon name="logo-google" />
                        </Button>
                    </View>
                {/*<LinearGradient*/}
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