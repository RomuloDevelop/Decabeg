import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Form, Label, Item, Input, Icon} from "native-base";
//import {  } from 'react-native-dialog';
import { getUserData, appAlert, setAgendaList, getAgendaList } from '../../../helpers';
import { sendTransferToUser, sendGetUserData } from '../../../Api';
import CardMonedero from '../../sharedComponents/CardMonedero';
import LoaderScreen from '../../sharedComponents/LoadScreen';
import SubmitButton from '../../sharedComponents/SubmitButton';
import {AgendaList, AgendaForm} from '../../sharedComponents/Agenda';
import globalStyles from '../../../styles';

const moneyName = 'Dicag';
class Transferir extends Component {
  constructor(props){
    super(props);
    this.state = {
      byte: 0,
      kbyte: 0,
      mbyte: 0,
      username: '',
      amount: 0.00,
      concept:'',
      agendaList:[],
      showModal: false,
      showModalForm: false,
      loading: false
    }
  }

  componentDidMount() {
      const {navigation} = this.props;
      navigation.addListener('didFocus',()=>{
          getUserData().then((data)=>{
              const {balance = 0} = data;
              const byte = parseFloat(balance).toFixed(4);
              this.setState({
                  byte,
                  kbyte: (byte/1000).toFixed(4),
                  mbyte: (byte/1000000).toFixed(4)
              });
          });
      });
  }

  addItemIfNotExist=()=>{
    getAgendaList().then((list)=>{
      const sortList = list.filter((item)=>item.username===this.state.username);
      if(sortList.length>0){
        this.setState({username:'',amount:'', concept:''});
        console.log('Ya existe');
        return;
      }
      appAlert('Agenda', '¿Desea agregar a este usuario a la agenda?',()=>{
        this.setState({showModalForm:true});
      },()=>this.setState({username:'',amount:'', concept:''}));
    })
    .catch((ex)=>{
      if(ex==='No data was found'){
        appAlert('Agenda', '¿Desea agregar a este usuario a la agenda?',()=>{
          this.setState({showModalForm:true});
        },()=>this.setState({username:'',amount:'', concept:''}));
      } else 
        console.log(ex);
    });
  }

  addItemToAgenda=(item)=>{
    getAgendaList().then((list)=>{
      list.push(item);
      setAgendaList(list)
        .catch((ex)=>console.log(ex))
    })
    .catch((ex)=>{
      if(ex==='No data was found'){
        const list =[item];
        setAgendaList(list)
          .catch((ex)=>console.log(ex))
      } else 
        console.log(ex);
    }).finally(()=>this.setState({showModalForm:false, username:'',amount:'', concept:''}))
  }

  getSaldoConvertion = async () => {
    try{
      const value = this.state.amount;
      if (typeof value !== 'undefined'){
          if(value <=0){
            alert('Especifique un monto superior a 0');
            return;
          }
          const {balance} = await sendGetUserData();
          if(value > balance){
            appAlert('No posee tantos dicag');
            return;
          }
          const transferResponse = await sendTransferToUser(this.state.username, this.state.amount, this.state.concept);
          const byte = parseFloat(transferResponse.current_balance).toFixed(4);
          this.setState({
              byte,
              kbyte: (byte/1000).toFixed(4),
              mbyte: (byte/1000000).toFixed(4),
          });
        this.addItemIfNotExist();
      } else {
          alert('Especifique un monto');
      }
    } catch(ex) {
        throw ex;
    }
  }

  onPress = async()=>{
    try{
      await this.getSaldoConvertion();
      this.setState({loading:false});
    } catch(ex){
      this.setState({loading:false});
      console.log(ex);
    }
  }

  handleChangeSaldo = async (text) =>{
      const amount = this.state.amount;
      const testing = /^[0-9]+\.?[0-9]*$/
      if(testing.test(text) || text === '') {
          this.setState({ amount: text })
      } else {
          this.setState({ amount });
      }
  }

  render(){
    return(
      <Container>
        <Content style={{
          flex: 1,
          backgroundColor: globalStyles.fontGrey
        }}>
          <LoaderScreen loading={this.state.loading}/>
          <AgendaForm show={this.state.showModalForm}
            onClose={()=>this.setState({showModalForm:false,username:'',amount:'', concept:''})}
            onAddPress={(item)=>this.addItemToAgenda(item)}
            username={this.state.username}/>
          <AgendaList show={this.state.showModal}
            onClose={()=>this.setState({showModal:false})}
            onSelect={(item)=>this.setState({username:item.username, showModal:false})}
            data={this.state.agendaList}/>
          <CardMonedero
              textHeader = "Dicags"
              text1 = {moneyName} item1 = {this.state.byte}
              text2 = {"K"+moneyName} item2 = {this.state.kbyte}
              text3 = {"M"+moneyName} item3 = {this.state.mbyte}
              style = {{margin: 40}}/>
              <Card style={{margin:100}}>
            <CardItem header bordered>
              <Text style={{color:globalStyles.darkBlue}}>Transferir</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
          <Form style={{marginHorizontal:15, marginBottom:30, alignSelf:'stretch'}}>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input value={this.state.username} onChangeText={(username)=>this.setState({username})}/>
                <Icon name="address-book" type="FontAwesome" onPress={()=>{
                  getAgendaList()
                    .then((agendaList)=>{
                      console.log(agendaList);
                      this.setState({showModal:true, agendaList})})
                    .catch((ex)=>{
                      if(ex==='No data was found'){
                        appAlert('Agenda', 'No tiene usuarios en su agenda');
                      } else
                        console.log(ex)
                    });
                  }} style={{color:globalStyles.darkBlue}}/>
              </Item>
              <Item floatingLabel>
                <Label>Monto</Label>
                <Input value={this.state.amount} onChangeText={this.handleChangeSaldo} spellCheck = {false} keyboardType = 'numeric'/>
              </Item>
              <Item floatingLabel>
                <Label>Concepto</Label>
                <Input value={this.state.concept} maxLength={20} onChangeText={(concept)=>{this.setState({concept})}}/>
              </Item>
          </Form>
              </Body>
            </CardItem>
          </Card>
          <SubmitButton
            style={{marginVertical:25}}
            onPress = {()=>this.setState(()=>({loading:true}),async()=>await this.onPress())}
            text = "Transferir"/>
        </Content>
      </Container>
    );
  }
}
export default Transferir

