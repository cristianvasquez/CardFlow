import React, {Component} from 'react';
import {connect} from 'react-redux';
/* Vendor Components */
import {Modal} from 'react-bootstrap';
/* Actions */
import {setShowModal} from '../actions/preferences.actions';

class ModalFree extends Component {
    render() {
	return (
	    <Modal className="desktop"
		   show={this.props.showModal =="desktop" ? true : false}
		   onHide={()=>this.props.setShowModal(false)}>
		<Modal.Header closeButton>
		    <h1>Download cardflow Desktop</h1>
		</Modal.Header>
		<div className="panel-modal">
		    <p>Desktop version of cardflow is now available for
			all the platforms! <br/>
			Awesome, right? =) </p>
		</div>
	    </Modal>
	);
    }
}


function mapStateToProps(state) {
    return {
	showModal: state.preferences.showModal
    };
}

export default connect(mapStateToProps, { setShowModal })(ModalFree);

