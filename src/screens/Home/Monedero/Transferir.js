import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Form, Label, Item, Input, Icon} from "native-base";
//import {  } from 'react-native-dialog';
import { getUserData, appAlert, setAgendaList, getAgendaList } from '../../../helpers';
import { sendTransferToUser, sendGetUserData } from '../../../Api';
import CardMonedero from '../../../sharedComponents/CardMonedero';
import LoaderScreen from '../../../sharedComponents/LoadScreen';
import SubmitButton from '../../../sharedComponents/SubmitButton';
import {AgendaList, AgendaForm} from '../../../sharedComponents/Agenda';
import DynamicForm from '../../../sharedComponents/DynamicForm';
import AlertDialog from '../../../sharedComponents/AlertDialog';
import globalStyles from '../../../styles';

class Transferir extends Component {
  constructor(props){
    super(props);
    this.state = {
      byte: 0,
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
        const byte = parseFloat(balance).toFixed(6);
        this.setState({byte});
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

  dropItemFromAgenda= async (index)=>{
    try{
      const list = await getAgendaList();
      list.splice(index,1);
      await setAgendaList(list);
      this.setState({agendaList:list});
    } catch(ex){
      throw ex;
    }
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
        if(value < 0.005 || value > 10000){
          appAlert('Error en el monto','Especifique un monto superior o igual a 0.005 e inferior o igual a 10000');
          return;
        }
        const {balance} = await sendGetUserData();
        if(value > balance){
          appAlert('Error en el monto','No posee tantos dicag');
          return;
        }
        const transferResponse = await sendTransferToUser(this.state.username, this.state.amount, this.state.concept);
        const byte = parseFloat(transferResponse.current_balance).toFixed(6);
        this.setState({byte});
        this.addItemIfNotExist();
      } else {
          appAlert('Error en el monto','Especifique un monto');
      }
    } catch(ex) {
      if(ex.message){
        if(ex.message.description === 'receptor not found')
          appAlert('Nombre de Usuario', 'El nombre de usuario al que quieres transferir no existe');
      } else 
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
          <AlertDialog ref={(ref)=>this.alert = ref}/>
          <LoaderScreen loading={this.state.loading}/>
          <AgendaForm show={this.state.showModalForm}
            onClose={()=>this.setState({showModalForm:false,username:'',amount:'', concept:''})}
            onAddPress={(item)=>this.addItemToAgenda(item)}
            username={this.state.username}/>
          <AgendaList show={this.state.showModal}
            onClose={()=>this.setState({showModal:false})}
            onDrop ={(index)=>this.dropItemFromAgenda(index)}
            onSelect={(item)=>this.setState({username:item.username, showModal:false})}
            data={this.state.agendaList}/>
          <CardMonedero textHeader = "Dicags" value = {this.state.byte} style = {{margin: 40}}/>
          
          <DynamicForm>
            
            <Card style={{margin:100}}>
              <CardItem header bordered>
                <Text style={{color:globalStyles.darkBlue}}>Transferir</Text>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Form style={{marginHorizontal:15, marginBottom:30, alignSelf:'stretch'}}>
                      <Item floatingLabel>
                        <Label>Usuario</Label>
                        <Input value={this.state.username} onChangeText={(username)=>this.setState({username})} 
                          autoCapitalize='none'
                          selectionColor={globalStyles.darkBlue}/>
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
                        <Input value={this.state.amount} onChangeText={this.handleChangeSaldo} spellCheck = {false} keyboardType = 'numeric'
                          autoCapitalize='none'
                          selectionColor={globalStyles.darkBlue}/>
                      </Item>
                      <Item floatingLabel>
                        <Label>Concepto</Label>
                        <Input value={this.state.concept} maxLength={40} 
                        onChangeText={(concept)=>{this.setState({concept})}}
                        selectionColor={globalStyles.darkBlue}/>
                      </Item>
                  </Form>
                </Body>
              </CardItem>
            </Card>
            <SubmitButton
              style={{marginVertical:25}}
              onPress = {()=>this.setState(()=>({loading:true}),async()=>await this.onPress())}
              text = "Transferir"/>
          </DynamicForm>
        </Content>
      </Container>
    );
  }
}
export default Transferir

