import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/profiles';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

class Login extends Component {
    onSubmit(event) {
	event.preventDefault();
	const credentials = {
	    username: ReactDOM.findDOMNode(this.refs.username).value,
	};
	console.log("Credentials " + JSON.stringify(credentials));

	const { path } = this.props.route;
        this.props.login(credentials);
    }

    render () {
	const { path } = this.props.route;
	return (
	    <form onSubmit={this.onSubmit.bind(this)}>
		{this.props.errorMessage?
		<fieldset className="form-group">
		    <div className="alert alert-danger">
			{this.props.errorMessage}
		    </div>
		</fieldset>
		:null}

		<fieldset className="form-group">
			<h1> Login </h1>
		</fieldset>

		<fieldset className="form-group">
		    <label>Username:</label>
		    <input ref="username" className="form-control" />
		</fieldset>

		<br/>

		<fieldset className="form-group">
			<Link to="/login">Have an account? Login here.</Link>
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

