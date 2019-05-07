// @flow
import { clearData } from './sessionData';

function validateEmail(value: string):boolean {
    const testing = /\S+@\S+\.\S+/;
    return (value)?testing.test(value):false;
}

function validatePassword(value: string): boolean {
    const testing = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_\-])[A-Za-z\d@$!%*#?&_\-]{8,}$/
    return (value)?testing.test(value):false;
}

function checkLoginField(value: string, isEmail:boolean=true):string{
    let message = "no corresponde al formato";
    if(isEmail){
        if(!validateEmail(value)) return `El email ${message}`;
    } else if(!validatePassword(value)) return `La contrseña ${message}`;
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

export{
    validateEmail,
    validatePassword,
    checkLoginField
}