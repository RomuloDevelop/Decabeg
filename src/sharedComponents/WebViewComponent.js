import React, {Component} from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native';

export default class WebViewComponent extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <WebView
          source={{uri: this.props.uri}}
          startInLoadingState={true}
          style={{marginTop: 20}}
        />
      </View>
    );
  }
}