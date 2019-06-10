import React, {Component} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,  StyleSheet, ScrollView, TextInput} from 'react-native';
    import { Icon } from 'native-base';
import CardMonedero from '../../../sharedComponents/CardMonedero';
import SubmitButton from '../../../sharedComponents/SubmitButton';
import { getUserData } from '../../../helpers';
import { sendUpdateUserData } from '../../../Api';

import globalStyles from '../../../styles';

const tasaConvertion = 0.5
const moneyName = 'Dicag'

async function updateUserPointsMovileLocalAndSend(pointsValue, movileDataValue){
    try{
        let {points:strPoints=0, money:strData=0} = await getUserData();
        const points = parseInt(pointsValue) + parseInt(strPoints);
        const money = parseFloat(movileDataValue) + parseFloat(strData);
        await sendUpdateUserData({points, money});
    } catch(ex) {
        throw ex;
    }
}

class Transferir extends Component {
    state = {
        byte: 0,
        kbyte: 0,
        mbyte: 0,
        datosInput: '',
        username:''
    }
    getSaldoConvertion = async () => {
        try{
            const value = this.state.datosInput;
            if (typeof value !== 'undefined'){
                if(value > this.state.byte){
                    alert('No posee tantos dicag');
                    return;
                }
                const byte = parseFloat(this.state.byte) - value;
                this.setState({
                    byte,
                    kbyte: byte/1000,
                    mbyte: byte/1000000,
                })
            } else {
                alert('Especifique un valor a convertir');
            }
        } catch(ex) {
            console.log(ex);
        }
    }

    handleChangeSaldo = async (text) =>{
        const datosInput = this.state.datosInput;
        const testing = /^[0-9]+\.?[0-9]*$/
        if(testing.test(text) || text === '') {
            this.setState({ datosInput: text })
        } else {
            this.setState({ datosInput });
        }
    }
    handlePressConvertion = () =>{
        this.getSaldoConvertion();
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
                    textHeader = "Dicags"
                    text1 = {moneyName} item1 = {this.state.byte}
                    text2 = {"K"+moneyName} item2 = {this.state.kbyte}
                    text3 = {"M"+moneyName} item3 = {this.state.mbyte}
                    style = {{marginTop: 40}}
                />
                <View style = {styles.convertionForm}>
                    <TextInput
                        style = {styles.textInput}
                        spellCheck = {false}
                        onChangeText= {(username)=>this.setState({username})}
                        placeholder = "Usuario"
                        value = {this.state.username}
                        editable= {false}/>
                    <TextInput
                        style = {styles.textInput}
                        spellCheck = {false}
                        onChangeText= {(text) => this.handleChangeSaldo(text)}
                        placeholder = "Dicags"
                        keyboardType = 'numeric'
                        value = {this.state.datosInput}/>
                    <SubmitButton onPress = {this.handlePressConvertion} text="Convertir"/>
                </View>
            </ScrollView>
        )
    }

}
 
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
export default Transferir;