import React, {Component} from 'react';
import { 
    View,
    TouchableHighlight, StyleSheet, Image } from 'react-native';
    import { Container, Header, Content, Form, Item, Input, Label, Left, Button, Icon, Body, Right, Text } from 'native-base';
    import { Col, Row, Grid } from 'react-native-easy-grid';


class UpdatePerfil extends Component {

    handlePressGoBack = ()=>{
        this.props.navigation.goBack();
    }
    render() {
        return (
            <Container>
              <Header>
                <Left>
                  <Button
                  transparent
                  onPress={this.handlePressGoBack}>
                    <Icon name='arrow-back'/>
                  </Button>
                </Left>
                <Body>
                    <Text style={{color:'#FFFFFF'}}>Update Profile</Text>
                </Body>
                <Right/>
              </Header>
              <Content>
                <Grid>
                  <Row style={{alignItems:'flex-start', justifyContent: 'center'}}>
                    <Col style={styles.formImage}>
                          <Label>Choose Image</Label>
                          <Image style={styles.image}
                           source={require('../../assets/reactIcon.png')}/>
                    </Col>
                  </Row>
                  <Row>
                  <Col>
                    <Form>
                        <Item floatingLabel>
                          <Label>Username</Label>
                          <Input />
                        </Item>
                        <Item floatingLabel last>
                          <Label>Number</Label>
                          <Input />
                        </Item>
                        <Button block block style={styles.formButton}>
                            <Label style={{color:'#FFFFFF'}}>Update</Label>
                        </Button>
                    </Form>
                  </Col>
                  </Row>
                </Grid>
              </Content>
            </Container>
        )
    }

}
export default UpdatePerfil;

 
// Later on in your styles..
var styles = StyleSheet.create({
  image: {
      width: 100,
      height: 100,
      borderRadius: 100
  },
  formButton: {
      margin: 13
  },
  formImage: {
      margin: 13
  }
});