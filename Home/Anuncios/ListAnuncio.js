// import React,{Component} from 'react'
// import {Images, Modal, Alert, View} from 'react-native';
// import {Container, Content, Card, CardItem, Text, Body, Toast, Button} from 'native-base';
// import { Grid, Col, Row} from 'react-native-easy-grid';
// import Anuncio from './Anuncio';

// class ListAnuncios extends Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             modalVisible: false,
//             videoId: ''
//         }
//     }

//     setModalVisible(modalVisible, videoId) {
//         this.setState({modalVisible, videoId});
//       }

//     render(){

//         const videoCardRender = () => {
//             const cardVideos = require('../../Api/data.json').videos.map((item, index)=>{
//                 return (      
//                     <Card
//                     key = {item.key}>
//                         <CardItem header>
//                           <Text>{item.name}</Text>
//                         </CardItem>
//                         <CardItem>
//                           <Body>
//                             <Text>
//                               {item.img}
//                             </Text>
//                           </Body>
//                         </CardItem>
//                         <CardItem footer button
//                             onPress = {() => this.setModalVisible(true, item.id)}>
//                           <Text>Watch Announce</Text>
//                         </CardItem>
//                     </Card> )
//             });
//             const len = Math.round(cardVideos.length/2)
//             const videoList1 = cardVideos.slice(0,len);
//             const videoList2 = cardVideos.slice(len);
//             return {videoList1, videoList2}
//         }
//         const videoModal = ()=> {
//             return( 
//                 <Modal
//                   animationType="slide"
//                   transparent={false}
//                   visible={this.state.modalVisible}
//                   onRequestClose={() => {
//                     Alert.alert('Modal has been closed.');
//                   }}>
//                     <Anuncio modalVisible = {this.state.modalVisible} videoId = {this.state.videoId}/>
//                     <Button
//                       onPress={() => {
//                         this.setModalVisible(!this.state.modalVisible);
//                       }}>
//                       <Text>Salir</Text>
//                     </Button>
//                 </Modal>)
//         }
//         return(
//             <Container>
//                 <Content>
//                     {videoModal()}
//                     <Grid>
//                         <Col>
//                             {videoCardRender().videoList1}
//                         </Col>
//                         <Col>
//                             {videoCardRender().videoList2}
//                         </Col>
//                     </Grid>
//                 </Content>
//             </Container>
//         );
//     }
// }

// export default ListAnuncios