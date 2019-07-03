import React , {useState} from 'react';
import {View} from 'react-native';
import {withModal} from "../containers";
import { Item, Input, Label, Form, Text } from 'native-base';
import SubmitButton from './SubmitButton';
import {InputFormApp} from './InputDicabeg';
import {appAlert} from '../helpers';
import globalStyles from '../styles';

const FormWithModal = (props) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    return (
        <View style={{padding: 30}}>
            <Text style={[globalStyles.infoText, {color:'#000000aa'}]}>Ingresa aquí tu email y te enviaremos un correo con el código correspondiente</Text>
            <Form>
                <InputFormApp type="email" value={email} onChangeText={({value, success, errorMessage})=>{
                    setEmail(value);
                    setError(errorMessage);
                 }} label="Email"/>
            </Form>
            <SubmitButton onPress={()=>{
                if(error === 'Correct') {
                    setEmail('');
                    props.onPressSubmit(email);
                } else {
                    appAlert('Email',error)
                }
            }} style={{marginTop:20}} text="Agregar"/>
        </View>
    );
}

const SendEmailCode = withModal(FormWithModal);

export default SendEmailCode;