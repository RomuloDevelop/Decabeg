import React from 'react';
import {View} from 'react-native';
import { List, ListItem, Icon,Text, Left } from 'native-base';

import {getLink} from '../../helpers';

const InformationHome = (props) => {
    return (
        <View>
            <List>
              <ListItem itemDivider>
                <Text>Información Tecnica y Legal</Text>
              </ListItem>
              <ListItem noIndent onPress={()=>props.navigation.navigate('privacypolicy')}>
                <Left>
                  <Icon name='lock' type="FontAwesome" style={{color: globalStyles.darkBlue, marginRight:10}}/>
                  <Text style={{fontSize:18}}>Politicas de privacidad</Text>
                </Left>
              </ListItem>
              <ListItem noIndent onPress={()=>props.navigation.navigate('terms')}>
                <Left>
                  <Icon name='balance-scale' type="FontAwesome" style={{color: globalStyles.darkBlue, marginRight:10, fontSize:15}}/>
                  <Text style={{fontSize:18}}>Terminos y Condiciones</Text>
                </Left>
              </ListItem>
              <ListItem noIndent onPress={()=>props.navigation.navigate('version')}>
                <Left>
                  <Icon name='sitemap' type="FontAwesome" style={{color: globalStyles.darkBlue, marginRight:10}}/>
                  <Text style={{fontSize:18}}>Version Actual</Text>
                </Left>
              </ListItem>
              <ListItem itemDivider>
                <Text>Redes</Text>
              </ListItem>
                <ListItem noIndent onPress={()=>{
                  getLink('https://www.instagram.com/dicabeg');
                }}>
                  <Left>
                    <Icon name='instagram' type="FontAwesome" style={{color: globalStyles.darkBlue, marginRight:10}}/>
                    <Text style={{fontSize:18}}>Instagram</Text>
                  </Left>
                </ListItem>
            </List>
        </View>

    );
}

export default InformationHome;