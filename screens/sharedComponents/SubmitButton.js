//@flow
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import type { SubmitButtonProps } from 'screen-module';

function SubmitButton(props: SubmitButtonProps){
    return (
        <TouchableOpacity 
            style = {[styles.buttonContainer,props.style]}
            onPress = {props.onPress}>
            <Text style = {styles.textButton}>{props.text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 15,
        backgroundColor: 'rgba(41, 128, 185,1.0)',
        borderRadius: 10,
        elevation: 1,
        shadowOpacity: 2,
        shadowRadius: 2,
        shadowColor: '#000'
    },
    textButton: {
        color: '#FFF',
        textAlign: 'center'
    }
});

export default SubmitButton;