import React, {Component} from 'react';
import { 
    View, 
    Text, 
    TouchableHighlight, StyleSheet, Image } from 'react-native';


const styles = StyleSheet.create({
    buttonContainer: {
        flex: 3,
        backgroundColor: '#0080ff'
    },
    button:{
        margin: 20,
        height: '15%',
        marginTop: 10,
        borderRadius: 20,
        backgroundColor: '#58acfa',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1,
        shadowOpacity: 2,
        shadowRadius: 2,
        shadowColor: '#000'
    },
    buttonText: {
        color: '#fff',
        fontSize: 25,
        fontWeight: '200',
        //fontFamily:"Arial, Helvetica, sans-serif"
    },
    image:{
        width: 400,
        height: 50
    },
});

class LogInSingUp extends Component {

    state = {
        title: null,
        date: ''
    };

    handlePressLogIn = () =>{
        this.props.navigation.navigate('login');
    }

    handlePressSingUp = ()=>{
        this.props.navigation.navigate('singup');
    }

    render(){
        return (
            <View style={{flex:1}}>
                <Image 
                    style={[styles.image, {flex:2}]}
                    source={require('../assets/reactIcon.png')}
                />
                <View style={styles.buttonContainer}>
                    <TouchableHighlight
                        onPress = {this.handlePressLogIn}
                        style = {[styles.button,{marginTop:'20%'}]}>
                        <Text style = {styles.buttonText}>
                            Log in
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress = {this.handlePressSingUp}
                        style = {styles.button}>
                        <Text style = {styles.buttonText}>
                            Sing up
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
export default LogInSingUp;