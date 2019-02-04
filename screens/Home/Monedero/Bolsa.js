import React, {Component} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,  StyleSheet, ScrollView, TextInput} from 'react-native';
    import { Icon } from 'native-base';
import CardMonedero from './CardMonedero';

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
    getSaldoConvertion = () => {
        const value = this.state.datosInput
        if (typeof value !== 'undefined'){
            if(value > this.state.mbyte){
                alert('No posee esos datos')
                return
            }
            const mbyte = this.state.mbyte - value
            const saldombyte = this.state.saldombyte + (value * tasaConvertion)
            this.setState({
                byte: mbyte*1000000,
                kbyte: mbyte*1000,
                mbyte,
                saldobyte: saldombyte*1000000,
                saldokbyte: saldombyte*1000,
                saldombyte
            })
        } else {
            alert('Especifique un valor a convertir');
        }

    }

    handleChangeSaldo = (text) =>{
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
        const mbyte = require('../../../Api/data.json').money;
        const saldombyte = mbyte * tasaConvertion
        this.setState({
            byte: mbyte*1000000,
            kbyte: mbyte*1000,
            mbyte,
            saldobyte: saldombyte*1000000,
            saldokbyte: saldombyte*1000,
            saldombyte
        })
    }
    render() {
        return (
            <ScrollView>
                <CardMonedero
                    textHeader = "Datos"
                    text1 = "Byte" item1 = {this.state.byte}
                    text2 = "Kb" item2 = {this.state.kbyte}
                    text3 = "M" item3 = {this.state.mbyte}
                    style = {{marginTop: 40}}
                />
                
                <CardMonedero
                    textHeader = "Saldo"
                    text1 = "Byte" item1 = {this.state.saldobyte}
                    text2 = "Kb" item2 = {this.state.saldokbyte}
                    text3 = "M" item3 = {this.state.saldombyte}
                />
                <Text
                    style = {styles.convertionText}>
                    Tasa de Conversion: {tasaConvertion}
                </Text>
                <View style = {styles.convertionForm}>
                    <TextInput
                            style = {styles.textInput}
                            spellCheck = {false}
                            onChangeText= {(text) => this.handleChangeSaldo(text)}
                            placeholder = "Datos (Mb)"
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