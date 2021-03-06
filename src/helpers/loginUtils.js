import { clearData } from './sessionData';
import { signOut as googleSingOut } from '../Api/SessionManager/googleApi';
import { signOut as facebookSingOut } from '../Api/SessionManager/facebookApi';

function removeUpperAndSpaces(value){
    return value.trim().toLowerCase();
}

function validateEmail(value) {
    const testing = /^[a-z0-9._]+\@[a-z]+\.(com|email)$/;
    return (value)?testing.test(value):false;
}

function validatePassword(value) {
    const testing = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_\-])[A-Za-z\d@$!%*#?&_\-]{8,15}$/
    return (value)?testing.test(value):false;
}

function validateChangePassword(value, password) {
    return value === password;
}

function checkLoginField(value, field='email', password=''){
    let message = "no corresponde a un formato válido";
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
    removeUpperAndSpaces,
    validateEmail,
    validatePassword,
    validateChangePassword,
    checkLoginField,
    signOut
}