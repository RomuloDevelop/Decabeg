import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import { Container, Content, Text, H3, H2, Grid, Col, Row, Item, Form, Label, Input} from "native-base";
import { sendGetTransferInfo, sendReport } from '../../../Api';
import moment from 'moment';
import NoDataIcon from '../../../sharedComponents/NoDataIcon';
import Header from '../../../sharedComponents/Header';
import CardMonedero from '../../../sharedComponents/CardMonedero';
import LoaderScreen from '../../../sharedComponents/LoadScreen';
import PaginationContainer from '../../../sharedComponents/PaginationContainer';
import SubmitButton from '../../../sharedComponents/SubmitButton';
//import AlertDialog from '../../../sharedComponents/AlertDialog';
import {withModal} from '../../../containers';
import {appAlert, getUserData} from '../../../helpers';

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
        <Input disabled value={props.data.responsible.username}/>
      </Item>
      <Item disabled floatingLabel>
        <Label>Email</Label>
        <Input disabled value={props.data.responsible.email}/>
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
    return props.data.map((item, index, array)=>{
        const date = moment(item.create_date).calendar().split('a las');
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
                <Text style={{textAlign:'center',color:globalStyles.darkBlue, fontSize:18}}>{item.responsible.username}</Text>
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
    this.group = 1;
    this.state = {
      balance:0,
      data:[],
      itemToShow:{},
      loading:false
    }
  }
  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener('didFocus',()=>{
        getUserData().then((data)=>{
            const {balance = 0} = data;
            const byte = parseFloat(balance).toFixed(6);
            this.setState({balance:byte});
        });
    });
  }
  getTransferPerGroup = (group = 1)=>{
    this.setState(()=>({loading:true}),async ()=>{
      try{
        const data = await sendGetTransferInfo(group, 'desc');
        if(group === 1) {
          this.setState({loading:false, data});
        } else {
          const oldData = this.state.data;
          for (item of data){
            oldData.push(item);
          }
          this.setState({loading:false,data:oldData});
        }
      } catch(ex){
        if(ex.message){
          if(ex.message.status==404)
            appAlert('Error en listado', 'No existen mas transferencias');
        }
        this.setState({loading:false});
      }
    });
  }

  componentWillMount(){
    this.getTransferPerGroup();
  }

  onItemPress=(item)=>{
    this.setState(()=>({itemToShow:item}),this.modal.Open);
  }

  render(){
    return(
      <Container>
        <Header color={globalStyles.navbarColor} title="Transacciones" onPress={()=>this.props.navigation.openDrawer()}/>
        <Content 
          contentContainerStyle={this.state.data.length <= 0?{flex: 1}:{flex: 1, backgroundColor: globalStyles.fontGrey}}>
          <LoaderScreen loading = {this.state.loading}/>
          {(this.state.data.length <= 0)?(
            <NoDataIcon text="No se encontraron registros"/>
          ):(
            <ScrollView>
              {/* <AlertDialog ref={ref=>this.alert=ref}/> */}
              <ItemDetail ref = {ref => this.modal = ref} hasCloseButton data={this.state.itemToShow}/>
              <CardMonedero textHeader = "Dicags" value = {this.state.balance} style = {{margin: 40}}/>
              <SubmitButton
              style={{marginBottom:25}}
              onPress = {()=>this.setState(()=>({loading:true}),()=>{
                sendReport().then(()=>{
                  appAlert('Reporte enviado', 'Reporte enviado exitosamente');
                }).catch((ex)=>console.log(ex))
                .finally(()=>this.setState({loading:false}))
              })}
              //onPress = {()=>this.setState({showModalForm:true})}
              //onPress = {()=>this.alert.Open()}
              text = "Enviar Reporte"/>
              <PaginationContainer onFetch={async ()=>{
                this.group += 1;
                this.getTransferPerGroup(this.group);
              }} style={{marginBottom:10}}>
                <Grid>
                  <Row style = {{backgroundColor:globalStyles.mediumBlue, padding:10, borderTopLeftRadius:20, borderTopRightRadius:20}}>
                    <H3 style={{marginLeft:8, color:'white'}}>Operaciones</H3>
                  </Row>
                  <TransaccionList data={this.state.data} onItemPress={this.onItemPress}/>
                </Grid>
              </PaginationContainer>
            </ScrollView>
          )}
        </Content>
      </Container>
    );
  }
}

export default Transacciones;