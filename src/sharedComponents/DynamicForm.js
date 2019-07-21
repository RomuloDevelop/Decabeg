import React, {useState, useEffect} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';

// function DynamicForm(props){
//     let {compare, resultValue, elseValue} = props;
//     if(!compare) compare = 500;
//     if(!resultValue) resultValue = 400;
//     if(!elseValue) elseValue = 'auto';
//     const [width, setWidth] = useState('auto');
//     const [alignSelf, setAlignSelf] = useState('stretch');
//     const handler=(value)=>{
//             alert(compare);
//             if(value.width>=compare){
//             setAlignSelf('center');
//             setWidth(resultValue);
//         }else{
//             setAlignSelf('stretch');
//             setWidth(elseValue);
//         }
//     }
//     useEffect(()=>{
//             alert('mounted');
//             handler(Dimensions.get('window'));
//         Dimensions.addEventListener('change',(value)=>handler(value.window));
//         return ()=>{
//             alert('dismount');
//             Dimensions.removeEventListener('change',handler);
//         }
//     },[])
//     return (
//         <View style={[styles.formContainer,props.style,{width,alignSelf}]}>
//             {props.children}
//         </View>
//     )
// }

class DynamicForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            width:'auto',
            alignSelf:'stretch'
        }
    }
     handler=(value)=>{
        let {compare, resultValue, elseValue} = this.props;
         if(!compare) compare = 500;
         if(!resultValue) resultValue = 400;
         if(!elseValue) elseValue = 'auto';
        if(value.width>=compare){
            this.setState({alignSelf:'center', width:resultValue});
        }else{
           this.setState({alignSelf:'stretch', width:elseValue});
        }
     }
     listener=(value)=>this.handler(value.window)
     componentDidMount(){
        this.handler(Dimensions.get('window'));
        Dimensions.addEventListener('change',this.listener);
     }

     componentWillUnmount(){
        Dimensions.removeEventListener('change',this.listener);
     }

    render(){
        return (
            <View style={[styles.formContainer,this.props.style,{width:this.state.width,alignSelf:this.state.alignSelf}]}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({   
    formContainer: {
        marginBottom: 10
    }
})

export default DynamicForm;