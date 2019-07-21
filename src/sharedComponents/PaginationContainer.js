import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import globalStyles from '../styles';

function PaginationContainer(props) {
    return(
        <View style={props.containerStyle}>
            {props.children}
            <Text onPress={props.onFetch} style={styles.seeMoreText}>Ver más</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    seeMoreText:{
        alignSelf:'flex-end',
        padding: 15,
        fontSize: 18,
        color: globalStyles.darkBlue,
        textDecorationLine: "underline"
    }
})

export default PaginationContainer;