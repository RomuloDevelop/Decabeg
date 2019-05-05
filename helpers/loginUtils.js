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
    let message = "doesn't match the format";
    if(isEmail){
        if(!validateEmail(value)) return `This email ${message}`;
    } else if(!validatePassword(value)) return `This password ${message}`;
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