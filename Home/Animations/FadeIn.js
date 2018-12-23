import React from 'react';
import { Animated } from 'react-native';
const duration = 700;
class FadeIn extends React.Component {
    state = {
      fadeAnim: new Animated.Value(0),
    }

    /*componentWillUnmount() {
        Animated.timing(                  
          this.state.fadeAnim,            
          {
            toValue: 0,                   
            duration: duration,              
          }
        ).start();
    }*/
  
    componentDidMount() {
      Animated.timing(                  
        this.state.fadeAnim,            
        {
          toValue: 1,                   
          duration: duration,              
        }
      ).start();                        
    }
  
    render() {
      let { fadeAnim } = this.state;
  
      return (
        <Animated.View                 
          style={{
            ...this.props.style,
            opacity: fadeAnim,         
          }}
        >
          {this.props.children}
        </Animated.View>
      );
    }
  }
  export default FadeIn