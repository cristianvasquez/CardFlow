import axios from 'axios';
import {browserHistory} from 'react-router';
import {API_URL} from './cards.actions';

export function fetchUser() {

    return function(dispatch) {
	axios.get(`${API_URL}/auth/profile`)
	     .then(response => {
		 /* console.log("profiles.actions:");*/
		 console.log("Fetched user " + JSON.stringify(response.data));
			 dispatch({
				 type: 'AUTH_USER',
				 payload: response.data
			 });
	     });
    }
}

export function login(credentials) {
    return function(dispatch) {
	/* console.log("profiles.actions:");*/
	/* console.log("Sending username and password.");*/
	axios.post(`${API_URL}/auth/selectUser`, credentials)
	     .then(response => {
			 console.log("Fetched user " + JSON.stringify(response.data));
			 dispatch({
				 type: 'AUTH_USER',
				 payload: response.data
			 });
			 console.log("Redirecting to /");
			 browserHistory.push('/trees');
	     })
	     .catch((err) => {
			 if (err) {
				 console.log("profiles.actions:");
				 console.log("Login error " + err);
				 dispatch({
				 type: 'AUTH_ERROR',
				 payload: "Authentication error"
				 });
			 }
	     })

    };
}

export function logout() {
    // delete token and signout
    /* console.log("profiles.actions:");*/
    console.log("Logging out.")
    /* console.log("Removing token from local storage, removing user from state.");*/
    localStorage.removeItem('token');
    localStorage.removeItem('cardsCreated');    
    return {
	type: 'UNAUTH_USER'
    };

    console.log("Redirecting to /.");
    browserHistory.push('/');    
}
