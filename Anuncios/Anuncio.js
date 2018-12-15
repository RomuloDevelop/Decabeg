
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
import {Button, Text, Icon} from 'native-base'
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';

export default class Anuncio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videoIds: this.props.navigation.getParam('videos', ['ncw4ISEU5ik']),
      indexVideo: this.props.navigation.getParam('index', 0),
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
      progressValue: 0
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
            this.setState({
              progressValue: currentTime/duration
            });
          }//new Intl.NumberFormat(false,{maximumFractionDigits: 2, seGrouping: false}).format(currentTime/duration);
        }
      }
    } catch(ex) {
      showMessage(ex)
    }
  }

  showMessage(ex){
    Toast.show({
      text: ex.message,
      buttonText: "Okay",
      duration: 3000
    })
  }

  render() {
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
            // You must have an API Key for the player to load in Android
            apiKey="AIzaSyBVloZ0l5h_Zp9tJNePMNPzGwz_HcrCI3c"
            // Un-comment one of videoId / videoIds / playlist.
            // You can also edit these props while Hot-Loading in development mode to see how
            // it affects the loaded native module
            videoIds={this.state.videoIds}
            // playlistId="PLF797E961509B4EB5"
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
            onPress={() => this._youTubeRef && this._youTubeRef.nextVideo()}
            >
            <Text>Next</Text>
            <Icon name='arrow-forward'/>
          </Button>
        </View>
        <Text style={styles.instructions}>
          {this.state.error ? 'Error: ' + this.state.error : ''}
          </Text>
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