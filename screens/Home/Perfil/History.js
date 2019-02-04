import React, { Component } from "react";
import {StyleSheet} from "react-native";
import { Container, Content, Card, CardItem, Text, Body,
    Icon, IconNB, List, ListItem, Left, Right} from "native-base";
export default class History extends Component {
  render() {
    return (
        <Container>
        <Content>
          <Card>            
            <CardItem header >
              <Text style={styles.historyTitle}>Hoy</Text>
            </CardItem>
            <CardItem>
              <Icon type='FontAwesome' active name="file-video-o"
              style={{color: 'rgba(41, 128, 185,1.0)'}}/>
              <Text>Video 1</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
            <CardItem>
              <Icon type='FontAwesome' active name="file-video-o"
              style={{color: 'rgba(41, 128, 185,1.0)'}}/>
              <Text>Video 2</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
            <CardItem>
              <Icon  type='FontAwesome' active name="file-video-o" 
              style={{color: 'rgba(41, 128, 185,1.0)'}}/>
              <Text>Video 3</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
           </Card>
          <Card>            
            <CardItem header >
              <Text style={styles.historyTitle}>Ayer</Text>
            </CardItem>
            <CardItem>
              <Icon type='FontAwesome' active name="file-video-o" 
              style={{color: 'rgba(41, 128, 185,1.0)'}}/>
              <Text>Video 1</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
            <CardItem>
              <Icon  type='FontAwesome' active name="file-video-o" 
              style={{color: 'rgba(41, 128, 185,1.0)'}}/>
              <Text>Video 2</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
            <CardItem>
              <Icon type='FontAwesome' active name="file-video-o" 
              style={{color: 'rgba(41, 128, 185,1.0)'}}/>
              <Text>Video 3</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
            <CardItem>
              <Icon type='FontAwesome' style={{color: 'rgba(41, 128, 185,1.0)'}} active name="file-video-o" />
              <Text>Video 4</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
           </Card>
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