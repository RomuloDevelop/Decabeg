import React, {useState, useEffect} from 'react';
import {Modal, ActivityIndicator, StyleSheet, View} from 'react-native';
import {List, ListItem, Body, Left, Text, Button, Icon, H3,
Form, Item, Input, Label} from 'native-base';
import SubmitButton from '../sharedComponents/SubmitButton';
import globalStyles from '../styles';
//import {} from 'prop-types';

function CloseButton(props){
    return(
        <Button style={{alignSelf:'flex-end', margin:10}} bordered warning onPress={props.onClose}>
          <Icon type="FontAwesome" name='times' />
        </Button>
    )
}

function AgendaList(props){
    const { show, data } = props;
    return(
        <Modal
            animationType={'slide'}
            visible={show}
            onRequestClose={() => {console.log('close modal')}}>
            <CloseButton onClose={props.onClose}/>
            <List style={{padding:10}}>
                <ListItem itemDevider>
                    <Left>
                        <H3 style={styles.listTitle}>Usuario</H3>
                    </Left>
                    <Body>
                        <H3 style={styles.listTitle}>Alias</H3>
                    </Body>
                </ListItem>
               { data.map((item, index)=>{
                return(
                    <ListItem key={index} onPress={()=>props.onSelect(item)}>
                        <Left>
                            <Text style={styles.listItemText}>{item.username}</Text>
                        </Left>
                        <Body>
                            <Text style={styles.listItemText}>{item.alias}</Text>
                        </Body>
                    </ListItem>
                    )}
                )}
            </List>
      </Modal>
    )
}

function AgendaForm(props){
    const { show, username } = props;
    const [alias, setAlias] = useState('');
    return(
        <Modal
            animationType={'slide'}
            visible={show}
            onRequestClose={() => {console.log('close modal')}}>
            <CloseButton onClose={props.onClose}/>
            <Text style={{margin:20, color:'rgba(0,0,0,0.5)'}}>Puede agregar de manera opcional un alias de su preferencia para <Text style={{color:'#000'}}>{username}</Text></Text>
            <Form>
                <Item floatingLabel>
                  <Label>Alias</Label>
                  <Input value={alias} onChangeText={(value)=>setAlias(value)}/>
                </Item>
            </Form>
            <SubmitButton onPress={()=>{
                props.onAddPress({username,alias});
                setAlias('');
            }} style={{marginTop:20}} text="Agregar"/>
        </Modal>
    );
}

const styles = StyleSheet.create({
    listTitle:{
        textAlign:'center',
        color:globalStyles.mediumBlue,
        textTransform: 'uppercase'
    },
    listItemText:{
        textAlign:'center',
    },
})

export {AgendaList, AgendaForm};