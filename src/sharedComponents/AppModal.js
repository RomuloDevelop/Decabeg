import React, {Component} from 'react';
import {Modal} from 'react-native';
import CloseModalButton from './CloseModalButton';
class AppModal extends Component {
        constructor(props){
            super(props);
            this.Open = this.Open.bind(this);
            this.Close = this.Close.bind(this);
            this.state = {
                show:false
            }
        }

        Open() {this.setState({show:true});}

        Close() {this.setState({show:false});}

        render(){
            return(
                <Modal
                    animationType={'slide'}
                    visible={this.state.show}
                    onRequestClose={this.props.onWillClose?this.props.onWillClose:()=>console.log('close modal')}>
                    <CloseModalButton onClose={this.props.onClose?this.props.onClose:this.Close}/>
                    {this.props.children}
                </Modal>
            );
        }
    }
export default AppModal;