import React , {Component} from 'react';
import {Container, Content, Icon,IconNB, List, ListItem, Text, Left, Right} from 'native-base';
import {View,Image} from 'react-native';
export default class HomeList extends Component {
    render(){
        return(
            <Container>
        <Content>
            <View style={{
              borderRadius:27,
              flexDirection:'row', 
              alignItems:'stretch', 
              margin:13,
              backgroundColor:'rgb(180,180,180)'}}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 100}}
                    source={require('../../../assets/user.png')} />
                <View style={{justifyContent:'center'}}>
                    <Text style={{fontSize:20, textAlign:'center'}}>Caroline Aron</Text>
                    <Text style={{fontSize:20, textAlign:'center'}}>0424-589-6547</Text>
                </View>
            </View>
          <List>
            <ListItem noIndent
                onPress={() => this.props.navigation.navigate('updateperfil')}>
              <Left>
                <IconNB  type="FontAwesome" name='pencil'
                 style = {{color: 'rgba(41, 128, 185,1.0)', marginRight:10, fontSize:24}}/>
                <Text>Editar</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem
                onPress={() => this.props.navigation.navigate('history')}>
              <Left>
                <Icon name='history' type="FontAwesome"
                style={{color: 'rgba(41, 128, 185,1.0)', marginRight:10}}/>
                <Text>History</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem
                onPress={() => this.props.navigation.navigate('contacts')}>
              <Left>
                <Icon name='address-book' type="FontAwesome"
                style={{color: 'rgba(41, 128, 185,1.0)', marginRight:10}}/>
                <Text>Contacts</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
        );
    }
}