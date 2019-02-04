import React, {Component} from 'react';
import {View, Platform, ProgressBarAndroid} from 'react-native';
import {facebookSilently} from '../../Api/SessionManager/facebookApi';
import googleSilently from '../../Api/SessionManager/googleApi';
import { sendUserLogin, sendUserSignUp } from '../../Api/api';

import globalStyles from '../../styles';

export default class LoadingSession extends Component {
    constructor(props){
        super(props);
        this.googleFails = false;
    }
    async signInAppOAuth(userData){
        try {
            let invalid = await this.signInApp(userData);
            if(invalid){
                this.props.navigation.navigate('sesion');
                console.log('An error ocurred while login/registration, please try again');
            }
        } catch(ex){
            console.log(ex);
            this.props.navigation.navigate('sesion');
        }
    }

    async loginSilently(){
        try {
            let result = '';
            console.log('silentlyProgress');
            if(!this.googleFails){
                await goolgleSilently(this.signInAppOAuth);
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

    async signInApp(userData){
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
            throw ex;
        }
    }

    componentDidMount(){
        this.loginSilently();
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