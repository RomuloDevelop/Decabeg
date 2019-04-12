import React, {Component, useState} from 'react';
import {Container, Content, ListItem, List, Thumbnail, Left, Right, Body, Text} from 'native-base';
import LoaderScreen from '../../sharedComponents/LoadScreen';

import {sendGetUserReferrals, sendDeleteUserReferrals} from '../../../Api/referrals2';
import {appAlert} from '../../../helpers';

export default class Contacts extends Component {
    constructor(props){
        super(props)
        this.state = {
            referrals:[],
            loading: false,
        }
    }

    componentWillMount(){
        const {navigation} = this.props;
        navigation.addListener('didFocus',()=>{
            this.setState({loading:true});
            sendGetUserReferrals().then((referrals)=>{
                this.setState({referrals,loading:false});
            }).catch(e=>{
                console.log(e);
                this.setState({loading:false});
            });
        });
    }

    handleOnPress = (contact, index)=>{
        appAlert(
            'Delete referral',
            `Are you sure to delete this referral (${contact.name})?`,
            ()=>{
                sendDeleteUserReferrals(contact.user_id)
                .then((data)=>{
                    const {referrals} = this.state;
                    referrals.splice(index, 1);
                    this.setState({referrals});
                }).catch(e=>console.log(e));
            }
        );
    }

    render(){
        return (
            <Container>
              <Content>
                <LoaderScreen loading = {this.state.loading}/>
                <List>
                    {this.state.referrals.map((item,index)=>(
                        <ContactsItem 
                            key={index}
                            onPress={()=>this.handleOnPress(item, index)} 
                            name={item.username} 
                            email={item.email} 
                            imgSource={require('../../../assets/reactIcon.png')}/>)
                    )}
                </List>
              </Content>
            </Container>
        );
    }
}

function ContactsItem(props) {
    return(
        <ListItem avatar onPress={props.onPress}>
            <Left>
              <Thumbnail source={props.imgSource}/>
            </Left>
            <Body>
              <Text>{props.name}</Text>
              <Text note>{props.email}</Text>
            </Body>
        </ListItem>
    );
}