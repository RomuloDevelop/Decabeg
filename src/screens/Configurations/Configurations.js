import React, {useState, useEffect, useRef} from 'react';
import { List, ListItem, Icon, Switch, Text, Left, Right, Button } from 'native-base';
import { sendUpdatePlayerId } from '../../Api';
import { getOneSignalId, getConfiguration, setConfiguration } from '../../helpers';
import SubmitButton from '../../sharedComponents/SubmitButton';
import globalStyles from '../../styles';

function Configurations(props){
  const [notify, setNotify] = useState(false);
  const switchRef = useRef(null);
  let oldConfigs = {};
  let id = '';
  useEffect(()=>{
    getConfiguration()
      .then(async (configs)=>{
        id = await getOneSignalId();
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
      <ListItem noIndent onPress={()=>props.navigation.navigate('privacypolicy')}>
        <Left>
          <Icon name='exclamation-circle' type="FontAwesome" style={{color: globalStyles.darkBlue, marginRight:10}}/>
          <Text style={{fontSize:18}}>Informacion de la app</Text>
        </Left>
      </ListItem>
    </List>
  );
}

export default Configurations;