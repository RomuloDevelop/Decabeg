import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import { Container, Content, Text, Icon, Form, Picker, Item, Input} from "native-base";

class Recarga extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected: ''
    }
  }
    handleChange = (value)=>{
      this.setState({selected:value});
    }
    componentDidMount(){
      this.props.navigation.addListener('didBlur',()=>{
          console.log('a blur');
          console.log(this.props.navigation.isFocused());})
      this.props.navigation.addListener('didFocus',()=>{
        console.log('a');
        console.log(this.props.navigation.isFocused());
      })
    }
    render(){
        return(
            <Container>
            <Content>
              <Form style={{marginTop:20}}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  placeholder="Select your SIM"
                  placeholderStyle={{ color: "#bfc6ea"}}
                  placeholderIconColor="#007aff"
                  style={{ width: undefined, borderColor:'#000' }}
                  selectedValue={this.state.selected}
                  onValueChange={this.handleChange}>
                  <Picker.Item label="Movistar" value="key0" />
                  <Picker.Item label="Molvilnet" value="key1" />
                  <Picker.Item label="Digitel" value="key2" />
                </Picker>
                <Item regular>
                  <Input placeholder='Password' />
                </Item>
              </Form>
                        <TouchableOpacity 
                            style = {styles.buttonContainer}
                            onPress = {this.handleLoginPress}>
                            <Text style = {styles.textButton}>Recharge</Text>
                        </TouchableOpacity>
            </Content>
          </Container>)
    }
}
export default Recarga

var styles = StyleSheet.create({
buttonContainer: {
  marginHorizontal: 10,
  paddingVertical: 10,
  marginVertical: 15,
  backgroundColor: 'rgba(41, 128, 185,1.0)',
  borderRadius: 10,
  elevation: 1,
  shadowOpacity: 2,
  shadowRadius: 2,
  shadowColor: '#000'
},
textButton: {
    color: '#FFF',
    textAlign: 'center'
}
});