import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import { Container, Content,List, ListItem, Left, Body, Right, Text, H3, H1, Grid, Col, Row} from "native-base";
import { getUserData } from '../../../helpers';
import moment from 'moment';
import SubmitButton from '../../sharedComponents/SubmitButton';

import globalStyles from '../../../styles';

const degradado = '66';
const data = [
    {
        date:1555270967,
        user:'romulo',
        monto:'-50',
        total:'5'
    },
    {
        date:1556048567,
        user:'yenni',
        monto:'-50',
        total:'55'
    },
    {
        date:1555875767,
        user:'julio',
        monto:'100',
        total:'105'
    }
];

function TransaccionList(props){
    return data.map((item, index)=>{
        const date = moment.unix(item.date).calendar().split('at');
        const color = (index%2)?globalStyles.mediumBlue:globalStyles.lightBlue;
        return(
            <ListItem key={index} style={{backgroundColor:color+degradado, marginLeft:0}}>
              <Left>
                <View style={{marginLeft:8}}>
                  <Text>{date[0]}</Text>
                  {date.length>1&&<Text>{date[1]}</Text>}
                </View>
              </Left>
              <Body>
                  <Text>{item.user}</Text>
              </Body>
              <Right>
                    <Text style={{textAlign:'center'}}>{item.total}</Text>
                    <Text style={{textAlign:'center'}}>{item.monto}</Text>
              </Right>
            </ListItem>
        )
    });
}
class Transacciones extends Component {
  constructor(props){
    super(props);
    this.state = {
        points:0
    }
  }
  componentWillMount(){
    getUserData().then((data)=>{
        const {points} = data;
        this.setState({points});
    });
  }
  render(){
        return(
            <Container>
                <Content>
                    <Grid style={{padding:15, marginVertical:10,marginHorizontal:5,borderRadius:20, backgroundColor:globalStyles.navbarColor+'aa'}}>
                        <Row><H3 style={{color:'white'}}>Monto actual:</H3></Row>
                        <Row><H1 style={{marginLeft:10, color:'white'}}>{this.state.points}</H1></Row>
                    </Grid>
                    <List>
                        <ListItem itemDevider style = {{backgroundColor:globalStyles.mediumBlue+degradado, marginLeft:0, borderRadiusTop:20}}>
                            <H3 style={{marginLeft:8}}>Operaciones</H3>
                        </ListItem>
                        <TransaccionList/>
                    </List>
                </Content>
            </Container>);
  }
}

export default Transacciones;