import React from 'react';
import {Modal, ActivityIndicator, StyleSheet, View} from 'react-native';
//import {} from 'prop-types';

function LoaderScreen(props){
    const {
        loading,
        ...attributes
      } = props;
    return(
        <Modal
        transparent={true}
        animationType={'none'}
        visible={loading}
        onRequestClose={() => {console.log('close modal')}}>
        <View style={styles.modalBackground}>
            <ActivityIndicator
              size="large"
              animating={loading} />
        </View>
      </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
      backgroundColor: '#FFFFFF',
      height: 100,
      width: 100,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around'
    }
  });

export default LoaderScreen;