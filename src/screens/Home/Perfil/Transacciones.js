import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import { Container, Content,List, ListItem, Left, Body, Right,Card, Text, H3, H2, H1, Grid, Col, Row, Button, Icon, Item, Form, Label, Input} from "native-base";
import { getUserData } from '../../../helpers';
import { sendGetTransferInfo } from '../../../Api';
import moment from 'moment';
import NoDataIcon from '../../../sharedComponents/NoDataIcon';
import SubmitButton from '../../../sharedComponents/SubmitButton';
import Header from '../../../sharedComponents/Header';
import CardMonedero from '../../../sharedComponents/CardMonedero';
import {withModal} from '../../../containers';

import globalStyles from '../../../styles';

const degradado = '40';

const FormWithModal = (props) => (
  <Form>
      <Item disabled floatingLabel>
        <Label>Referencia</Label>
        <Input disabled value={props.data.transfer_code}/>
      </Item>
      <Item disabled floatingLabel>
        <Label>Usuario</Label>
        <Input disabled value={props.data.username}/>
      </Item>
      <Item disabled floatingLabel>
        <Label>Pago</Label>
        <Input disabled value={props.data.amount.toString()}/>
      </Item>
      <Item disabled floatingLabel>
        <Label>Monto Actual</Label>
        <Input disabled value={props.data.current_balance.toString()}/>
      </Item>
      <Item disabled floatingLabel>
        <Label>Concepto</Label>
        <Input disabled value={props.data.concept}/>
      </Item>
  </Form>
);
const ItemDetail = withModal(FormWithModal);



function TransaccionList(props){
    const ItemRow = ({children})=>(
      <Col>
        {children}
      </Col>
    );
    return props.data.map((item, index, array)=>{
        const date = moment(item.create_date).calendar().split('at');
        const color = (index%2)?globalStyles.mediumBlue:globalStyles.lightBlue;
        return(
          <TouchableOpacity key={index} 
            activeOpacity = {1}
            style = {{borderBottomWidth:(index === array.length - 1 ?0:2), borderColor:'grey', backgroundColor:color + degradado}} 
            onPress={()=>props.onItemPress(item)} >
            <Row style={{paddingHorizontal:20, paddingVertical:10}}>
              <Col style = {{justifyContent:'center'}}>
                <View>
                    <Text style={{color:globalStyles.darkBlue}}>{date[0]}</Text>
                    {date.length>1&&<Text style={{color:globalStyles.darkBlue}}>{date[1]}</Text>}
                </View>
              </Col>
              <Col style = {{justifyContent:'center'}}>
                <Text style={{textAlign:'center',color:globalStyles.darkBlue, fontSize:18}}>{item.username}</Text>
              </Col>
              <Col style = {{justifyContent:'center'}}>
                <H2 style={{textAlign:'right', color:(item.amount<0)?'red':'green'}}>{item.amount}</H2>
              </Col>
            </Row>
          </TouchableOpacity>
        )
    });
}
class Transacciones extends Component {
  constructor(props){
    super(props);
    this.state = {
        balance:0,
        data:[],
        itemToShow:{}
    }
  }
  componentWillMount(){
    sendGetTransferInfo().then((data)=>{
        const {current_balance} = data[data.length -1];
        this.setState({balance:current_balance, data:data.reverse()});
    }).catch((e)=>console.log(e));
  }

  onItemPress=(item)=>{
      this.setState(()=>({itemToShow:item}),this.modal.Open)
  }

  render(){
        return(
            <Container>
              <Header color={globalStyles.navbarColor} title="Transacciones" onPress={()=>this.props.navigation.openDrawer()}/>
              <Content 
                contentContainerStyle={this.state.data.length <= 0?{flex: 1}:{backgroundColor: globalStyles.fontGrey}}>
                {(this.state.data.length <= 0)?(<NoDataIcon text="No se encontraron registros"/>):
                (<View>
                  <ItemDetail ref = {ref => this.modal = ref} data={this.state.itemToShow}/>
                  <CardMonedero textHeader = "Dicags" value = {this.state.balance} style = {{margin: 40}}/>
                  <Grid>
                    <Row style = {{backgroundColor:globalStyles.mediumBlue, padding:10, borderTopLeftRadius:20, borderTopRightRadius:20}}>
                      <H3 style={{marginLeft:8, color:'white'}}>Operaciones</H3>
                    </Row>
                    <TransaccionList data={this.state.data} onItemPress={this.onItemPress}/>
                  </Grid>
                </View>)}
              </Content>
            </Container>);
  }
}

export default Transacciones;