import React, { Component, useState } from "react";
import {View} from 'react-native';
import { Container, Content, Textarea, Form, Item, Label, Input, Button, Text, H3 } from "native-base";
import axios from 'axios';

function MessageForm() {
    const [title, setTitle] = useState('titulo local');
    const [body, setBody] = useState('cuerpo local');
    return (
      <Container>
        <Content padder>
          <View style={{margin:15}}>
            <H3>Crear Mensaje</H3>
            <Text style={{marginTop:10}}>Envia un mensaje a todo el grupo colocando un titulo y su descripción</Text>  
          </View>
          <Form>
            <Item stackedLabel>
              <Label>Titulo</Label>
              <Input value={title} onChangeText={(value)=>setTitle(value)} />
            </Item>
            <Textarea rowSpan={5} bordered placeholder="Cuerpo del mensaje" 
                value={body}
                onChangeText={(value)=>setBody(value)}/>
          </Form>
          <Button block info style={{marginTop:10}} onPress={()=>{
            axios.post('http://192.168.1.100:4001/api/client/message', {title,body})
            .then((response)=>{
              console.log(response);
            })
            .catch((error)=>{
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log('Error', error.message);
                }
                console.log(error.config);
            });
          }}>
            <Text>Enviar</Text>
          </Button>
        </Content>
      </Container>
    );
}

export default MessageForm;