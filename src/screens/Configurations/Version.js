import React from 'react';
import {View, Image, Platform} from 'react-native';
import {Text, H1} from 'native-base';
import DeviceInfo from 'react-native-device-info';

const VersionScreen = (props)=>(
    <View style={{flexDirection:'column' ,alignItems:'center', marginTop:5}}>
        <Image
          style={{
            width: 150,
            height: 150,
            borderRadius: 150
          }}
          source={require('../../assets/DICABEG.png')} />
        <View style={{justifyContent:'center'}}>
          <Text style={{fontSize:18, textAlign:'center'}}>Versión para {Platform.OS}</Text>
          <Text style={{fontSize:15, textAlign:'center'}}>{DeviceInfo.getVersion()}</Text>
        </View>
    </View>
);

export default VersionScreen;