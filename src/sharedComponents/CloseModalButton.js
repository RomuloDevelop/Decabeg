import React from 'react';
import {Button, Icon} from 'native-base';

function CloseModalButton(props){
    return(
        <Button style={{alignSelf:'flex-end', margin:10}} bordered warning onPress={props.onClose}>
          <Icon type="FontAwesome" name='times' warning/>
        </Button>
    )
}

export default CloseModalButton;