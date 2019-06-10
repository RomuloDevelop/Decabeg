import React from 'react';
import { IconNB, Icon, Button, Text, List, ListItem, Body,Title, Left, Right, Header as HeaderBase } from 'native-base';
import { withNavigation } from 'react-navigation';
function HeaderNB(props){
    return (
        <HeaderBase style={{backgroundColor:globalStyles.navbarColor}}>
          <Left>
            <Button transparent onPress={props.onPress}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body style={{marginLeft:20}}>
            <Title>{props.title}</Title>
          </Body>
          <Right>
            <Button transparent onPress={()=>props.navigation.navigate('configurationlist')}>
              <Icon type='FontAwesome' name='cog'/>
            </Button>
          </Right>
        </HeaderBase>
    );
}
const Header = withNavigation(HeaderNB);
export default Header;