// @flow
import { clearData } from './sessionData';
import { signOut as googleSingOut } from '../Api/SessionManager/googleApi';
import { signOut as facebookSingOut } from '../Api/SessionManager/facebookApi';
import type {LoginFieldType} from 'helpers-module';

function validateEmail(value: string):boolean {
    const testing = /\S+@\S+\.\S+/;
    return (value)?testing.test(value):false;
}

function validatePassword(value: string): boolean {
    const testing = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_\-])[A-Za-z\d@$!%*#?&_\-]{8,}$/
    return (value)?testing.test(value):false;
}

function validateChangePassword(value: string, password:string): boolean {
    return value === password;
}

function checkLoginField(value: string, field:LoginFieldType='email', password:string=''):string{
    let message = "no corresponde al formato";
    if(field === 'email'){
        if(!validateEmail(value)) return `El email ${message}`;
    }else if(field === 'password'){
        if(!validatePassword(value)) return `La contrseña ${message}`;
    }else if(field === 'repeatpassword'){
        if(!validateChangePassword(value, password)) return `Las contrseñas son diferentes`;
    }
    return "Correct";
}
// async function logout(){
//     try {
//         await googleSingOut();
//         await facebookSingOut();
//         await sendUserLogOut();
//         await clearData();
//     } catch (ex) {
//         throw ex;
//     }
// }




async function signOut(){
    try {
        await googleSingOut();
        await facebookSingOut();
        //await sendUserLogOut();
        await clearData();
        this.props.navigation.navigate('login');
    } catch (error) {
        console.log(JSON.stringify(error));
    }
}

export{
    validateEmail,
    validatePassword,
    checkLoginField,
    signOut
}