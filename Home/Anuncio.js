
import React, {Component}from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
  Dimensions,
  Platform,
  ProgressBarAndroid
} from 'react-native';
import {Button, Text, Icon, ListItem, Radio, Right, Left, Badge } from 'native-base'
import YouTube from 'react-native-youtube';

export default class Anuncio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videoIds: ['LTvK1REi8t4','w5LYm_zSeFU','ygGb3N_Nko4','UyTqgnKD3sw','h2aRP5LY78o'],
      indexVideo: 0,
      isReady: false,
      status: null,
      quality: null,
      error: null,
      isPlaying: true,
      isLooping: false,
      duration: 0,
      currentTime: 0,
      fullscreen: false,
      containerMounted: false,
      containerWidth: null,
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
    clearInterval(this.timerID);
  }

  componentWillUpdate() {
  }

  componentDidMount(){

      this.timerID = setInterval(() => {
        this.progressBarHandle()
      }, 1000);
  }
  progressBarHandle(){
    try {
      if(this.state.containerMounted && this.state.isReady) {
        if(this._youTubeRef) {
          this._youTubeRef
            .currentTime()
            .then(currentTime => this.setState({currentTime}))
            .catch(errorMessage => this.setState({ error: errorMessage }));
          this._youTubeRef
            .duration()
            .then(duration => this.setState({ duration }))
            .catch(errorMessage => this.setState({ error: errorMessage }));
          if(this.state.duration !== 0) {
            const duration = this.state.duration;
            const currentTime = this.state.currentTime;
            const progressValue= currentTime/duration
            if (progressValue > 0.99) {
              this.setState({
                progressValue,
                showQuestion: true
              });
            } else {
              this.setState({
                progressValue
              });
            }
          }//new Intl.NumberFormat(false,{maximumFractionDigits: 2, seGrouping: false}).format(currentTime/duration);
        }
      }
    } catch(ex) {
      showMessage(ex)
    }
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
              this._youTubeRef.playVideoAt(this.state.indexVideo)
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
            style={styles.button}
            onPress={() => {
              return this._youTubeRef && this._youTubeRef.previousVideo()
            }}
            >
            <Icon name='arrow-back' />
            <Text>Back</Text>
         </Button>
          <Button iconRight rounded info
            style={styles.button}
            onPress={() => {
              return this._youTubeRef && this._youTubeRef.nextVideo()
            }}
            >
            <Text>Next</Text>
            <Icon name='arrow-forward'/>
          </Button>
        </View>
        <Text style={styles.instructions}>
          {this.state.error ? 'Error: ' + this.state.error : ''}
        </Text>
        {this.state.showQuestion && (
                <View style={{marginHorizontal:15, marginBottom: 10}}>
                  <Text style={{fontSize:20, fontWeight:'bold', textAlign:'center'}}>{this.state.question}</Text>
                  {radioListView}
                  {/*<ListItem>
                    <Left>
                      <Text>De anuncios</Text>
                    </Left>
                    <Right>
                      <Radio 
                        selected = {this.state.radioSelected[0]}
                        onPress = {()=>{
                          this.setState({answer: true})
                        }}/>
                    </Right>
                  </ListItem>
                  <ListItem>
                    <Left>
                      <Text>De nada</Text>
                    </Left>
                    <Right>
                      <Radio 
                        selected = {this.state.radioSelected[1]}
                        onPress = {}/>
                    </Right>
                  </ListItem>*/}
                  <Button block onPress = {()=>{
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
                    this.setState({
                      showQuestion: false,
                      showResult: true,
                      result
                    })
                    this.resutViewHandle = setTimeout(()=>this.setState({showResult:false}),3000)


                  }}>
                    <Text>Send</Text>
                  </Button>
                </View>
        )}
        {this.state.showResult && (this.state.result ?(   
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
        </Badge>))}
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
  button: {
    margin: 3,
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'blue',
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
});