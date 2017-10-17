import React, {Component} from 'react';
import {connect} from 'react-redux';
/* Actions */
import * as cardsActions from '../actions/cards.actions';

class Name extends Component {
    render () {
	return (
	    <div>
	    </div>
	);
    }
}


function mapStateToProps(state) {
    return {
	tree: state.tree.present,
    	user: state.profiles.user
    };
}

export default connect(mapStateToProps, cardsActions)(Name);

