import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Button, Text} from 'native-base';
import {withModal} from "../containers";
import DynamicForm from './DynamicForm';
import Hr from './Hr';
import globalStyles from '../styles';

const width = Math.round(Dimensions.get('window').width*0.7);

function Alert(props){
    return(
      <View style={styles.container}>
        <DynamicForm style={styles.alertDialog} compare={width} resultValue={width}>
          <View style = {styles.alertHeader}>
            <Text style={styles.textHeader}>{props.title}</Text>
          </View>
          <View style = {styles.alertBody}>
            <Text style={styles.textBody}>{props.title}</Text>
            <Hr color='#00000033' width={1.5}/>
          </View>
          <View style = {styles.alertFooter}>
            <Button style = {[styles.button, {backgroundColor:globalStyles.lightBlue}]}><Text>Aceptar</Text></Button>
            <Button style = {[styles.button,{backgroundColor:globalStyles.darkBlue}]} onPress={props.onClose}><Text>Cancelar</Text></Button>
          </View>
        </DynamicForm>
      </View>
    );
}

const styles = StyleSheet.create({
    container:{
      flex:1, 
      justifyContent:'center',
      backgroundColor: '#00000080'
    },
    alertDialog: {
      height:200,
      alignSelf:'center',
      alignItems: 'stretch',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor:'white',
      borderWidth: 1,
      borderColor:'grey',
      borderRadius:20,
      overflow:'hidden',
      elevation: 4,
      shadowOpacity: 5,
      shadowRadius: 4,
      shadowOffset: {width:4, height:4},
      shadowColor: '#000'
    },
    alertHeader: {
      flex: 0.5,
      padding:15,
      paddingLeft:25,
      borderBottomWidth: 1,
      borderBottomColor: 'grey',
      backgroundColor:globalStyles.darkBlue,
    }, 
    textHeader: {
      textAlign:'left',
      color:'white',
      fontSize: 23,
      textTransform:'capitalize'
    },
    alertBody: {
      flex: 1,
      justifyContent:'space-between',
      padding:15,
      paddingBottom:0,
      paddingLeft: 20,
      alignItems:'center',
      borderBottomColor: 'grey'
    },
    textBody:{
      fontSize: 18,
      fontWeight:'100',
      textAlign:'justify',
      textTransform:'capitalize'
    },
    alertFooter: {
      flex: 1,
      flexDirection: 'row',
      justifyContent:'flex-end',
      alignContent:'center',
      paddingRight:15
    },
    button: {
      marginVertical:7,
      marginHorizontal: 10,
      borderRadius:15,
      overflow:'hidden'
    }

  });

const AlertDialog = withModal(Alert);

export default AlertDialog;