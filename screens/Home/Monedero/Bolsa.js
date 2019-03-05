import React, {Component} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,  StyleSheet, ScrollView, TextInput} from 'react-native';
    import { Icon } from 'native-base';
import CardMonedero from './CardMonedero';
import { updateUserPointsMovileLocalAndSend } from '../../../Api/helpers';
import { getUserData } from '../../../dataStore/sessionData';

import globalStyles from '../../../styles';

const tasaConvertion = 0.5

class Bolsa extends Component {
    state = {
        byte: 0,
        kbyte: 0,
        mbyte: 0,
        saldobyte: 0,
        saldokbyte: 0,
        saldombyte: 0,
        datosInput: '',
        saldoInput: '',
    }
    getSaldoConvertion = async () => {
        try{
            const value = this.state.datosInput;
            if (typeof value !== 'undefined'){
                if(value > this.state.byte){
                    alert('No posee esos datos')
                    return;
                }
                await updateUserPointsMovileLocalAndSend((-1)*value, value * tasaConvertion);
                const byte = parseFloat(this.state.byte) - value;
                const saldobyte = parseFloat(this.state.saldobyte) + (value * tasaConvertion);
                this.setState({
                    byte,
                    kbyte: byte/1000,
                    mbyte: byte/1000000,
                    saldobyte,
                    saldokbyte: saldobyte/1000,
                    saldombyte: saldobyte/1000000
                })
            } else {
                alert('Especifique un valor a convertir');
            }
        } catch(ex) {
            console.log(ex);
        }
    }

    handleChangeSaldo = async (text) =>{
        const datosInput = this.state.datosInput
        const saldoInput = this.state.saldoInput
        const testing = /[0-9]*/
        if(testing.test(text)) {
            this.setState({
                datosInput: text,
                saldoInput: (text * tasaConvertion).toString()
            })
        } else {
            this.setState({
                datosInput,
                saldoInput
            })
        }
    }
    handlePressConvertion = () =>{
        const mbyte = this.state.mbyte - this.state.datosInput
        this.getSaldoConvertion(mbyte)
    }
    componentDidMount() {
        const {navigation} = this.props;
        navigation.addListener('didFocus',()=>{

            getUserData().then((data)=>{
                const {points = 0,money = 0} = data;
                console.log(points);
                const byte = points;
                const saldobyte = money;
                //const saldobyte = byte * tasaConvertion
                this.setState({
                    byte,
                    kbyte: byte/1000,
                    mbyte: byte/1000000,
                    saldobyte,
                    saldokbyte: saldobyte/1000,
                    saldombyte: saldobyte/1000000
                });
            });
        });
    }
    render() {
        return (
            <ScrollView style={{backgroundColor:globalStyles.fontGrey}}>
                <CardMonedero
                    textHeader = "Datos"
                    text1 = "Coins" item1 = {this.state.byte}
                    text2 = "KCoins" item2 = {this.state.kbyte}
                    text3 = "MCoins" item3 = {this.state.mbyte}
                    style = {{marginTop: 40}}
                />
                
                <CardMonedero
                    textHeader = "Saldo"
                    text1 = "Coins" item1 = {this.state.saldobyte}
                    text2 = "KCoins" item2 = {this.state.saldokbyte}
                    text3 = "MCoins" item3 = {this.state.saldombyte}
                />
                <Text style = {styles.convertionText}>
                    Tasa de Conversion: {tasaConvertion}
                </Text>
                <View style = {styles.convertionForm}>
                    <TextInput
                        style = {styles.textInput}
                        spellCheck = {false}
                        onChangeText= {(text) => this.handleChangeSaldo(text)}
                        placeholder = "Datos"
                        keyboardType = 'numeric'
                        value = {this.state.datosInput}/>
                    <Icon type="FontAwesome" name="exchange"
                        style = {{textAlign: 'center', transform: [{ rotate: '90deg' }]}}/>
                    <TextInput
                        style = {styles.textInput}
                        spellCheck = {false}
                        //onChangeText= {this.handleChangePassword}
                        placeholder = "Saldo"
                        value = {this.state.saldoInput}
                        editable= {false}/>
                    
                    <TouchableOpacity
                        onPress = {this.handlePressConvertion}
                        style = {styles.buttonContainer}>
                        <Text style = {styles.textButton}>
                            Convertir
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }

}
export default Bolsa;

 
// Later on in your styles..
var styles = StyleSheet.create({
    textInput:{
        height: 60,
        margin: 10,
        backgroundColor: '#fff',
        fontSize: 18,
        fontWeight: "bold",
        borderRadius: 10,
        elevation: 1,
        shadowOpacity: 2,
        shadowRadius: 2,
        shadowColor: '#000',
        textAlign: 'center'
    },
    convertionText: {
        fontSize: 18,
        fontWeight: "bold",
        margin: 10,
        color: '#000'
    },
    button:{
        margin: 20,
        height: 40,
        marginTop: 10,
        borderRadius: 20,
        backgroundColor: '#58acfa',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1,
        shadowOpacity: 2,
        shadowRadius: 2,
        shadowColor: '#000'
    },
    buttonContainer: {
      paddingVertical: 10,
      marginVertical: 15,
      marginHorizontal: 10,
      backgroundColor: 'rgba(41, 128, 185,1.0)',
      borderRadius: 10,
      elevation: 1,
      shadowOpacity: 2,
      shadowRadius: 2,
      shadowColor: '#000'
    },
    textButton: {
        fontSize:15,
        color: '#FFF',
        textAlign: 'center'
    }
});