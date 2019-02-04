
import React, {Component}from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
  Dimensions,
  Platform,
  ProgressBarAndroid,
  Alert
} from 'react-native';
import {Button, Text, Icon, ListItem, Radio, Right, Left, Badge, Toast } from 'native-base'
import YouTube from 'react-native-youtube';
import Orientation from 'react-native-orientation';
import FadeIn from '../../Animations/FadeIn';

export default class Anuncio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videoIds: ['pq-yP7mb8UE','w5LYm_zSeFU','ygGb3N_Nko4','UyTqgnKD3sw','h2aRP5LY78o'],
      actualIndexVideo: 0,
      isReady: false,
      status: null,
      quality: null,
      error: null,
      isPlaying: true,
      isLooping: true,
      duration: 0,
      currentTime: 0,
      fullscreen: false,
      containerMounted: false,
      containerWidth: null,
      showAlert: true,
      disabledButton: false,
      showQuestion: false,
      question: "De que trata el video?",
      showResult: false,
      result: false,
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

  componentWillUnmount() {
    alert('unmounting');
    Orientation.unlockAllOrientations();
    clearInterval(this.timerID);
  }

  componentDidMount(){
      Orientation.lockToPortrait();
      this.timerID = setInterval(() => {
        this.progressBarHandle()
      }, 1000);
  }

  async progressBarHandle(){
    try {
      if(this.state.containerMounted && this.state.isReady) {
        if(this._youTubeRef) {
          const currentTime = await this._youTubeRef.currentTime()
          const duration = await this._youTubeRef.duration()
          if(duration !== 0) {
            const progressValue= currentTime/duration
            const actualIndexVideo = await this._youTubeRef.videosIndex();
            if (actualIndexVideo > this.state.actualIndexVideo){
              this.setState({
                actualIndexVideo,
                progressValue,
                currentTime,
                duration,
                isPlaying: false,
                showQuestion: true,
                disabledButton: true
              });
            } else {
              this.setState({
                progressValue,
                currentTime,
                duration
              });
            }
          }
        }
      }
    } catch(ex) {
      showMessage(ex)
    }
  }

  nextButtonHandle = () => {
    clearInterval(this.timerID);
    this.setState({
      isPlaying: false,
      disabledButton: true
    })
    if(this.state.showAlert){
      Alert.alert(
        'Next Video',
        'If you jump to the next video you will not recieve points',
        [
          {text: 'Cancel', onPress: () => {
            this.setState({
              isPlaying: true,
              disabledButton: false
            })
          }, style: 'cancel'},
          {text: 'OK', onPress: () => {
            this.executeNextButton()
          }},
        ],
        { cancelable: false }
      )
    
    } else {
      this.executeNextButton()
    }
  }

  executeNextButton(){
    if(this._youTubeRef){
      
      let actualIndexVideo = 0
      if(this.state.actualIndexVideo !== this.state.videoIds.length - 1){
        actualIndexVideo = this.state.actualIndexVideo + 1;
      this.setState(() => {
        return {
          isPlaying: true,
          disabledButton: false,
          showAlert: false,
          actualIndexVideo
        }
      }, ()=>{
        //this._youTubeRef.playVideoAt(actualIndexVideo) 
        this._youTubeRef.nextVideo()
      })
    } else {
      this.setState({
        isPlaying: true,
        disabledButton: false,
        showAlert: false
      })
    }
    } else {
      this.setState({
        isPlaying: true,
        disabledButton: false
      })
    }
    this.timerID = setInterval(() => {
      this.progressBarHandle()
    }, 1000);
  }

 executeBackButton =  async ()=>{
    clearInterval(this.timerID);
    this.setState({
      isPlaying: false,
      disabledButton: true
    })
    if(this._youTubeRef){
      let actualIndexVideo = await this._youTubeRef.videosIndex();
      alert(JSON.stringify(actualIndexVideo))
      if(actualIndexVideo != 0){
        actualIndexVideo -= 1;
        this.setState(() => {
          return {
            isPlaying: true,
            disabledButton: false,
            showAlert: false,
            actualIndexVideo
          }
        }, ()=>{
          this._youTubeRef.previousVideo()
        })
      } else {
        this.setState({
          isPlaying: true,
          disabledButton: false,
          showAlert: false
        })
      }
    } else {
      this.setState({
        isPlaying: true,
        disabledButton: false
      })
    }
    this.timerID = setInterval(() => {
      this.progressBarHandle()
    }, 1000);
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

  showMessage(ex){
    this.setState({ error: errorMessage })
    Toast.show({
      text: ex.message,
      buttonText: "Okay",
      duration: 3000
    })
  }

  render() {
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
    return (
        <ScrollView
        style={styles.container}
        onLayout={({ nativeEvent: { layout: { width } } }) => {
          if (!this.state.containerMounted) this.setState({ containerMounted: true });
          if (this.state.containerWidth !== width) this.setState({ containerWidth: width });
        }}
      >
        {this.state.containerMounted && ( 
        <YouTube
            ref={component => {
              this._youTubeRef = component;
            }}
            apiKey="AIzaSyBVloZ0l5h_Zp9tJNePMNPzGwz_HcrCI3c"
            videoIds={this.state.videoIds}
            play={this.state.isPlaying}
            loop={this.state.isLooping}
            fullscreen={this.state.fullscreen}
            controls={1}
            style={[
              { height: PixelRatio.roundToNearestPixel(this.state.containerWidth / (16 / 9)) },
              styles.player,
            ]}
            onError={e => this.setState({ error: e.error })}
            onReady={e => {
              this.setState({ isReady: true })
            }}
            onChangeState={e => this.setState({ status: e.state })}
            onChangeQuality={e => this.setState({ quality: e.quality })}
            onChangeFullscreen={e => this.setState({ fullscreen: e.isFullscreen })}
          />
          )}
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={this.state.progressValue}/> 

        <View style={styles.buttonGroup}>
         <Button iconLeft rounded info
            disabled = {this.state.disabledButton}
            style={styles.buttonVideo}
            onPress={this.executeBackButton}
         >
            <Icon name='arrow-back' />
            <Text>Back</Text>
         </Button>
          <Button iconRight rounded info
            disabled = {this.state.disabledButton}
            style={styles.buttonVideo}
            onPress={this.nextButtonHandle}
            >
            <Text>Next</Text>
            <Icon name='arrow-forward'/>
          </Button>
        </View>
        <Text style={styles.instructions}>
          {this.state.error ? 'Error: ' + this.state.error : ''}
        </Text>
        {this.state.showQuestion && (
                <FadeIn style={{marginHorizontal:15, marginBottom: 10}}>
                  <Text style={{fontSize:20, fontWeight:'bold', textAlign:'center'}}>{this.state.question}</Text>
                  {radioListView}
                  <TouchableOpacity style={styles.buttonContainer} onPress = {()=>{
                    /*Si es correcto envia saldo a la api */
                    let result = false;
                    const answers =  this.state.answers
                    for (let index = 0; index < answers.length; index ++){
                      const item = answers[index];
                      if(item.selected){
                        console.log(item)
                        result = item.correct;
                        break;
                      }
                    }                   
                    this.setState(()=>{return{
                      isPlaying: true,
                      showQuestion: false,
                      disabledButton: false,
                      showResult: true,
                      result
                    }}, () => this.resutViewHandle = setTimeout(()=>this.setState({showResult:false}),3000))

                  }}>
                    <Text style={styles.textButton}>Send</Text>
                  </TouchableOpacity>
                </FadeIn>
        )}
        {this.state.showResult && (
        <FadeIn style={{alignSelf:'center'}}>   
          {this.state.result ?(
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'space-between'
  },
  buttonVideo: {
    margin: 3,
    alignSelf: 'center'
  },
  buttonTextSmall: {
    fontSize: 15,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  player: {
    alignSelf: 'stretch',
    marginVertical: 10,
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