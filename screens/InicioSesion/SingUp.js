import React, {Component}  from 'react';
import { 
    View, 
    ScrollView, 
    TouchableOpacity,
    TextInput, StyleSheet, Image} from 'react-native';
import {
    Badge, Text, Icon
} from 'native-base';
import { sendUserLogin, sendUserSignUp } from '../../Api/api';


class SingUp extends Component{
    state = {
        username: '',
        email: '',
        password: '',
        invite_code:'',
        repeatpassword: '',
        validPassword: false,
        validEmail: false,
        showInvalidRepeatPassword: false,
        showInvalidPassword: false,
        iconName: 'eye',
        security: true,
        showValidRepeatPassword: false,
        showCode:false,
    }

    componentDidMount(){
        const {navigation} = this.props;
        const showCode = navigation.getParam('showCode', false);
        const invite_code = navigation.getParam('code','');
        this.setState({invite_code, showCode});
    }

    handleChangeUsername = (value) => {
        this.setState({username:value});
    }

    handleChangeEmail = (value) => {
        const testing = /\S+@\S+\.\S+/;
        const validEmail = testing.test(value);
        this.setState({email:value, validEmail});
    }

    handleChangePassword = (value) => {
        let {validPassword} = this.state
        const testing = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_\-])[A-Za-z\d@$!%*#?&_\-]{8,}$/
        validPassword = testing.test(value);
        this.setState({password:value, validPassword});
    }
    
    handleBlurPassword = () => {
        const {validPassword} = this.state
        this.setState({showInvalidPassword: !validPassword});
    }

    handleChangeRepeatpassword = (value) => {
        let {password, validRepassword} = this.state
        validRepassword = (password === value)
        this.setState({repeatpassword: value, validRepassword});
    }

    handleBlurRepeatpassword = () => {
        const {validRepassword} = this.state
        this.setState({showInvalidRepeatPassword: !validRepassword});
    }

    handlePressSingUp = async ()=>{
        try {
            if(this.state.validEmail && this.state.validPassword){
                const userAccount = {
                    username:this.state.username,
                    email:this.state.email,
                    password:this.state.password
                };
                if(this.state.showCode) userAccount.invite_code = this.state.invite_code;
                await sendUserSignUp(userAccount);
                this.props.navigation.goBack();
            }
        } catch(ex){
            console.log(ex);
            alert(JSON.stringify(ex));
        }
      }
    render(){
        return (           
        <ScrollView style ={{backgroundColor: 'rgba(52, 152, 219,1.0)'}}>
            {/*<LinearGradient style ={styles.container} colors={['#0fbcf9','#0174DF']}>*/}
            <View style ={styles.container}>
                    <Text style={{fontSize:20, color:'#fff', textAlign:'center', margin:30}}>
                        CREATE ACCOUNT
                    </Text>
                    <Text style={{fontSize:14, color:'rgba(255,255,255,0.5)', textAlign:'left', margin:10}}>
                        * Password must have lenght 8, at least 1 digit, 1 special character (@$!%*#?&_-)
                    </Text>
                    <TextInput
                        style = {styles.inputContainer}
                        placeholder = "Username"
                        placeholderTextColor = "rgba(255,255,255,0.7)"
                        value = {this.state.username}
                        onChangeText={this.handleChangeUsername}
                    ></TextInput>
                    <View style={[styles.inputIconContainer,styles.inputContainer,
                        {borderColor:this.state.validEmail?'green':'red', 
                        borderWidth:1}]}>
                        <TextInput
                            style = {styles.innerInput}
                            placeholder = "Email"
                            placeholderTextColor = "rgba(255,255,255,0.7)"
                            value = {this.state.email}
                            onChangeText={this.handleChangeEmail}
                        ></TextInput>
                        <Icon 
                            style={[styles.inputIcon, {color:this.state.validEmail?'green':'red'}]}
                            name={this.state.validEmail?'checkmark-circle':'close-circle'}
                            size={20} />
                    </View>
                    <View style={[styles.inputIconContainer,styles.inputContainer]}>
                        <TextInput
                            style={styles.innerInput}
                            placeholder="Password"
                            placeholderTextColor = "rgba(255,255,255,0.7)"
                            maxLength={8}
                            secureTextEntry={this.state.security}
                            onChangeText={this.handleChangePassword}
                            onBlur={this.handleBlurPassword}
                        />
                        <Icon 
                            style={styles.inputIcon} name={this.state.iconName} type='FontAwesome' 
                            size={20}
                            value = {this.state.password}
                            onPress = {()=>{
                                    if (this.state.iconName === 'eye')
                                        this.setState({iconName:'eye-slash', security:false})
                                    else 
                                        this.setState({iconName:'eye', security:true})
                                }}/>
                            
                    </View>
                    {this.state.showInvalidPassword && (
                        <Badge danger style={{marginBottom: 20}}>
                            <View style={{flexDirection:'row', justifyContent:'center', alignItems: 'center'}}>
                                <Icon name="times-circle" type='FontAwesome' style={styles.badgeIcon}/>
                                <Text>Invalid Password</Text> 
                            </View>
                        </Badge>
                    )
                    }
                    <TextInput
                        style = {styles.inputContainer}
                        placeholder = "Repeat Password"
                        placeholderTextColor = "rgba(255,255,255,0.7)"
                        secureTextEntry = {true}
                        value = {this.state.repeatpassword}
                        secureTextEntry={true}
                        maxLength={8}
                        onChangeText={this.handleChangeRepeatpassword}
                        onBlur={this.handleBlurRepeatpassword}
                    ></TextInput>
                    {this.state.showInvalidRepeatPassword && (
                        <Badge danger style={{marginBottom: 20}}>
                            <View style={{flexDirection:'row', justifyContent:'center', alignItems: 'center'}}>
                                <Icon name="times-circle" type='FontAwesome' style={styles.badgeIcon}/>
                                <Text>Password its not the same</Text> 
                            </View>
                        </Badge>
                    )
                    }
                    {this.state.showCode&&(
                    <TextInput
                        style = {styles.inputContainer}
                        placeholder = "Code"
                        placeholderTextColor = "rgba(255,255,255,0.7)"
                        value = {this.state.invite_code}
                        editable = {false}
                    ></TextInput>
                    )}
                    <TouchableOpacity 
                        style = {[styles.buttonContainer ,{backgroundColor:"rgba(65, 197, 240,1.0)"}]}
                        onPress={this.handlePressSingUp}>
                        <Text style = {styles.textButton}>REGISTER</Text>
                    </TouchableOpacity>
            {/*<LinearGradient*/}
            </View>
        </ScrollView>
        );
    }
}

export default SingUp;

const styles = StyleSheet.create({
    container: {
        padding: 30,
        textAlign: 'center'
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
    badgeIcon:{
        fontSize: 15, 
        color: "#fff", 
        lineHeight: 20, 
        marginRight: 5
    },
    inputIconContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FFF'
    },
    inputIcon: {
        padding: 10,
        color: '#FFF'
    },
    innerInput: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        color: '#FFF'
    },
});