import React from 'react';
import {Modal, ActivityIndicator, StyleSheet, View} from 'react-native';
import FadeIn from '../Animations/FadeIn';
import globalStyles from '../styles';

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
        <FadeIn style={styles.modalBackground} duration={400}>
          <View style={styles.indicatorContainer}>
            <ActivityIndicator
              color={globalStyles.lightBlue}
              size="large"
              animating={loading} />
          </View>
        </FadeIn>
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
    indicatorContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width:'auto',
      padding:5,
      backgroundColor:'white',
      borderRadius:500,
      borderWidth: 0.3,
      borderColor: 'grey',
      elevation: 4,
      shadowOpacity: 2,
      shadowRadius: 2,
      shadowColor: '#000'
    }
  });

export default LoaderScreen;