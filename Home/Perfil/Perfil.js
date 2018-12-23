import React, {Component} from 'react';
import { StyleSheet, Image } from 'react-native';
import { Container,Content, ListItem, Text, Separator, IconNB, Header, Right, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';


class Perfil extends Component {
  
    handlePressUpdate = ()=>{
    }
    render() {

        return (
          <Container>
            <Content>
                <Grid>
                  <Row size={5} style={{ backgroundColor: 'rgba(41, 128, 185,1.0)', alignItems: 'center', justifyContent: 'center'}}>
                    <Image 
                        style={styles.image}
                        source={require('../../assets/reactIcon.png')}
                        />
                  </Row>
                  <Row size={2}>
                  <Col style={{ backgroundColor: '#FFFFFF'}}>
                    <Separator bordered>
                      <Text style={styles.textSeparator}>Teléfono</Text>
                    </Separator>
                    <ListItem>
                      <Text>0424-0547850</Text>
                    </ListItem>
                    <Separator bordered>
                      <Text style={styles.textSeparator}>Nómbre</Text>
                    </Separator>
                    <ListItem>
                      <Text>Caroline Aaron</Text>
                    </ListItem>
                   </Col>
                   </Row>
                </Grid>
            </Content>
          </Container>
        )
    }

}
export default Perfil;

 
// Later on in your styles..
var styles = StyleSheet.create({
  image: {
      width: 200,
      height: 200,
      borderRadius: 200
  },
  textSeparator: {
      fontSize: 13,
  }
});