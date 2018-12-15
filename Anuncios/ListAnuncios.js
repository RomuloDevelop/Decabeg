import React,{Component} from 'react'
import {Images, Modal, Alert, View} from 'react-native';
import {Container, Content, Card, CardItem, Text, Body, Toast, Button} from 'native-base';
import { Grid, Col, Row} from 'react-native-easy-grid';
import Anuncio from './Anuncio';

class ListAnuncios extends Component {
    constructor(props){
        super(props)
        this.state = {
            modalVisible: false,
            videoId: ''
        }
    }

    setModalVisible(modalVisible, videoId) {
        this.setState({modalVisible, videoId});
      }

    render(){

        const videoCardRender = () => {
            const videos = require('../Api/data.json').videos
            const cardVideos = videos.map((item, index, videos)=>{
                return (      
                    <Card
                    key = {item.key}>
                        <CardItem header>
                          <Text>{item.name}</Text>
                        </CardItem>
                        <CardItem>
                          <Body>
                            <Text>
                              {item.img}
                            </Text>
                          </Body>
                        </CardItem>
                        <CardItem footer button
                            onPress = {() => this.props.navigation.navigate('anuncio',{
                                'index':index,
                                'videos': videos.map((item)=> item.key)
                                }
                            )}>
                          <Text>Watch Announce</Text>
                        </CardItem>
                    </Card> )
            });
            const len = Math.round(cardVideos.length/2)
            const videoList1 = cardVideos.slice(0,len);
            const videoList2 = cardVideos.slice(len);
            return {videoList1, videoList2}
        }
        return(
            <Container>
                <Content>
                    <Grid>
                        <Col>
                            {videoCardRender().videoList1}
                        </Col>
                        <Col>
                            {videoCardRender().videoList2}
                        </Col>
                    </Grid>
                </Content>
            </Container>
        );
    }
}

export default ListAnuncios