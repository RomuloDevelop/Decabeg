import React from 'react';
import { Animated } from 'react-native';
class FadeIn extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
    }
  }
    componentDidMount() {
      Animated.timing(                  
        this.state.fadeAnim,            
        {
          toValue: 1,                   
          duration: (this.props.duration)?this.props.duration:700,              
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