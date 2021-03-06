import React, {Component} from 'react';
import Video from 'react-native-video';
import { View, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
//import * as firebase from 'react-native-firebase';
import * as Progress from 'react-native-progress';
import { Text, Icon, Radio, Right, Left, Badge, Card, CardItem, Col, Row, Grid } from 'native-base';
import FadeIn from '../../../Animations/FadeIn';
import { sendGetVideos, sendPostHistory, sendUpdateUserData } from '../../../Api';
import { expirationAddListener, appAlert } from '../../../helpers';
import LoaderScreen from '../../../sharedComponents/LoadScreen';
import globalStyles from '../../../styles';
// let video = '';
// const defaultStorage = firebase.storage().refFromURL('gs://dicabeg-10e40.appspot.com/Visita distintos anuncios de servicios públicos en Neopicados - DESAFÍOS SEMANA 10 DE FORTNITE.mp4')
// .getDownloadURL().then((url)=>{
//   video = url;
// });

async function updateUserMoneyLocalAndSend(data){
  try {
    await sendUpdateUserData({balance:data});
  } catch(ex) {
    throw ex;
  }
}

function Answers({video, onPressRadioButton}){
  try{
    const CardItems = video.responses.map((item)=>{
      return(
        <CardItem
          key={item.key}>
          <Left>
            <Text style={{textTransform: 'capitalize'}}>{item.response}</Text>
          </Left>
          <Right>
            <Radio 
              color = {globalStyles.darkBlue}
              selectedColor = {globalStyles.darkBlue}
              selected = {item.selected}
              onPress = {()=>{
                onPressRadioButton(item.key)
              }}/>
          </Right>
        </CardItem>
      )
    });
    return(
      <Card>            
        <CardItem header >
          <Text style={{textTransform: 'uppercase'}}>{video.question}</Text>
        </CardItem>
        {CardItems}
      </Card>
    );
  } catch(ex){
    console.log(ex);
  }
}

class Anuncios extends Component {
    constructor(props){
        super(props);
        this.result = false;
        this.state = {
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            paused: true,
            progressValue:0,
            videos:[],
            index:0,
            start:false,
            isBuffering: false,
            showQuestion:false,
            showResult:false,
            disabledButton:false,
            disableButtonSend:false
          };
    }

    componentWillMount(){
      expirationAddListener();
      sendGetVideos().then((data)=>{
        try{
          if(data){
            console.log(data)
            const videos = data.map((video)=>{
              // const response = video.responses.map((response, index)=>{
              //   let selected = false
              //   if(index===0) selected=true;
              //   return {key:index, response, selected};
              // });
              const response = Object.keys(video.responses).map((response, index)=>{
                let selected = false;
                if(index===0) selected=true;
                return {key:index, response:video.responses[response], selected};
              });
              video.responses = response;
              return video;
            });
            this.setState({videos, start:true});
          } else 
            console.log('Not videos found');
        }catch(ex){
            console.log('exception willunmount');
            console.log(ex);
        }
      }).catch((ex)=>console.log('in catch willunmount' + JSON.stringify(ex)));
    }
    componentDidMount(){
      appAlert('Anuncios no disponibles','Los anuncios no estaran disponible por el momento, para generar dicags puedes mirar los videos bonificados');
      const {navigation} = this.props;
        this.didBlurEvent = navigation.addListener('didBlur',()=>{
        this.setState({paused:true});
      });
    }

    componentWillUnmount(){
      this.didBlurEvent.remove();
    }

    realoadVideo(index){
        this.setState({index, start:false});
        setTimeout(()=>{
            this.setState({start:true});
        }, 1000);
    }

    onLoad = (data)=>{
        const duration = data.duration;
        this.setState({duration});
    }

    onProgress = (data)=>{
        const currentTime = data.currentTime;
        const duration = this.state.duration;
        this.setState({progressValue:(currentTime/duration), isBuffering:false});
    }

    onSkip = ()=>{
        const actualIndex = this.state.index;
        if(actualIndex === this.state.videos.length -1){
            appAlert('Anuncios','Este es el ultimo video');
            return;
        }
        const index = actualIndex + 1;
        this.realoadVideo(index);
    }
    
    onBack = ()=>{
        const actualIndex = this.state.index;
        if(actualIndex === 0){
            appAlert('Anuncios','Este es el primer video');
            return;
        }
        const index = actualIndex - 1;
        this.realoadVideo(index);
    }

    onEnd = ()=>{
        console.log('end');
        //const index = (actualIndex === this.state.uriArray.length -1)?0:this.state.index +1;
        this.setState({showQuestion:true, paused:true, disabledButton:true, progressValue:1});

    }

    onBuffer = ()=>{
      this.setState({isBuffering:true});
    }

    videoError = (error)=>{
        console.log(error);
    }

    onPressAnswer = async ()=>{
      try{
        const responses =  this.state.videos[this.state.index].responses;
        for (let index = 0; index < responses.length; index ++){
            const item = responses[index];
            if(item.selected){
                const {correct} = this.state.videos[this.state.index];
                this.result = correct-1 === index; //Indice en videos empieza en 1
                break;
            }
        }
        console.log(`Result: ${this.result}`);
        console.log(this.state.videos[this.state.index].video_id);
        //Videos
        // if(this.result) await updateUserMoneyLocalAndSend(parseFloat(0.005));
        // await sendPostHistory(this.state.videos[this.state.index].video_id);
        this.setState(()=>({
                    paused: false,
                    showQuestion: false,
                    disabledButton: false,
                    disableButtonSend: false,
                    showResult: true
                }), () => this.resutViewHandle = setTimeout(()=>this.setState(()=>({showResult:false}),this.onSkip),3000)
        );
      } catch(ex){
        this.setState({disableButtonSend:false});
        console.log(ex);
      }
  }

    radioHandle = (itemID)=>{
      try {
        const videos = this.state.videos;
        const responses = videos[this.state.index].responses
        .map((item)=>{
          if( item.key === itemID ){
            item.selected = true;
          } else {
            item.selected = false;
          }
          return item;
        });
        videos.responses = responses;
        this.setState({videos});
      }catch(ex){
        console.log('In radio Handle');
        console.log(ex);
      }
    }
    render(){
        return(
            <ScrollView>
              <LoaderScreen loading ={this.state.disableButtonSend}/>
                <TouchableOpacity
                    style={styles.videoButton}
                    disabled={this.state.disabledButton}
                    onPress={() => this.setState({ paused: !this.state.paused })}>
                {/* {this.state.isBuffering && ( */}
                
                            
                  {/* <View style={{
                    zIndex:100,
                    marginLeft: 'auto', 
                    marginRight: 'auto'}}>
                    <Progress.Circle indeterminate={true}/>
                  </View> */}
                 {/* )} */}
                    {this.state.start && (
                        <Video source={{ uri: this.state.videos[this.state.index].link }}   // Can be a URL or a local file.
                            ref={(ref) => {
                                this.video = ref;
                            }}                                      // Store reference
                            progressUpdateInterval={1000}
                            onLoad={this.onLoad}
                            onBuffer={this.onBuffer}                // Callback when remote video is buffering
                            onError={this.videoError}               // Callback when video cannot be loaded
                            onEnd={this.onEnd}
                            onProgress={this.onProgress}
                            paused={this.state.paused}
                            style={styles.video} 
                            rate={1}/>
                    )}
                </TouchableOpacity>
                <View style={styles.videoControl}>
                    <Progress.Bar
                    style={{marginHorizontal:5}}
                      color={globalStyles.darkBlue}
                      width = {null}
                      progress={this.state.progressValue}/> 
                    {/* <View style={{flex:1,flexDirection: 'row', justifyContent:'space-between', margin:10}}> */}
                    <Grid style={{margin:10}}>
                    <Row>
                        <Col>
                        <TouchableOpacity onPress={this.onBack} disabled={this.state.disabledButton}>
                            <Icon style={styles.itemControl} type='FontAwesome' name='arrow-circle-left'/>
                        </TouchableOpacity>
                        </Col>
                        <Col>
                        <TouchableOpacity onPress={() => this.setState({ paused: false})} disabled={this.state.disabledButton}>
                            <Icon style={[styles.itemControl,{color:!this.state.paused?globalStyles.mediumBlue:globalStyles.darkBlue}]} type='FontAwesome' name='play-circle'/>
                        </TouchableOpacity>
                        </Col>
                        <Col>
                        <TouchableOpacity onPress={() => this.setState({ paused: true })} disabled={this.state.disabledButton}>
                            <Icon style={[styles.itemControl,{color:this.state.paused?globalStyles.mediumBlue:globalStyles.darkBlue}]} type='FontAwesome' name='pause-circle'/>
                        </TouchableOpacity>
                        {/* <TouchableOpacity disabled={this.state.disabledButton}>
                            <Icon style={[styles.itemControl,{fontWeight:900}]} type='FontAwesome' name='star-o'/>
                        </TouchableOpacity> */}
                        </Col>
                        <Col>
                        <TouchableOpacity onPress={this.onSkip} disabled={this.state.disabledButton}>
                            <Icon style={styles.itemControl} type='FontAwesome' name='arrow-circle-right'/>
                        </TouchableOpacity>
                        </Col>
                    </Row>
                    </Grid>
                    {/* </View> */}
                    
                    <View style={{marginTop:10}}>
                    {this.state.showQuestion && (
                    <FadeIn style={{marginHorizontal:15, marginBottom: 10}}>
                        <Answers 
                          video = {this.state.videos[this.state.index]}
                          onPressRadioButton = {this.radioHandle}/>
                        <TouchableOpacity style={styles.buttonContainer} 
                            onPress = {()=>this.setState(()=>({disableButtonSend:true}),this.onPressAnswer)} 
                            disabled={this.state.disableButtonSend}>
                            <Text style={styles.textButton}>Enviar</Text>
                        </TouchableOpacity>
                    </FadeIn>)}
                    {this.state.showResult && (
                        <FadeIn style={{alignSelf:'center'}}>   
                          {this.result ?(
                          <Badge success style={{margin: 20}}>
                            <View style={{flexDirection:'row', justifyContent:'center', alignItems: 'center'}}>
                              <Icon name="check-circle" type='FontAwesome' style={styles.badgeIcon}/>
                              <Text>Respuesta Correcta</Text>
                            </View>
                          </Badge>)
                          : (   
                        
                          <Badge danger style={{margin: 20}}>
                            <View style={{flexDirection:'row', justifyContent:'center', alignItems: 'center'}}>
                              <Icon name="times-circle" type='FontAwesome' style={styles.badgeIcon}/>
                              <Text>Respuesta Incorrecta</Text>
                            </View>
                          </Badge>)}
                        </FadeIn>)}
                        </View>
                
                        </View>
                        
            </ScrollView>
        );
    }
} 

const styles = StyleSheet.create({
  itemControl:{
    textAlign:'center',
    fontSize:Math.round(Dimensions.get('window').height / 13),
    color:globalStyles.darkBlue,
    textShadowOffset :{width: 2,height: 3},
    textShadowRadius: 5
  },
  videoControl:{
    width:'100%'
  },
  videoButton: {
    width:'100%',
    height:Math.round(Dimensions.get('window').height)*0.45
  },
  video: {
    height:'100%',
    width: '100%'
  },  
  buttonContainer: {
    paddingVertical: 10,
    marginVertical: 15,
    backgroundColor: globalStyles.darkBlue,
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

export default Anuncios;