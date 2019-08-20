import React from 'react';
import {View, StyleSheet, Image, Platform} from 'react-native';
import {Text, H1, H3} from 'native-base';
import DeviceInfo from 'react-native-device-info';
import globalStyles from '../../styles';

const VersionScreen = (props)=>(
    <View style={{flex:1,flexDirection:'column', alignItems:'center', marginBottom:10}}>
        <Image
          style={styles.image}
          source={require('../../assets/DICABEG.png')} />
        <View style={{alignItems:'center' }}>
          <H3 style={[styles.text,{margin:10}]}>Versión para {Platform.OS}</H3>
          <H1 style={styles.text}>{DeviceInfo.getVersion()}</H1>
        </View>
    </View>
);

const styles = StyleSheet.create({
  image:{
    width: 150,
    height: 150,
    borderRadius: 150,
    marginTop:30
  },
  text:{
    color:globalStyles.darkBlue
  }
})

export default VersionScreen;