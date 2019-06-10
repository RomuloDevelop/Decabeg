//@flow
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import type { SubmitButtonProps } from 'screen-module';

import {buttonForm} from '../styles';

function SubmitButton(props: SubmitButtonProps){
    return (
        <TouchableOpacity 
            style = {[buttonForm.buttonContainer,props.style]}
            onPress = {props.onPress}>
            <Text style = {buttonForm.textButton}>{props.text}</Text>
        </TouchableOpacity>
    );
}

export default SubmitButton;