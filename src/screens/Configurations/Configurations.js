import React, {useState, useEffect, useRef} from 'react';
import { List, ListItem, Icon, Switch, Text, Left, Right } from 'native-base';
import { sendUpdatePlayerId } from '../../Api';
import { getConfiguration, setConfiguration, sendEmail } from '../../helpers';
import globalStyles from '../../styles';

function Configurations(props){
  const [notify, setNotify] = useState(false);
  const switchRef = useRef(null);
  let oldConfigs = {};
  useEffect(()=>{
    getConfiguration()
      .then(async (configs)=>{
        oldConfigs = Object.assign(configs);
        setNotify(configs.notify);
      })
      .catch((ex)=>console.log(ex));
    return ()=>{
      const notifyChange = switchRef.current.props.value;
      if(oldConfigs.notify !== notifyChange ){
        sendUpdatePlayerId(notifyChange)
        .then(async ()=>{
          await setConfiguration({notify:notifyChange});
        })
        .catch((ex) => {
          console.log(ex);
        });
      }
    }
  },[]);
  return(
    <List>
      <ListItem itemDivider>
        <Text>Configuraciones de la app</Text>
      </ListItem>
      <ListItem noIndent>
        <Left>
          <Icon name='bell' type="FontAwesome" style={{color: globalStyles.darkBlue, marginRight:10}}/>
          <Text style={{fontSize:18}}>Notificaciones</Text>
        </Left>
        <Right>
          <Switch  ref={switchRef} value={notify} onValueChange={()=>setNotify(!notify)}/>
        </Right>
      </ListItem>
      <ListItem itemDivider>
        <Text>Acerca de la app</Text>
      </ListItem>
      <ListItem noIndent onPress={()=>props.navigation.navigate('privacypolicy')}>
        <Left>
          <Icon name='question-circle' type="FontAwesome" style={{color: globalStyles.darkBlue, marginRight:10}}/>
          <Text style={{fontSize:18}}>Ayuda</Text>
        </Left>
      </ListItem>
      <ListItem noIndent onPress={()=>props.navigation.navigate('information')}>
        <Left>
          <Icon name='exclamation-circle' type="FontAwesome" style={{color: globalStyles.darkBlue, marginRight:10}}/>
          <Text style={{fontSize:18}}>Informacion de la app</Text>
        </Left>
      </ListItem>
      <ListItem itemDivider>
        <Text>Soporte</Text>
      </ListItem>
      <ListItem noIndent onPress={()=>{
        sendEmail('dicabeg2019@gmail.com', 'Reporte');
        }}>
        <Left>
          <Icon name='headphones' type="FontAwesome" style={{color: globalStyles.darkBlue, marginRight:10}}/>
          <Text style={{fontSize:18}}>Escribe a soporte</Text>
        </Left>
      </ListItem>
    </List>
  );
}

export default Configurations;