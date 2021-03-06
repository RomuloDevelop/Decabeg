import React, {Component} from 'react';
import { View, TextInput, Text, Picker, StyleSheet } from 'react-native';
import { Item, Icon, Input, Label, Badge, CheckBox } from 'native-base';
import {checkLoginField} from '../helpers';
import globalStyles from '../styles';

function InputLogin(props){
    return(
        <View>                
            <TextInput
                ref={props.inputRef}
                style = {[styles.inputContainer,{borderColor:props.error?'red':'#FFFFFF00',borderWidth:1}]}
                placeholderTextColor = "rgba(255,255,255,0.7)"
                returnKeyType = "next"
                blurOnSubmit={false}
                autoCapitalize='none'
                autoCorrect={false}
                selectionColor={globalStyles.darkBlue}
                {...props}/>
            {(props.error !== '' && props.error)&&(<Text style={styles.errorMessage}>{props.error}</Text>)}
        </View>
    );
}

function PickerLogin(props){
    return(
        <View style={[styles.inputContainer,{borderRadius: 10,  overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.2)'}]}>        
            <Picker style={{color:'rgba(255,255,255,0.7)', height:40}}
                selectedValue={props.value}
                onValueChange={props.onValueChange}>
                {props.data.map((item, index)=><Picker.Item key={index} label={item.label} value={item.value} />)}
            </Picker>
        </View>
    );
}

class InputFormApp extends Component{
    constructor(props){
        super(props);
        this.state={
            secureTextEntry: false,
            showMessage:false,
            success:false,
            errorMessage:''
        }
    }

    componentDidMount(){
        const type = this.props.type;
        if(type==='password' || type ==='repeatpassword')
            this.setState({secureTextEntry:true});
    }

    componentWillUpdate(nextProps){
        if(this.props.type === 'repeatpassword'){
            if(nextProps.password !== this.props.password && this.props.value){
                const errorMessage = checkLoginField(this.props.value, 'repeatpassword', nextProps.password);
                const notError = (errorMessage === 'Correct');
                if(notError)
                    this.setState({errorMessage, success:notError, showMessage:false })
                else this.setState({errorMessage, success:notError, showMessage:true });                
            }
        }
    }

    handleBlur = ()=>{
        if(!this.state.success && this.state.errorMessage !==''){
            this.setState({showMessage:true});
        }
    }

    changeState = (errorMessage)=>{
        const success = (errorMessage==='Correct');
        if(success)
            this.setState({errorMessage, success, showMessage:false});
        else
            this.setState({errorMessage,success});
        return {success,errorMessage};
    }

    validateInputEmail = (value)=>{
        const errorMessage = checkLoginField(value);
        return this.changeState(errorMessage);
    }

    validateInputPassword = (value)=>{
        const errorMessage = checkLoginField(value,'password');
        return this.changeState(errorMessage);
    }

    validateInputChangePassword = (value)=>{
        const errorMessage = checkLoginField(value, 'repeatpassword', this.props.password);
        return this.changeState(errorMessage);   
    }

    render(){
        let messageToShow='';
        let show = false;
        if(this.props.errorMessage&&this.props.errorMessage!==''){
            show = true;
            messageToShow = this.props.errorMessage;
        }else{
            show = this.state.showMessage;
            messageToShow=this.state.errorMessage;
        }
        return(
        <View>
            <Item floatingLabel={!this.props.stacked} 
                stackedLabel={this.props.stacked}
                disabled={this.props.disabled} 
                success = {this.state.success}>
                <Label>{this.props.label}</Label>
                <Input onChangeText={(value)=>{
                    try{
                        let errorMessage = {};
                        switch (this.props.type) {
                            case 'email':
                                errorMessage = this.validateInputEmail(value);
                                break;
                            case 'password':
                                errorMessage = this.validateInputPassword(value);
                                break;
                            case 'repeatpassword':
                                errorMessage = this.validateInputChangePassword(value);
                                break;
                            default:
                                break;
                        }
                        this.props.onChangeText({value, ...errorMessage});
                    } catch(ex){
                        console.log(ex);
                    }
                }} value={this.props.value} 
                onBlur={this.handleBlur} 
                disabled={this.props.disabled} 
                secureTextEntry={this.state.secureTextEntry} 
                autoCapitalize='none'
                autoCorrect={false}
                selectionColor={globalStyles.darkBlue}/>
            </Item>
            {show &&(
                    <Badge danger style={{marginTop: 5, marginLeft:10}}>
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems: 'center'}}>
                            <Icon name="times-circle" type='FontAwesome' style={styles.badgeIcon}/>
                            <Text style={{color:'#FFFFFF'}}>{messageToShow}</Text> 
                        </View>
                    </Badge>)}
        </View>
        );
    }
}

function CheckBoxFormApp(props){
    return (
        <View style={[{ flex:1,flexDirection:'row', marginLeft:10}, props.style]}>
          <CheckBox checked={props.value} 
            style={[{marginRight:15}, props.checkBoxStyle]}
            color={props.color}
            onPress={props.onPress}/>
            {props.children}
        </View>
    );
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
    }, 
    badgeIcon:{
        fontSize: 15, 
        color: "#fff", 
        lineHeight: 20, 
        marginRight: 5
    }
});

export {
    InputLogin,
    PickerLogin,
    InputFormApp,
    CheckBoxFormApp
};