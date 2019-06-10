import React from 'react';
import {View} from 'react-native';
import {Icon, Text} from 'native-base';

function getValue(props, type, defaultValue){
    return props[type]?props[type]:defaultValue;
}

export default function NoDataIcon(props){
    return(
        <View style={{ flex:1, alignSelf:"center", justifyContent:'center'}}>
            <Icon name={getValue(props,'name','history')} 
                  type={getValue(props, 'type', "FontAwesome")} 
                  style={{textAlign:'center', color:'#00000077', fontSize:70}}/>
            <Text style={{ color:'#00000077'}}>
                {getValue(props, 'text', "Sin datos para mostrar")}
            </Text>
        </View>
    );
}