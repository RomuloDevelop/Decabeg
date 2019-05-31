import React, {Component, useState} from 'react';
import {Container, Content, ListItem, List, Thumbnail, Left, Right, Body, Text} from 'native-base';
import LoaderScreen from '../../sharedComponents/LoadScreen';
import Header from '../../sharedComponents/Header';

import {sendGetUserReferrals, sendDeleteUserReferrals} from '../../../Api';
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
            'Eliminar referido',
            `¿Estas seguro de eliminar el referido: (${contact.name})?`,
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
            <Header color={globalStyles.darkBlue} title="Referidos" onPress={()=>this.props.navigation.openDrawer()}/>
              <Content>
                <LoaderScreen loading = {this.state.loading}/>
                <List>
                    {this.state.referrals.map((item,index)=>(
                        <ContactsItem 
                            key={index}
                            onPress={()=>this.handleOnPress(item, index)} 
                            name={item.username} 
                            email={item.email} 
                            imgSource={require('../../../assets/no_image.png')}/>)
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