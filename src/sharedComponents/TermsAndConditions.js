import React from 'react';
import WebViewComponent from './WebViewComponent';
import AppModal from "./AppModal";
import globalStyles from '../styles';
const TermsAndConditions = React.forwardRef((props, ref) => {
    return (
        <AppModal ref={ref} style={{padding: 30}}>
            <WebViewComponent uri="https://edixonalberto.github.io/doc-dicabeg/menu/terms.html"/>
        </AppModal>
    );
});
export default TermsAndConditions;