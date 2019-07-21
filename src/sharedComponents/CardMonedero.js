import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {H3, Icon,} from 'native-base';
import Hr from './Hr';
import DynamicForm from './DynamicForm';

import globalStyles from '../styles';

function CalcMessage({value}){
    let message = "";
    const num = parseFloat(value);
    if(num >= 1) message = " videos para otro dicag";
    else message = " videos para un dicag";
    const decimal = num % 1;
    const videos = (1/0.005)-(decimal/0.005);
    message = Math.floor(videos) + message;
    return <Text>{message}</Text>
}

function CardMonedero(props){
    return (
        <DynamicForm compare = {600} resultValue = {500}>
            <View style = {styles.moneyCard}>
                <View style={styles.cardTitleBox}>
                    <Icon name="cash" type="Ionicons" style={styles.titleIcon}/>
                    <H3 style={styles.cardHeaderText}>{props.textHeader}</H3>
                </View>
                <View style = {styles.cardBody}>
                    <Text style={styles.cardAmount}>{props.value}</Text>
                    <Hr color='#00000033' width={1.5}/>
                    <CalcMessage value ={props.value}/>
                </View>
            </View>
        </DynamicForm>
        );
}
 
// Later on in your styles..
const styles = StyleSheet.create({
    moneyCard:{
        height: 120,
        width:'90%',
        borderRadius: 10,
        overflow: 'hidden',
        flex:1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf:'center',
        margin: 10,
        marginTop: 20,
        backgroundColor: '#fff',
        elevation: 1,
        shadowOpacity: 2,
        shadowRadius: 2,
        shadowColor: '#000'
    },
    cardTitleBox:{
        flex:1,
        justifyContent:'space-evenly',
        alignItems:'center',
        padding: 5,
        paddingLeft: 10,    
        backgroundColor:globalStyles.mediumBlue,
    },
    titleIcon: {
        fontSize:50,
        color:'#FFF'
    },
    cardHeaderText:{
        color:'#FFF', 
        fontWeight:'300',
    },
    cardBody: {
        flex: 3,
        margin: 10,
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: 2,
    },
    cardTitle:{
        justifyContent:"flex-start",
        alignSelf: "center",
        fontSize: 20,
        fontWeight:'300',
    },
    cardAmount:{
        fontSize: 24,
    }
});

export default CardMonedero;