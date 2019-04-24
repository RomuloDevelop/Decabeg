import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import { Container, Content, Text, Form, Label, Item, Input} from "native-base";
//import {  } from 'react-native-dialog';
import SubmitButton from '../../sharedComponents/SubmitButton';

class Transferir extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      amount: 0.00,
    }
  }

  onPress = (value)=>{
    
  }

  render(){
    return(
      <Container>
        <Content>
          <Form style={{marginHorizontal:15}}>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input value={this.state.username}/>
              </Item>
              <Item floatingLabel>
                <Label>Amount</Label>
                <Input value={this.state.amount}/>
              </Item>
          </Form>
          <SubmitButton
            style={{marginVertical:20}}
            onPress = {this.onPress}
            text = "Transfer"/>
        </Content>
      </Container>
    );
  }
}
export default Transferir

