import React from 'react';
import { Text } from 'react-native';
import Touchable from 'react-native-platform-touchable';

import globalStyles,{buttonForm} from '../styles';

function SubmitButton(props){
    let rippleColor = globalStyles.lightBlue;
    if(props.style){
        const style = props.style;
        if(style.backgroundColor && style.backgroundColor === rippleColor){
            rippleColor = globalStyles.darkBlue;
        }
    }
    return (
        <Touchable 
            style = {[buttonForm.buttonContainer,props.style]}
            onPress = {props.onPress}
            background={Touchable.Ripple(rippleColor)}>
            <Text style = {[buttonForm.textButton,props.textStyle]}>
                {props.text}
            </Text>
        </Touchable>
    );
}

export default SubmitButton;