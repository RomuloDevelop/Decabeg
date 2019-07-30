import React, { Component } from "react";
import {StyleSheet, View, ScrollView} from "react-native";
import { Container, Content, Card, CardItem, Text, Icon, Right} from "native-base";
import LoaderScreen from '../../../sharedComponents/LoadScreen';
import Header from '../../../sharedComponents/Header';
import NoDataIcon from '../../../sharedComponents//NoDataIcon';
import PaginationContainer from '../../../sharedComponents/PaginationContainer';

import {sendGetHistory, sendDeleteHistory} from '../../../Api';

import { appAlert } from '../../../helpers';

import moment from 'moment';
import globalStyles from '../../../styles';


function HistoryCard({parentIndex, historyData, onPress}){
  const historyView = historyData.map((item, index, array)=>{
  return(
     <CardItem key={index} button onPress={()=>onPress(parentIndex, index)}>
      <Icon type='FontAwesome' active name="file-video-o"
      style={{color: 'rgba(41, 128, 185,1.0)'}}/>
      <View style={{flexDirection:'column'}} >
        <Text style={{fontWeight:'500', fontSize:18}}>{item.video.name}</Text>
        <Text style={{color:globalStyles.mediumBlue}}>{item.video.link}</Text>
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
    <Card key={index}>            
      <CardItem header>
        <Text style={styles.historyTitle}>{item.name}</Text>
      </CardItem>
      <HistoryCard parentIndex={index} historyData={item.data} onPress = {onPress}/>
    </Card>);
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
    const historyData = data;
    let formatedDate = historyData.map(item=>{
      item.date = item.update_date;
      delete item.update_date;
      return item;
    });
    let duplicatedKeys = formatedDate.map(item=>item.date);
    let key = duplicatedKeys.filter((item, index, array)=>array.indexOf(item) === index);//Delete duplicated dates
    let historyArray = key.map((itemKey)=>{
        const arrayItem = formatedDate.filter(item=>{
            if( item.date === itemKey){
                delete item.date;
                return true
            }
            return false;
        });
        return {name:itemKey,data:arrayItem}
    });
    console.log(historyArray);
    let historyArrayFormated = historyArray.map((item)=>{
        item.name = moment(item.name).calendar();
        return item;
        
    });
    console.log({history:historyArrayFormated});
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
     });
  }

  onPress = (parentIndex, childIndex) =>{
    appAlert("Eliminar elemento","Seguro que desea eliminar este elmento?",()=>{
      const {history} = this.state;
      const {data} = history[parentIndex];
      sendDeleteHistory(false, data[childIndex].video.video_id)
      .then((response)=>{
        if(response){
          data.splice(childIndex, 1);
          history.data = data;
          this.setState({history});
        }
      }).catch((e)=>console.log(e));
    })
  }
  render() {
    return (
      <Container>
        <Header color={globalStyles.darkBlue} title="Historial" onPress={()=>this.props.navigation.openDrawer()}/>
        <Content contentContainerStyle={this.state.history.length <= 0?{flex: 1}:{}}>
          <LoaderScreen loading = {this.state.loading}/>
          {(this.state.history.length <= 0)?
          (<NoDataIcon text="Sin datos de historial"/>):(
            <ScrollView>
              <PaginationContainer 
                onFetch={()=>alert('Ver más')}
                containerStyle = {{padding:15}}>
                <HistoryCards history={this.state.history} onPress={this.onPress}/>
              </PaginationContainer>
            </ScrollView>
          )}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  historyTitle: {
    color: globalStyles.darkBlue,
  },
});

export default History;