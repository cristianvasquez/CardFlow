import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions/profiles';
import { Link } from 'react-router';

class Signup extends Component {
    handleFormSubmit({username: username}) {
        console.log(username);
        // signupUser comes from actions.
	// it is an action creator that sends an username/pass to the server
	// and if they're correct, saves the token
	var credentials = {
	    "username": username
	}
	console.log("Credentials " + JSON.stringify(credentials));

	this.props.signupUser({username});
    }

    renderAlert(){
		if (this.props.errorMessage) {
			return (
			<div className="alert alert-danger">
				{this.props.errorMessage}
			</div>
			);
		}
    }

    render () {
	/* props from reduxForm */
	const { handleSubmit, fields: { username: username }} = this.props;
	/* console.log(...username);*/
	console.log(this.props.fields);

	
	return (
	    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
		<fieldset className="form-group">
		    <h1> Create an account </h1>
		</fieldset>
		<fieldset className="form-group">
		    {this.renderAlert()}
		</fieldset>
		<fieldset className="form-group">
		    <label>Username:</label>
		    <input {...username} className="form-control" />
		</fieldset>
		<br/>
		<fieldset className="form-group">
		    <Link to="/login">Have an account? Login here.</Link>
		    <button action="submit" className="btn btn-primary right">Join</button>
		</fieldset>
	    </form>
	);
    }
}

function mapStateToProps(state) {
    return { errorMessage:state.auth.error };
}


export default connect(mapStateToProps, actions)(
    reduxForm({
		form: 'selectUser',
		fields: ['username'],
    })
    (Signup)
);
/* validate: validate */
