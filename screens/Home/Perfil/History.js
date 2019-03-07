import React, { Component } from "react";
import {StyleSheet, View} from "react-native";
import { Container, Content, Card, CardItem, Text, Body,
    Icon, IconNB, List, ListItem, Left, Right} from "native-base";
import LoaderScreen from '../../sharedComponents/LoadScreen';
import {sendGetHistory, sendDeleteHistory} from '../../../Api/historyApi';

import { appAlert } from '../../../Api/helpers';

import globalStyles from '../../../styles';

function HistoryCard({timeKey, history, onClick}){
  const historyView = history.map((item, index, array)=>{
  return(
    <CardItem key={index} /*onLongPress={()=>onClick(item,timeKey, array)}*/>
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
      daysAgo:[],
      loading:false
    }
  }

  deleteHistory=(cardItem, array, timeKey)=>{
    appAlert('Eliminar', 'Desea eliminar este item del historial',async ()=>{
      try{
        await sendDeleteHistory(false, id);
        array.filter((item)=>{
          return item !== cardItem;
        });
        switch(timeKey){
          case 1:
            this.setState({today:array});
            break;
          case 2:
            this.setState({today:array});
            break;
          case 3:
            this.setState({today:array});
            break;
        }
      } catch(ex){
        console.log(ex);
      }
    });
  }

  jsCoreDateCreator = (dateString) => { 
    // dateString *HAS* to be in this format "YYYY-MM-DD HH:MM:SS"  
    let dateParam = dateString.split(/[\s-:]/)  
    dateParam[1] = (parseInt(dateParam[1], 10) - 1).toString()  
    return new Date(...dateParam)  
  }

  groupHistoriesByDate(histories){
    const date = new Date();
    const day = date.getDate();
    console.log(day);
    const month = date.getMonth();
    const year = date.getFullYear();
    const today = histories.filter((item)=>{
      const itemDate = this.jsCoreDateCreator(item.date);
      alert(` Date = ${item.date}  itemDate = ${itemDate}  Actual= ${day} ${month} ${year}`);
      return itemDate.getDate() === day && itemDate.getMonth() === month && itemDate.getFullYear() === year;
    });
    const yesterday = histories.filter((item)=>{
      const itemDate = this.jsCoreDateCreator(item.date);
      return itemDate.getDate() === (day-1) && itemDate.getMonth() === month && itemDate.getFullYear() === year;
    });
    const daysAgo = histories.filter((item)=>{
      const itemDate = this.jsCoreDateCreator(item.date);
      return itemDate.getDate() !== day && itemDate.getDate() !== (day-1);
    });

    this.setState({today, yesterday, daysAgo});
  }

  componentWillMount(){
    const {navigation} = this.props; 
    navigation.addListener('didFocus',()=>{
      this.setState({loading:true});
      sendGetHistory().then((histories)=>{
        this.groupHistoriesByDate(histories);
        this.setState({loading:false});
      }).catch((ex)=>{
        this.setState({loading:false});
      });
    })   
  }

  onClickHistoryItem = () =>{ 
    console.log('pressed');
  }
  render() {
    return (
      <Container>
        <Content>
          <LoaderScreen loading = {this.state.loading}/>
          {this.state.today.length > 0 &&
          (<HistoryCards timeKey={1} title = "Today" history={this.state.today} onClick={this.onClickHistoryItem}/>)}
          {this.state.yestarday.length > 0 &&
          (<HistoryCards timeKey={2} title = "Yesterday" history={this.state.yestarday}/>)}
          {this.state.daysAgo.length > 0 &&
          (<HistoryCards timeKey={3} title = "Days ago" history={this.state.daysAgo}/>)}
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