import React, {Component}  from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    TextInput, StyleSheet, Image, ScrollView} from 'react-native';
import Hr from 'react-native-hr-plus'
import {Button, Icon} from 'native-base';
import { GoogleSignin , statusCodes } from 'react-native-google-signin';
import { sendUserLogin, sendUserSignUp } from '../../Api/api';
//import LinearGradient from 'react-native-linear-gradient';
import { LoginManager, GraphRequest, GraphRequestManager, AccessToken } from 'react-native-fbsdk';

    
// ...

// Attempt a login using the Facebook login dialog,
// asking for default permissions.

class LogIn extends Component{
    constructor(props){
        super(props);
        this.googleFails= false;
        this.fromGoBack = false;
        this.userInfo = {};
        this.state = {
            user: '',
            password: '',
            userInfo: {}
        }
    }
    // componentWillMount(){
    //     this.loginSilently();
    // }

    async loginSilently(){
        try {
            if(!this.fromGoBack){
                console.log('silently');
                if(!this.googleFails){
                    GoogleSignin.configure();
                    await this.getCurrentUserInfo();
                } else {
                    AccessToken.getCurrentAccessToken().then((token)=>{
                        if(token.accessToken){
                            this.singInFacebook();
                        } else console.log("No facebook token found")
                        
                    }).catch((ex)=>console.log(ex));
                }
            }
        } catch(ex){
            if(!this.googleFails){
                this.googleFails = true;
                console.log('googlefails:'+ this.googleFails);
                await this.loginSilently();
            } else {
                console.log(ex);
            }

        }
    }

    async infoUserFacebookManager(){
        const accessToken = (await AccessToken.getCurrentAccessToken()).accessToken;
        const infoRequest = new GraphRequest(
            '/me',{
                parameters: {
                  fields: {
                    string: 'email,name'
                  },
                  accessToken:  {
                    string: accessToken.toString() // put your accessToken here
                  },
                }
              }, 
            (error, result)=>{
                if (error) {
                  console.log('Error fetching data: ' + error.toString());
                } else {
                  console.log('Success fetching data: ' + JSON.stringify(result).toString());
                  this.userInfo = result;
                  console.log(`User: ${this.userInfo}`);
                }
            }
          );
                
        await new GraphRequestManager().addRequest(infoRequest).start();
    }
    singInFacebook = () => {
        LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
          (result) =>{
              console.log(`result: ${JSON.stringify(result)}`);
            if (result.isCancelled) {
              console.log('Login was cancelled');
            } else {
              console.log('Login was successful with permissions: '
                + result.grantedPermissions.toString());
              this.infoUserFacebookManager()
            }
          },
          (error) => {
            console.log('Login failed with error: ' + error);
          });
    }
    signInGoogle = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          this.userInfo = await GoogleSignin.signIn();
          this.signInAppOAuth({email:this.userInfo.email, password:this.userInfo.password, username:this.userInfo.name});
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('user cancelled the login flow');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('operation (f.e. sign in) is in progress already');
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('play services not available or outdated');
          } else {
            console.log(error);
          }
        }
      };
      getCurrentUserInfo = async () => {
        try {
          const {user} = await GoogleSignin.signInSilently();
          console.log(user);
          this.signInAppOAuth({email:user.email, password:user.id, username:user.name})
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_REQUIRED) {
            console.log('Google: user has not signed in yet');
          } else {
            console.log(error);
          }
          throw "Error getting google info";
        }
      };
    handleChangeUser = (value) => {
        this.setState({user:value});
    }

    handleChangePassword = (value) => {
        this.setState({password:value});
    }

    handleCancelPress = (value)=>{
        this.props.navigation.goBack();
    }

    handleLoginPress = async () => {
        try{
            // const email = this.state.user;
            // const password = this.state.password;
            // await this.signInApp({email, password})
            this.props.navigation.navigate('home');
        } catch(ex) {
            console.log(`${ex.method}: ${ex.message}`);
        }
    }

    signInApp = async(userData) =>{
        try {
            let response;
            response = await sendUserLogin(userData);
            if(response.ok){
               this.props.navigation.navigate('home', {
                   user:userData,
                   onGoBack: () => {this.fromGoBack=true;}
                });
               return false;
            }
            else return true;
        } catch(ex){
            console.log(JSON.stringify(ex));
        }
    }

    signInAppOAuth = async (userData)=>{
        try {
            let invalid = await this.signInApp(userData);
            if(invalid){
                await sendUserSignUp(userData);
                invalid = await this.signInApp(userData);
                if(invalid)
                    console.log('An error ocurred while login/registration, please try again');
            }
        } catch(ex){
            console.log(ex);
        }
    }

    handlePressSingUp = ()=>{
        this.props.navigation.navigate('singup',
        {onGoBack: () => {this.fromGoBack=true; console.log('Executed');}});
    }
    render(){
        return (
            <ScrollView style ={{backgroundColor: 'rgba(52, 152, 219,1.0)'}}>
                {/*<LinearGradient style ={styles.container} colors={['#0fbcf9','#0174DF']}>*/}
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
                            value = {this.state.user}
                        ></TextInput>
                        <TextInput
                            style = {styles.inputContainer}
                            placeholder = "Password"
                            placeholderTextColor = "rgba(255,255,255,0.7)"
                            secureTextEntry = {true}
                            onChangeText={this.handleChangePassword}
                            value = {this.state.password}
                        ></TextInput>
                        <TouchableOpacity 
                            style = {styles.buttonContainer}
                            onPress = {this.handleLoginPress}>
                            <Text style = {styles.textButton}>LOGIN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style = {[styles.buttonContainer ,{backgroundColor:"rgba(65, 197, 240,1.0)"}]}
                            onPress={this.handlePressSingUp}>
                            <Text style = {styles.textButton}>SING UP</Text>
                        </TouchableOpacity>
                        <Text style={{color:"rgba(65, 197, 240,1.0)", textAlign:'center' , marginBottom:10}}
                            onPress={()=>{this.props.navigation.navigate('forgotPassword',{
                                    onGoBack: () => {this.fromGoBack=true;}
                                });
                            }}>
                            Forgot Password?
                        </Text>
                    </View>
                    <Hr color='white' width={1}>
                        <Text style={styles.textHr}>OR</Text>
                    </Hr>
                    <View style={styles.socialButtonContainer}>
                        <Button style={[styles.socialButton,{ backgroundColor: '#3B5998' }]}>
                            <Icon name="logo-facebook" 
                            onPress={this.singInFacebook}/>
                        </Button>
                        <Button style={[styles.socialButton,{ backgroundColor: '#DD5144' }]}
                            onPress={this.signInGoogle}>
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