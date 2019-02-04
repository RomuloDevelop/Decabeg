import React, {Component} from 'react';
import Video from 'react-native-video';
import {View, StyleSheet, TouchableOpacity,
    Platform,
    ProgressBarAndroid,ScrollView} from 'react-native';
import {Button, Text, Icon, ListItem, Radio, Right, Left, Badge, Toast } from 'native-base';
import FadeIn from '../../../Animations/FadeIn';
// Within your render function, assuming you have a file called
// "background.mp4" in your project. You can include multiple videos
// on a single screen if you like.
export default class Anuncios extends Component {
    constructor(props){
        super(props)
        this.state = {
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            paused: true,
            progressValue:0,
            uriArray:[
                'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
                'https://udemy-assets-on-demand.udemy.com/2018-03-09_13-55-44-e005d8ebb14aa521d2fc9c17b47ebba0/WebHD_720p.mp4?nva=20190116173920&token=0802db52f068e0d961eb0',
                'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4'],
            index:0,
            start:true,
            showQuestion:false,
            showResult:false,
            disabledButton:false,
            question: "De que trata el video?",
            answers: [
                {
                  key: 0,
                  correct: false,
                  answer: 'De Nada',
                  selected: true
                },
                {
                  key: 1,
                  correct: true,
                  answer: 'De Anuncios',
                  selected: false
                }
              ]
          };
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
        this.setState({progressValue:(currentTime/duration)});
    }
    onSkip = ()=>{
        const actualIndex = this.state.index;
        if(actualIndex === this.state.uriArray.length -1){
            alert('Last video is playing');
            return;
        }
        const index = actualIndex + 1;
        this.realoadVideo(index);
    }
    onBack = ()=>{
        const actualIndex = this.state.index;
        if(actualIndex === 0){
            alert('First video is playing');
            return;
        }
        const index = actualIndex - 1;
        this.realoadVideo(index);
    }

    onEnd = ()=>{
        
        //const index = (actualIndex === this.state.uriArray.length -1)?0:this.state.index +1;
        this.setState({showQuestion:true, pause:true});
    }

    onBuffer = ()=>{
    }

    videoError = (error)=>{
        alert(JSON.stringify(error))
    }

    radioHandle = (itemID)=>{
        const answers = this.state.answers.map((item)=>{
          if( item.key === itemID ){
            item.selected = true;
          } else {
            item.selected = false;
          }
          return item
        })
        this.setState({answers})
    }
    
    render(){    
        const radioListView = this.state.answers.map(
        (item)=>{
          return(
            <ListItem
              key={item.key}>
              <Left>
                <Text>{item.answer}</Text>
              </Left>
              <Right>
                <Radio 
                  selected = {item.selected}
                  onPress = {()=>{
                    this.radioHandle(item.key)
                  }}/>
              </Right>
            </ListItem>
          )
      })
        return(
            <ScrollView style={styles.container}>
                <TouchableOpacity
                    style={styles.videoButton}
                    onPress={() => this.setState({ paused: !this.state.paused })}>
                    {this.state.start && (
                        <Video source={{uri: this.state.uriArray[this.state.index]}}   // Can be a URL or a local file.
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
                            style={styles.video} />
                    )}
                </TouchableOpacity>
                <View style={styles.videoControl}>
                    <ProgressBarAndroid
                      styleAttr="Horizontal"
                      indeterminate={false}
                      progress={this.state.progressValue}/> 
                    <View style={{flex:1,flexDirection: 'row', justifyContent:'space-between', margin:10}}>
                        <TouchableOpacity onPress={this.onBack}>
                            <Icon style={styles.itemControl} type='FontAwesome' name='arrow-circle-left'/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ paused: false})}>
                            <Icon style={styles.itemControl} type='FontAwesome' name='play-circle'/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ paused: true })}>
                            <Icon style={styles.itemControl} type='FontAwesome' name='pause-circle'/>
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <Icon style={[styles.itemControl,{fontWeight:900}]} type='FontAwesome' name='star-o'/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onSkip}>
                            <Icon style={styles.itemControl} type='FontAwesome' name='arrow-circle-right'/>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={{marginTop:10}}>
                    {this.state.showQuestion && (
                    <FadeIn style={{marginHorizontal:15, marginBottom: 10}}>
                        <Text style={{fontSize:20, fontWeight:'bold', textAlign:'center'}}>{this.state.question}</Text>
                        {radioListView}
                        <TouchableOpacity style={styles.buttonContainer} onPress = {()=>{
                            /*Si es correcto envia saldo a la api */
                            const answers =  this.state.answers
                            for (let index = 0; index < answers.length; index ++){
                                const item = answers[index];
                                if(item.selected){
                                    console.log(item)
                                    this.result = item.correct;
                                    break;
                                }
                            }                   
                            this.setState(()=>({
                                        pause: false,
                                        showQuestion: false,
                                        disabledButton: false,
                                        showResult: true
                                    }), () => this.resutViewHandle = setTimeout(()=>this.setState({showResult:false}),3000)
                            );
                        }}>
                            <Text style={styles.textButton}>Send</Text>
                        </TouchableOpacity>
                    </FadeIn>)}
                    {this.state.showResult && (
                        <FadeIn style={{alignSelf:'center'}}>   
                          {this.result ?(
                          <Badge success style={{margin: 20}}>
                            <View style={{flexDirection:'row', justifyContent:'center', alignItems: 'center'}}>
                              <Icon name="check-circle" type='FontAwesome' style={styles.badgeIcon}/>
                              <Text>Correct Answer</Text>
                            </View>
                          </Badge>)
                          : (   
                        
                          <Badge danger style={{margin: 20}}>
                            <View style={{flexDirection:'row', justifyContent:'center', alignItems: 'center'}}>
                              <Icon name="times-circle" type='FontAwesome' style={styles.badgeIcon}/>
                              <Text>Incorrect Answer</Text>
                            </View>
                          </Badge>)}
                        </FadeIn>)}
                        </View>
                
                        </View>
            </ScrollView>
        );
    }
} 

// Later on in your styles..
const controlColor='rgba(41, 128, 185,1.0)';
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'stretch'
  },
  itemControl:{
    fontSize:50,
    color:controlColor,
    textShadowOffset :{width: 2,height: 3},
    textShadowRadius: 5
  },
  videoControl:{
    width:'100%'
  },
  videoButton: {
    width:'100%',
    height:250
  },
  video: {
    height:'100%',
    width: '100%'
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