import React, {Component} from 'react';
import {Modal} from 'react-native';
import CloseModalButton from '../sharedComponents/CloseModalButton';

function withModal(WrappedComponent) {
  // ...and returns another component...
  return class extends Component {
        constructor(props){
            super(props);
            this.Open = this.Open.bind(this);
            this.Close = this.Close.bind(this);
            this.state = {
                show:false
            }
        }

        Open() {
            this.setState({show:true});
        }

        Close() {this.setState({show:false});}
        
        render() {
            let Component; 
            if(!this.props.hasCloseButton){
                Component= (props) => (
                    <Modal
                        transparent={true}
                        animationType={'fade'}
                        visible={props.show}>
                        <WrappedComponent onClose={props.onClose?props.onClose:this.Close} {...props} />
                    </Modal>
                );

            } else {
                Component= (props) => (
                    <Modal
                        animationType={'slide'}
                        visible={props.show}>
                        <CloseModalButton onClose={props.onClose?props.onClose:this.Close}/>
                        <WrappedComponent {...props}/>
                    </Modal>
                );
            }
            return (
                <Component show={this.state.show} {...this.props} />
            );
        }
    }
}

export default withModal;