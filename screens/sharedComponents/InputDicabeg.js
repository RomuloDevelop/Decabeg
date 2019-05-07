import React, {Component} from 'react';
import { View, TextInput, Text, StyleSheet} from 'react-native';
import { Item, Icon, Input, Label } from 'native-base';

function InputLogin(props){
    return(
        <View>                
            <TextInput
                ref={props.inputRef}
                style = {[styles.inputContainer,{borderColor:props.error?'red':'#FFFFFF00',borderWidth:1}]}
                placeholder = {props.placeholder}
                placeholderTextColor = "rgba(255,255,255,0.7)"
                onChangeText={props.onChangeText}
                onSubmitEditing = {props.onSubmitEditing}
                returnKeyType = "next"
                blurOnSubmit={false}
                secureTextEntry = {props.secureTextEntry}
                value = {props.value}></TextInput>
            {(props.error !== '' && props.error)&&(<Text style={styles.errorMessage}>{props.error}</Text>)}
        </View>
    );
}

function InputFormApp(props){
    <Item floatingLabel success = {props.success}>
      <Label>{props.label}</Label>
      <Input onChangeText={props.handlePassword} value={props.password}/>
      <Icon name={props.icon}/>
    </Item>
}

const styles = StyleSheet.create({
    inputContainer: {
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 10,
        color: '#FFF',
        borderRadius: 10,
        elevation: 1,
        shadowOpacity: 2,
        shadowRadius: 2,
        shadowColor: '#000'
    },    
    errorMessage: {
        color:'red',
        marginBottom: 10,
    }
});

export {
    InputLogin,
    InputFormApp
};