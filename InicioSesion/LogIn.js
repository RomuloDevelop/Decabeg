import React, {Component}  from 'react';
import { 
    View, 
    Text, 
    TouchableHighlight,
    TextInput, StyleSheet, Image, ScrollView} from 'react-native';


const styles = StyleSheet.create({
    textInputContainer: {
        flex: 1
    },
    textInput:{
        flex: 2,
        height: 40,
        paddingLeft: 5,
        margin: 10,
        backgroundColor: '#fff',
        fontSize: 15,
        borderRadius: 10,
        elevation: 1,
        shadowOpacity: 2,
        shadowRadius: 2,
        shadowColor: '#000'
    },
    buttonContainer: {
        flex:1, 
        marginTop: 10,
        alignItems: 'center',
        flexDirection:"row"
    },
    button:{
        flex: 1,
        height: 40,
        margin: 5,
        borderRadius: 20,
        backgroundColor: '#58acfa',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1,
        shadowOpacity: 2,
        shadowRadius: 2,
        shadowColor: '#000'
    },
    buttonText:{
        fontSize: 15,
        color: '#fff',
        fontWeight: '100'
    },
    image:{
        width: 400,
        height: 50
    },
});

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

    render(){
        return (
            <ScrollView style={{flex:1}}>
                <Image 
                    style={[styles.image, {flex:2}]}
                    source={require('../assets/reactIcon.png')}
                />
                <View style={{flex:3}}>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style = {styles.textInput}
                            spellCheck = {false}
                            onChangeText= {this.handleChangeUser}
                            placeholder = "Tel./E-mail"
                            value = {this.state.user}
                        />
                        <TextInput
                            style = {styles.textInput}
                            spellCheck = {false}
                            onChangeText= {this.handleChangePassword}
                            placeholder = "Password"
                            value = {this.state.password}
                        />
                    </View>
                    <View style = {styles.buttonContainer}>
                        <TouchableHighlight
                            onPress = {this.handleLoginPress}
                            style = {styles.button}>
                            <Text style = {styles.buttonText}>
                                Log in
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress = {this.handleCancelPress}
                            style = {styles.button}>
                            <Text style = {styles.buttonText}>
                                Cancel
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
export default LogIn;