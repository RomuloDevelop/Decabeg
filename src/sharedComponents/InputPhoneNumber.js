import React, {useState} from 'react';
import { View, StyleSheet, Modal, FlatList, TouchableOpacity} from 'react-native';
import { Item, Icon, Input, Label, Text, H3 } from 'native-base';
import CloseModalButton from './CloseModalButton';
import globalStyles from '../styles';
const PhoneNumberData = require('../../phoneNumberData.json');

function PhoneNumberPerCountry(props){
    return(
        <Modal
            animationType={'slide'}
            visible={props.show}
            onRequestClose={() => {console.log('close modal')}}>
            <CloseModalButton onClose={props.onClose}/>
            <FlatList 
                data={PhoneNumberData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={()=>props.onSelect(item)} style={styles.countryStyle}>
                        <H3>{`${item.flag} ${item.name} (${item.dial_code})`}</H3>
                    </TouchableOpacity>
                )}
            />
      </Modal>
    );
}

function InputPhoneNumber(props) {
    return (
        <View style={{flexDirection:'row', justifyContent:'center'}}>
           <Item stackedLabel style={{flex:1, marginRight:0}}
                onPress={props.onPress}>
              <Label>Código</Label>
              <Input disabled
                returnKeyType='done'
                autoCorrect={false}
                value={props.value.code}         
              />
              {/* <Icon
                style={{color:globalStyles.textGrey}}
                active
                name='md-arrow-dropdown'/> */}
            </Item>                
            <Item stackedLabel style={{flex:2, marginLeft:0}}>
                <Label>Teléfono</Label>
                <Input
                    onChangeText={props.onChangeText}
                    keyboardType={'phone-pad'}
                    value={props.value.number}/>
            </Item>
        </View>
    );
}

const styles = StyleSheet.create({
    countryStyle: {
        flex: 1,
        borderTopColor: globalStyles.textGrey,
        borderTopWidth: 1,
        padding: 12,
    }
})

export {InputPhoneNumber, PhoneNumberPerCountry};