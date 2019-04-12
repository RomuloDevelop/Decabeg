import React, { Component } from "react";
import {StyleSheet, View} from "react-native";
import { Container, Content, Card, CardItem, Text, Body,
    Icon, IconNB, List, ListItem, Left, Right} from "native-base";
import LoaderScreen from '../../sharedComponents/LoadScreen';
import {sendGetHistory, sendDeleteHistory} from '../../../Api/history';

import { appAlert } from '../../../helpers/generalFunctions';

import moment from 'moment';
import globalStyles from '../../../styles';


function HistoryCard({parentIndex, historyData, onPress}){
  const historyView = historyData.map((item, index, array)=>{
  return(
     <CardItem key={index} button onPress={()=>onPress(parentIndex, index)}>
      <Icon type='FontAwesome' active name="file-video-o"
      style={{color: 'rgba(41, 128, 185,1.0)'}}/>
      <View style={{flexDirection:'column'}} >
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

function HistoryCards({history, onPress}){
  const historyView = history.map((item, index)=>{
    return(
    item.data.length>0&&(<Card key={index} onPress={()=>alert('hello')}>            
      <CardItem header>
        <Text style={styles.historyTitle}>{item.name}</Text>
      </CardItem>
      <HistoryCard parentIndex={index} historyData={item.data} onPress = {onPress}/>
    </Card>));
  }) 
  return historyView;
}

class History extends Component {
  constructor(props){
    super(props);
    this.state={
      history:[],
      loading: false,
    }
  }

  toArrayHistory(data) {
    let duplicatedKeys = data.map(item=>item.date);
    let key = duplicatedKeys.filter((item, index, array)=>array.indexOf(item) === index);
    let historyArray = key.map((itemKey)=>{
        const arrayItem = data.filter(item=>{
            if(item.date === itemKey){
                delete item.date;
                return true
            }
            return false;
        });
        return {name:itemKey,data:arrayItem}
    });

    let historyArrayFormated = historyArray.map((item)=>{
        const key = item.name;
        if(!moment(key).isSame(moment(),'year'))
            return item;
        if(!moment(key).isSame(moment(),'month'))
            return item;
        if(moment(key).diff(moment(),'day')===0){
            item.name = "Today";
            return item;
        }
        else if(moment(key).diff(moment(),'day')===-1){
            item.name = "Yesterday";
            return item;
        }
        else return item;
    });
    this.setState({history:historyArrayFormated})
}


  componentWillMount(){
    const {navigation} = this.props; 
    navigation.addListener('didFocus',()=>{
      this.setState({loading:true});
      sendGetHistory().then((data)=>{
         this.toArrayHistory(data);
         this.setState({loading:false});
       }).catch((e)=>{
         console.log(e);
         this.setState({loading:false});
       });
     })
    
        //this.toArrayHistory(fetchData);   
  }

  onPress = (parentIndex, childIndex) =>{
    appAlert("Eliminar elemento","Seguro que desea eliminar este elmento?",()=>{
      const {history} = this.state;
      const {data} = history[parentIndex];
      sendDeleteHistory(false, data[childIndex].video_id)
      .then((response)=>{
        if(response){
          data.splice(childIndex, 1);
          history.data = data;
          this.setState({history});
        }
      }).catch((e)=>alert(JSON.stringify(e)));
    })
  }
  render() {
    return (
      <Container>
        <Content>
          <LoaderScreen loading = {this.state.loading}/>
          <HistoryCards history={this.state.history} onPress={this.onPress}/>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  historyTitle: {
    color: '#15aabf',
  },
});

export default History;