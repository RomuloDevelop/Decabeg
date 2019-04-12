import React, {Component} from 'react';
import {View, ProgressBarAndroid, Linking} from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';
import { getAppToken, getUserData, clearData } from '../../helpers/sessionData';
import { facebookSilently } from '../../Api/SessionManager/facebookApi';
import { googleSilently } from '../../Api/SessionManager/googleApi';
import { sendUserLogin } from '../../Api/api';
import config from '../../config';
import globalStyles from '../../styles';

export default class LoadingSession extends Component {
    constructor(props){
        GoogleSignin.configure({
            webClientId: config.webClientId,
            offlineAccess: false,
        });
        super(props);
        this.googleFails = false;
    }

    async getActualData(){
        try{
            const account = await getAppToken();
            if(account){
                const userData = await getUserData();
                console.log(`Account: ${JSON.stringify(account)} Data: ${JSON.stringify(userData)}`);
            } 
            console.log(account)
            return account;
        } catch(ex){
            throw ex
        }
    }

    async loginSilently(actualData){
        try {
            let result = '';
            console.log('silentlyProgress');
            if(!this.googleFails){
                result = await googleSilently();
            } else {
                result = await facebookSilently();
            }
            if(result){
                this.signInAppOAuth(result);
            } else{
                this.props.navigation.navigate('sesion');
            }
        } catch(ex){
            if(!this.googleFails){
                this.googleFails = true;
                console.log('googlefailsProgres:'+ this.googleFails);
                await this.loginSilently();
            } else {
                console.log(ex);
                this.props.navigation.navigate('sesion');
            }

        }
    }

    async signInAppOAuth(user){
        try {
            console.log(user);
            let invalid = await this.signInApp(user.userAccount);
            if(invalid){
                this.props.navigation.navigate('sesion');
                console.log('An error ocurred while login/registration, please try again');
            }
        } catch(ex){
            console.log(ex);
            this.props.navigation.navigate('sesion');
        }
    }

    async signInApp(user){
        try {
            let response;
            response = await sendUserLogin(user);
            if(response){
               this.props.navigation.navigate('home', {
                   user
                });
               return false;
            }
            else return true;
        } catch(ex){
            throw ex;
        }
    }

    componentDidMount(){
        //this.props.navigation.navigate('history');
         this.getActualData()
         .then(async (data)=>{
             try{
                 if(data) {
                     console.log(data)
                     const tokenDate = new Date(data.expiration*1000);
                     const actualDate = new Date();
                     console.log(`${JSON.stringify(actualDate)} - ${JSON.stringify(tokenDate)}`);
                     const unixToday = (actualDate.getTime()/1000);
                     if( unixToday < data.expiration)
                         this.props.navigation.navigate('home', {expiration:data.expiration});
                     else {
                         this.props.navigation.navigate('sesion', {expiration:data.expiration});
                         await clearData();
                     }
                 } 
             } catch(ex){
                 console.log(ex);
             }
         })
         .catch((ex)=>{
             if(ex === 'No data was found'){
                 console.log('confirm url');
                 Linking.getInitialURL().then(url => {
                     if(url)this.navigate(url);
                     else this.props.navigation.navigate('sesion');        
                 }).catch((ex)=>console.error('An error ocurred', ex));
             } else {
                 this.props.navigation.navigate('sesion');
                 console.log(ex);
             }
        });
    }

    handleOpenURL = (event) => {
        this.navigate(event.url);
    }

    navigate = (url) => { // E
        const route = url.replace(/.*?:\/\//g, '');
        //const id = route.match(/\/([^\/]+)\/?$/)[1];
        const params = route.split('/');
        console.log(params);
        if (params[0] === 'signup')
            this.props.navigation.navigate('singup', { showCode: true, code:params[1] })
        else if(params[1] === 'signup')
            this.props.navigation.navigate('singup', { showCode: true, code:params[2] })
        else this.props.navigation.navigate('home');

    }

    render(){
        return(
            <View style={{
                flex:1, 
                backgroundColor:globalStyles.mediumBlue,
                justifyContent:'center',
                alignItems:'center'
                }}>
                <ProgressBarAndroid
                      indeterminate={true}
                      color={globalStyles.lightBlue}
                      styleAttr='Large'/> 
            </View>);
    }
}