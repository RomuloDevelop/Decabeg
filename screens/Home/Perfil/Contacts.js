import React, {Component} from 'react';
import {View, Modal} from 'react-native';
import {Container, Content, ListItem, List, Thumbnail, Left, Right, Body, Text} from 'native-base';

import {sendGetUserReferrals} from '../../../Api/api';
import {appAlert} from '../../../Api/helpers';

export default class Contacts extends Component {
    constructor(props){
        super(props)
        // this.referrals = [];
        // this.referrals.map((item)=>item.selected = false)
        this.state = {
            referrals:[]
        }
    }

    componentWillMount(){
        sendGetUserReferrals().then((referrals)=>{
            this.setState({referrals});
        }).catch(ex=>console.log(ex));
    }

    handleOnClick = (contact)=>{
        appAlert(
            'Delete referral',
            `Are you sure to delete this referral (${contact.name})?`,
            ()=>{
                const len = this.state.referrals.length; 
                let referrals = this.state.referrals.slice(contact.index, len);
                this.setState({referrals});
            }
        );
    }
    render(){
        return (
            <Container>
              <Content>
                <List>
                    <ContactItems referrals={this.state.referrals} onPressItem ={this.handleOnClick}/>
                </List>
              </Content>
            </Container>
          );
    }
}

function ContactItems(props){
   return props.referrals.map((item,index)=>{
    return(
        <ContactsItem key={index} index={index} onPressItem={props.onPressItem} name={item.username} email={item.email} imgSource={require('../../../assets/reactIcon.png')}/>
    );
   });
}

class ContactsItem extends Component {
    state = {
        selected: false
    }
    handleOnClick=()=>{
        //console.log(event.target);
        //this.props.onPressItem(this.props);
    }
    handleOnLong=()=>{
        //console.log(event.target);
        this.props.onPressItem(this.props);
    }
    render(){
        return(
            <ListItem avatar selected={this.state.selected} onPress={this.handleOnClick} onLongPress={this.handleOnLong}>
                <Left>
                  <Thumbnail source={this.props.imgSource}/>
                </Left>
                <Body>
                  <Text>{this.props.name}</Text>
                  <Text note>{this.props.email}</Text>
                </Body>
            </ListItem>
           );
    }
}