import React , {useState} from 'react';
import {View} from 'react-native';
import {withModal} from "../containers";
import { Item, Input, Label, Form, Text } from 'native-base';
import SubmitButton from './SubmitButton';
import {InputFormApp} from './InputDicabeg';
import {appAlert} from '../helpers';
import globalStyles from '../styles';

const FormWithModal = (props) => {
    let newEmail = '';
    if(props.email) newEmail = props.email;
    const [code, setCode] = useState('');
    const [email, setEmail] = useState(newEmail);
    const [error, setError] = useState('');
    return (
        <View style={{padding: 30}}>
            <Text style={[globalStyles.infoText, {color:'#000000aa'}]}>Ingresa aquí tu email junto con el código correspondiente</Text>
            <Form>
                <InputFormApp value={code} onChangeText={({value, success, errorMessage})=>{
                    setCode(value);
                 }} label="Código"/>
                <InputFormApp type="email" value={email} onChangeText={({value, success, errorMessage})=>{
                    setEmail(value);
                    setError(errorMessage);
                 }} label="Email"/>
            </Form>
            <SubmitButton onPress={()=>{
                if(code === '') {
                    appAlert('Código','Debe ingresar un código');
                    return;
                }
                if(error === 'Correct') {
                    props.onPressSubmit({new_email:email, temporal_code:code});
                } else {
                    appAlert('Email',error)
                }
            }} style={{marginTop:20}} text="Agregar"/>
        </View>
    );
}

const SendEmailCode = withModal(FormWithModal);

export default SendEmailCode;