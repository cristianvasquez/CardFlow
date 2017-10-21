import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/profiles';
import {Link} from 'react-router';

class Login extends Component {
    onSubmit(event) {
	event.preventDefault();
	console.log('Username: ' + ReactDOM.findDOMNode(this.refs.username).value);
	const username = {username: ReactDOM.findDOMNode(this.refs.username).value};
	this.props.createSubscriber(username);

	console.log("Credentials " + JSON.stringify(credentials));
	
	this.props.loginUser({username: username});
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
	return (
	    <form onSubmit={this.handleFormSubmit.bind(this)}>
		<fieldset className="form-group">
		    <h1> Login </h1>
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
		    <Link to="/join">Create new account.</Link>
		    <button action="submit" className="btn btn-primary right">Sign in</button>
		</fieldset>
	    </form>
	);
    }
}


function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps, actions)(Login);

