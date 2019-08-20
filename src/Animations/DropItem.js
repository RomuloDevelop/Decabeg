import React, {Component} from 'react';
import {View, Text, PanResponder, Animated} from 'react-native';
import {Button, Icon} from 'native-base';
import globalStyles from '../styles';

export default class DropItem extends Component{
    constructor(props){
        super(props);
        this.renderCount = 0;
        this.heightValue = 0;
        this.state = {
            opacity: new Animated.Value(1),
            height:new Animated.Value(this.heightValue),
            pan:new Animated.ValueXY()
        }
    }
    onDrop = (cb)=>{
        Animated.timing(this.state.opacity,{
            toValue:0,
            timing:250
        }).start();
        Animated.timing(this.state.height,{
            toValue:0,
            duration:500
        }).start(cb);
    }



    componentWillMount(){
        this._val = { x:0, y:0 }
        this.state.pan.addListener((value) => this._val = value);
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => gestureState.dx > Math.abs(10),
            onPanResponderTerminationRequest: (evt, gestureState) => false,
            onPanResponderGrant: (evt, gestureState) => {
              this.state.pan.setOffset(this._val);
            },
            onPanResponderMove:Animated.event([
                null,
                {
                    dx:this.state.pan.x,
                    dy:0,
                }
            ]),
            onPanResponderRelease: (e, gesture) => {
                const {x} = this._val;
                let pos = 0;
                if(x>=100 && x<200){
                    pos = 100;
                } else 
                    pos = 0;
                this.state.pan.flattenOffset();
                Animated.spring(this.state.pan, {
                  toValue: { x: pos, y: 0 },
                  friction: 5
                }).start();
            }
        })
        this.state.pan.setValue({x:0, y:0});
    }

    render(){
        const panStyle = {
            transform: this.state.pan.getTranslateTransform()
        }

        let containerStyle = {};
        if(this.heightValue > 0){
            containerStyle = {height:this.state.height, opacity:this.state.opacity}
        }

        return (
            <Animated.View onLayout = {({nativeEvent})=>{
                if(this.renderCount<1){
                    this.heightValue = nativeEvent.layout.height;
                    this.setState({height:new Animated.Value(this.heightValue)});
                    this.renderCount ++;
                }
            }} style={containerStyle}>
                <View style={{backgroundColor:globalStyles.fontGrey, zIndex:-1, position:'absolute',height:'100%', width:'100%'}}>
                    <Button transparent style={{width:100,justifyContent:'flex-start'}} onPress={()=>this.onDrop(this.props.onDrop)}>
                        <Icon type="FontAwesome" name="trash" style={{color:'red'}}/>
                        <Text style={{color:'red'}}>Borrar</Text>
                    </Button>
                </View> 
                <Animated.View {...this.panResponder.panHandlers} 
                style={[panStyle, {backgroundColor:'white'}]}>
                    {this.props.children}
                </Animated.View>
            </Animated.View>
        );
    }
}