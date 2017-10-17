import React, {Component} from 'react';
import {connect} from 'react-redux';

import {browserHistory} from 'react-router';
/* My Components */
/* import Header from './Header';*/
/* Actions */
import * as treesActions from '../actions/trees.actions';
import {setShowModal} from '../actions/preferences.actions';

class MenuAbout extends Component {
    render () {
	const isDesktop = window.__ELECTRON_ENV__ == 'desktop';

	return (
	    <span className="dropdown">
		<a className="btn">About</a>
		<ul className="dropdown-menu">
		    <li key="about">
			<a onClick={()=>{
				this.props.loadTemplate("About");
				browserHistory.push('/about');
			    }}>
			    About cardflow</a>
		    </li>
		    <li key="tutorial">
			<a href="https://fictionhub.io/post/story-writing-process"
			   target="_blank">
			    Tutorial
			</a>
		    </li>
		    <li key="desktop" className={" "+(isDesktop ? "hidden":"")}>
			<a onClick={()=>this.props.setShowModal("desktop")}>
			    cardflow Desktop</a>
		    </li>
		    <li key="support">
			<a onClick={()=>this.props.setShowModal("support")}>
			    Contact Support
			</a>
		    </li>
		    <li key="blog">
			<a href="/blog"
			   target="_blank">
			    Blog
			</a>
		    </li>
		    <li key="subreddit">
			<a href="https://www.reddit.com/r/cardflow"
			   target="_blank">
			    Subreddit
			</a>
		    </li>
		</ul>
	    </span>
	);
    }
}


function mapStateToProps(state) {
    return null;
}

export default connect(null, {...treesActions, setShowModal})(MenuAbout);

