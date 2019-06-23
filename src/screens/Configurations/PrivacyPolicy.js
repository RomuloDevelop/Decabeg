import React from 'react';
import {View} from 'react-native';
import {Container, Content, Text, H1, H3} from 'native-base';
import WebViewComponent from '../../sharedComponents/WebViewComponent';

function SubTitle(props){
    return(<H3 style={{marginTop:30,marginBottom:15}}>
        {props.children}
    </H3>);

}

function PrivacyPolicy(props){
    return(
        <View style={{flex:1}}>
                <WebViewComponent uri="https://edixonalberto.github.io/doc-dicabeg/menu/politic.html"/>
        </View>
    );
}

export default PrivacyPolicy;