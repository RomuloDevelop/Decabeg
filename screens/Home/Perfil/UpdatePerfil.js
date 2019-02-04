import React, {Component} from 'react';
import { 
    View,
    StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Left, Button, Icon, Body, Right, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import ImagePicker from 'react-native-image-picker';

class UpdatePerfil extends Component {
    state ={
      img: require('../../../assets/reactIcon.png')
    }
    handlePressGoBack = ()=>{
        this.props.navigation.goBack();
    }

    handleImgPress = () => {
      ImagePicker.showImagePicker(null,(response) => {
        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = { uri: response.uri };
          console.log(source);
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      
          this.setState({
            img: source,
          });
        }
      });
      };
    render() {
        return (
            <Container>
              {/* <Header>
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
              </Header> */}
              <Content>
                <Grid>
                  <Row style={{alignItems:'flex-start', justifyContent: 'center'}}>
                    <Col style={styles.formImage}>
                      <TouchableOpacity
                       onPress={this.handleImgPress}>
                        <Label>Choose Image</Label>
                      </TouchableOpacity>
                      <Image style={styles.image}
                       source={this.state.img}/>
                    </Col>
                  </Row>
                  <Row>
                  <Col>
                    <Form style={{marginHorizontal:15}}>
                        <Item floatingLabel>
                          <Label>Username</Label>
                          <Input />
                        </Item>
                        <Item floatingLabel>
                          <Label>Number</Label>
                          <Input />
                        </Item>
                        <TouchableOpacity 
                            style = {styles.buttonContainer}
                            onPress = {this.handleLoginPress}>
                            <Text style = {styles.textButton}>Update</Text>
                        </TouchableOpacity>
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

 
var styles = StyleSheet.create({
  image: {
      width: 100,
      height: 100,
      borderRadius: 100
  },
  formImage: {
      margin: 15
  },
  buttonContainer: {
    paddingVertical: 10,
    marginVertical: 15,
    backgroundColor: 'rgba(41, 128, 185,1.0)',
    borderRadius: 10,
    elevation: 1,
    shadowOpacity: 2,
    shadowRadius: 2,
    shadowColor: '#000'
  },
  textButton: {
      color: '#FFF',
      textAlign: 'center'
  }
});