import React from 'react';
import {View} from 'react-native';
import WebViewComponent from './WebViewComponent';
import withModal from "../containers/withModal";
import globalStyles from '../styles';

const TermsAndConditionsWithModal = (props) => {
    return (
        <View style={{padding: 30}}>
            <WebViewComponent uri="https://edixonalberto.github.io/doc-dicabeg/menu/terms.html"/>
        </View>
    );
};

const TermsAndConditions = withModal(TermsAndConditionsWithModal);

export default TermsAndConditions;