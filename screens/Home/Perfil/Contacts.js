import React, {Component} from 'react';
import {View, Modal} from 'react-native';
import {Container, Content, ListItem, List, Thumbnail, Left, Right, Body, Text} from 'native-base';

export default class Contacts extends Component {
    constructor(props){
        super(props)
        this.state = {
            contacts:[
                {
                    name:'Romulo1',
                    img:'../../../assets/reactIcon.png',
                    description:'description1',
                    selected: false
                },
                {
                    name:'Romulo2',
                    img:'../../../assets/reactIcon.png',
                    description:'description1',
                    selected: false
                },
                {
                    name:'Romulo3',
                    img:'../../../assets/reactIcon.png',
                    description:'description1',
                    selected: false
                }
            ]
        }
    }
    handleOnClick = ()=>{
        console.log('clicked parent');
    }
    render(){
        return (
            <Container>
              <Content>
                <List>
                    <ContactItems contacts={this.state.contacts} onPressItem ={this.handleOnClick}/>
                </List>
              </Content>
            </Container>
          );
    }
}

function ContactItems(props){
   return props.contacts.map((item,index)=>{
    return(
        <ContactsItem key={index} onPressItem={props.onPressItem} name={item.name} description={item.description} imgSource={require('../../../assets/reactIcon.png')}/>
    );
   });
}

class ContactsItem extends Component {
    state = {
        selected: false
    }
    handleOnClick=(event)=>{
        console.log(event.target);
        this.props.onPressItem();
    }
    handleOnLong=()=>{}
    render(){
        return(
            <ListItem avatar selected={this.state.selected} onPress={this.handleOnClick} onLongPress={this.handleOnLong}>
                <Left>
                  <Thumbnail source={this.props.imgSource} />
                </Left>
                <Body>
                  <Text>{this.props.name}</Text>
                  <Text note>{this.props.description}</Text>
                </Body>
            </ListItem>
           )
    }
}