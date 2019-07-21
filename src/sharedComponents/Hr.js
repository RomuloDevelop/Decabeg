import React from 'react';
import {View} from 'react-native';

const Side = (props)=>(
    <View style={
      {
        height: props.width,
        backgroundColor: props.color? props.color: "white",
        height: props.width? props.width: 1,
        flex: 1,
        alignSelf: 'center'
      }}>
    </View>);

export default class Hr extends React.Component {
  render() {
    return (
      <View style={[{flexDirection: 'row'}, this.props.style]}>
        <Side width={this.props.width} color={this.props.color}/>
        {this.props.children}
        <Side width={this.props.width} color={this.props.color}/>
      </View>
    )
  }
}