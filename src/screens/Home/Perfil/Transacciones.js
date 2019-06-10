import React, {Component} from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import { Container, Content,List, ListItem, Left, Body, Right, Text, H3, H1, Grid, Col, Row, Button, Icon, Item, Form, Label, Input} from "native-base";
import { getUserData } from '../../../helpers';
import { sendGetTransferInfo } from '../../../Api';
import moment from 'moment';
import NoDataIcon from '../../../sharedComponents/NoDataIcon';
import SubmitButton from '../../../sharedComponents/SubmitButton';
import Header from '../../../sharedComponents/Header';

import globalStyles from '../../../styles';

const degradado = '66';
function CloseButton(props){
    return(
        <Button style={{alignSelf:'flex-end', margin:10}} bordered warning onPress={props.onClose}>
          <Icon type="FontAwesome" name='times' />
        </Button>
    )
}

function ItemDetail(props){
    return(
        <Modal
            animationType={'slide'}
            visible={props.show}
            onRequestClose={() => {console.log('close modal')}}>
            <CloseButton onClose={props.onClose}/>
            <Form>
                <Item floatingLabel>
                  <Label>Usuario</Label>
                  <Input value={props.data.username}/>
                </Item>
                <Item floatingLabel>
                  <Label>Concepto</Label>
                  <Input value={props.data.concept}/>
                </Item>
            </Form>
        </Modal>
    );
}

function TransaccionList(props){
    return props.data.map((item, index)=>{
        const date = moment(item.create_date).calendar().split('at');
        const color = (index%2)?globalStyles.mediumBlue:globalStyles.lightBlue;
        return(
            <ListItem key={index} style={{backgroundColor:color+degradado, marginLeft:0}} onPress={()=>props.onItemPress(item)}>
              <Left style={{marginLeft:20}}>
                    <Text>{item.transfer_code}</Text>
                    <View style={{marginLeft:8}}>
                        <Text>{date[0]}</Text>
                        {date.length>1&&<Text>{date[1]}</Text>}
                    </View>
              </Left>
              <Body>
                  <H3>{item.username}</H3>
              </Body>
              <Right style={{marginRight:20}}>
                <H3 style={{textAlign:'center'}}>{item.current_balance}</H3>
                <Text style={{textAlign:'center'}}>{item.amount}</Text>
              </Right>
            </ListItem>
        )
    });
}
class Transacciones extends Component {
  constructor(props){
    super(props);
    this.state = {
        balance:0,
        data:[],
        showDetail:false,
        itemToShow:{}
    }
  }
  componentWillMount(){
    sendGetTransferInfo().then((data)=>{
        const {current_balance} = data[data.length -1];
        this.setState({balance:current_balance, data:data.reverse()});
        
    })
    .catch((e)=>console.log(e));
  }

    onItemPress=(item)=>{
        this.setState({showDetail:true, itemToShow:item})
    }

  render(){
        return(
            <Container>
            <Header color={globalStyles.navbarColor} title="Transacciones" onPress={()=>this.props.navigation.openDrawer()}/>
                <Content contentContainerStyle={this.state.data.length <= 0?{flex: 1}:{}}>
                {(this.state.data.length <= 0)?(<NoDataIcon text="No se encontraron registros"/>):
                    (<View><ItemDetail show={this.state.showDetail} data={this.state.itemToShow} onClose={()=>this.setState({showDetail:false})}/>
                    <Grid style={{padding:15, marginVertical:10,marginHorizontal:5,borderRadius:20, backgroundColor:globalStyles.navbarColor+'aa'}}>
                        <Row><H3 style={{color:'white'}}>Monto actual:</H3></Row>
                        <Row><H1 style={{marginLeft:10, color:'white'}}>{this.state.balance}</H1></Row>
                    </Grid>
                    <List>
                        <ListItem itemDevider style = {{backgroundColor:globalStyles.mediumBlue+degradado, marginLeft:0, borderRadiusTop:20}}>
                            <H3 style={{marginLeft:8}}>Operaciones</H3>
                        </ListItem>
                        <TransaccionList data={this.state.data} onItemPress={this.onItemPress}/>
                    </List></View>)}
                </Content>
            </Container>);
  }
}

export default Transacciones;