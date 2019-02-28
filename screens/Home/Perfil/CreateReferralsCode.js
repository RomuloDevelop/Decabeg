import React, {Component} from 'react';
import {TouchableOpacity, Clipboard} from 'react-native';
import { Container, Content, Text, Icon, Form, Item, Input, Label, Row, Col, Grid } from 'native-base';

import { sendGetUserCode } from '../../../Api/api';
import { sendEmail } from '../../../Api/helpers';

import { getUserData } from '../../../dataStore/sessionData';

import  globalStyles, { buttonForm } from '../../../styles';

export default class CreateReferralsCode extends Component {
    state = {
        invite_code: '',
        email:'',
        validEmail: false,
        iconCpyColor:'grey'
    }


    componentDidMount(){
        getUserData().then((data)=>{
            const {invite_code} = data;
            this.setState({invite_code}); 
        })
    }

    generateCode = async ()=>{
        //const invite_code = await getUserCode();
        //this.setState({invite_code});
    }

    sendCode = ()=>{
        if(this.state.validEmail)
        sendEmail(
            `${this.state.email}`,
            'Greeting!',
            'I want you to joing me in this adventure \r\n' +
            `With this code you can help me and become a user of this app: \r\n` +
            `http://dicabeg/signup/${this.state.invite_code}`
        ).then(() => {
            console.log('Our email successful provided to device mail ');
        });
    }

    handleChangeCode=(value)=>{
        this.setState({invite_code:value});
    }

    handleChangeEmail=(value)=>{
        const testing = /\S+@\S+\.\S+/;
        const validEmail = testing.test(value);
        this.setState({email:value, validEmail});
    }
    render(){
        
        return(
            <Container>
                <Content>
                    <Grid>
                    <Row>
                        <Col style={{marginRight:10}}>
                            <Form>
                                <Item floatingLabel>
                                    <Label>Code</Label>
                                    <Input disabled value={this.state.invite_code}/>
                                    <Icon name='copy' type='FontAwesome'  onPress={()=>{
                                        Clipboard.setString(this.state.invite_code);
                                    }}
                                    style={{color:this.state.iconCpyColor}}/>
                                </Item>
                                <Item floatingLabel error={!this.state.validEmail} success={this.state.validEmail}>
                                    <Label>Email</Label>
                                    <Input onChangeText={this.handleChangeEmail} value={this.state.email}/>
                                    <Icon name={this.state.validEmail?'checkmark-circle':'close-circle'} />
                                </Item>
                            </Form>
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col>
                            <TouchableOpacity style={buttonForm.buttonContainer}
                                onPress={this.generateCode}>
                                <Text style={buttonForm.textButton}>Create Code</Text>
                            </TouchableOpacity>
                        </Col>
                    </Row> */}
                    <Row>
                        <Col>
                            <TouchableOpacity style={[buttonForm.buttonContainer, {backgroundColor:globalStyles.lightBlue}]}
                                onPress={this.sendCode}>
                                <Text style={buttonForm.textButton}>Send Email</Text>
                            </TouchableOpacity>
                        </Col>
                    </Row>
                    </Grid>
                </Content>
            </Container>
        );
    }

}