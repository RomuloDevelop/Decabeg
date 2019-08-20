import React from 'react';
import { Animated } from 'react-native';
class SlideIn extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      slideInAnim: new Animated.Value(0),
    }
  }
    componentDidMount() {
      Animated.timing(                  
        this.state.slideInAnim,            
        {
          toValue: 100,                   
          duration: (this.props.duration)?this.props.duration:700,              
        }
      ).start();                        
    }
  
    render() {
      let { slideInAnim } = this.state;
  
      return (
        <Animated.View                 
          style={{
            ...this.props.style,
            position:'absolute',
            left: slideInAnim,         
          }}
        >
          {this.props.children}
        </Animated.View>
      );
    }
  }
  export default SlideIn