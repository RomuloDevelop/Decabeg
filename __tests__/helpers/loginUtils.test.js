// @flow
import { validateEmail, validatePassword } from '../../helpers/loginUtils';

describe('validate email and password on different cases',()=>{
    it('validate email',()=>{
        expect(validateEmail('r')).toBeFalsy();
        expect(validateEmail('r@')).toBeFalsy();
        expect(validateEmail('r@g')).toBeFalsy();
        expect(validateEmail('r@g.')).toBeFalsy();
        expect(validateEmail('r@g.c')).toBeTruthy();
    })
    it('validate password',()=>{
        expect(validatePassword('Romul-0')).toBeFalsy(); //Tamaño
        expect(validatePassword('romulo00')).toBeFalsy(); //Special caracter
        expect(validatePassword('Romulo-a')).toBeFalsy(); //Number
        expect(validatePassword('Romulo-0')).toBeTruthy(); //Right Password
    })
});