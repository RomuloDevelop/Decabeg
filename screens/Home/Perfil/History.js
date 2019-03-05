import React, { Component } from "react";
import {StyleSheet, View} from "react-native";
import { Container, Content, Card, CardItem, Text, Body,
    Icon, IconNB, List, ListItem, Left, Right} from "native-base";
import {sendGetHistory, deleteHistory} from '../../../Api/historyApi';

import { appAlert } from '../../../Api/helpers';

import globalStyles from '../../../styles';

function HistoryCard({history, onClick}){
  const historyView = history.map((item, index)=>{
  return(
    <CardItem key={index}>
      <Icon type='FontAwesome' active name="file-video-o"
      style={{color: 'rgba(41, 128, 185,1.0)'}}/>
      <View style={{flexDirection:'column'}}>
        <Text style={{fontWeight:'500', fontSize:18}}>{item.name}</Text>
        <Text style={{color:globalStyles.mediumBlue}}>{item.link}</Text>
      </View>
      <Right>
        <Icon name="arrow-forward" />
      </Right>
    </CardItem>);
  });
  return historyView;
}

function HistoryCards(props){
  return(
    <Card>            
    <CardItem header >
      <Text style={styles.historyTitle}>{props.title}</Text>
    </CardItem>
      <HistoryCard {...props}/>
   </Card>

  );
}

export default class History extends Component {
  constructor(props){
    super(props);
    this.state={
      today:[],
      yestarday:[],
      daysAgo:[]
    }
  }

  deleteHistory=(id)=>{
    appAlert('Eliminar', 'Desea eliminar este item del historial',()=>sendDeleteHistory(false, id));
  }

  groupHistoriesByDate(histories){
    const date = new Date();
    const day = date.getDate();
    console.log(day);
    const month = date.getMonth();
    const year = date.getFullYear();
    const today = histories.filter((item)=>{
      const itemDate = new Date(item.date);
      return itemDate.getDate() === day && itemDate.getMonth() === month && itemDate.getFullYear() === year;
    });
    const yesterday = histories.filter((item)=>{
      const itemDate = new Date(item.date);
      return itemDate.getDate() === (day-1) && itemDate.getMonth() === month && itemDate.getFullYear() === year;
    });
    const daysAgo = histories.filter((item)=>{
      const itemDate = new Date(item.date);
      return itemDate.getDate() !== day && itemDate.getDate() !== (day-1);
    });

    this.setState({today, yesterday, daysAgo});
  }

  componentWillMount(){
    const {navigation} = this.props; 
    navigation.addListener('didFocus',()=>{
      sendGetHistory().then((histories)=>{
        console.log('mount');
        this.groupHistoriesByDate(histories);
      }).catch(ex=>console.log(ex));
    })   
  }

  onClickHistoryItem = () =>{ 
    console.log('pressed');
  }
  render() {
    return (
      <Container>
        <Content>
          {this.state.today.length > 0 &&
          (<HistoryCards title = "Today" history={this.state.today} onClick={this.onClickHistoryItem}/>)}
          {this.state.yestarday.length > 0 &&
          (<HistoryCards title = "Yesterday" history={this.state.yestarday}/>)}
          {this.state.daysAgo.length > 0 &&
          (<HistoryCards title = "Days ago" history={this.state.daysAgo}/>)}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  historyTitle: {
    color: '#15aabf',
  },
})