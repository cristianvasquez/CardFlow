import React, {Component} from 'react';
import {connect} from 'react-redux';
/* Vendor */
/* Actions */
import * as cardsActions from '../actions/cards.actions';
import * as treesActions from '../actions/trees.actions';
import {fetchUser, logout} from '../actions/profiles.actions';
import {setShowModal} from '../actions/preferences.actions';
import {ActionCreators} from 'redux-undo';
/* My Components */
/* Modals */
import ModalLogin from './ModalLogin';
/* import ModalTreeSettings from './ModalTreeSettings';*/
import ModalShare from './ModalShare';
import ModalDesktop from './ModalDesktop';
import ModalTreeSettings from './ModalTreeSettings';
/* Menus */
import MenuTree from './MenuTree';
import MenuEdit from './MenuEdit';
import MenuProfile from './MenuProfile';
import MenuAbout from './MenuAbout';

import Search from './Search';
import Stats from './Stats';

var { undo, redo } = ActionCreators;

class Header extends Component {
    render() {
	const atMyTrees = this.props.location.pathname == "/trees";
	const isDesktop = window.__ELECTRON_ENV__ == 'desktop';
	
	return (
	    <div className="header">
		<ModalTreeSettings />
		<ModalLogin />
		<ModalShare />
		<ModalDesktop />

		<div className="main-menu left">
		    <MenuTree location={this.props.location}/>
		    { !atMyTrees ?
		    <MenuEdit  location={this.props.location} />
		    :null}
		    <MenuProfile />
		    <MenuAbout />
		    <Stats />

		    {atMyTrees?
		     <h1>My Trees</h1>
		     :
		     <h1>{this.props.tree.name}</h1>
		    }
	        {!atMyTrees
		 && this.props.user
		 && this.props.user.username == this.props.tree.author
		 && this.props.tree.source == "Online"
		 && this.props.tree.saved ?
		 <span className="autosaved left">
		     [saved]
		 </span>
		 : null
		}
		</div>

		<div className={"stats " + (atMyTrees ? "hidden":"")}>
		    <Search />
		</div>
		{/* <DebuggingPanel/>*/}
		<div className="clearfix"></div>
	    </div>
	);
    }
}


function mapStateToProps(state) {
    return {
	tree: state.tree.present,
	user: state.profiles.user,
	preferences: state.preferences
    };
}

export default connect(mapStateToProps, {...cardsActions, ...treesActions,
					 fetchUser, logout, undo, redo,
					 setShowModal})(Header);
