import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {browserHistory, Router} from 'react-router';
import {applyMiddleware, createStore} from 'redux';
import reduxThunk from 'redux-thunk';

import routes from './routes';
import reducers from './reducers';

// Connect reduxThunk to middleware so I could dispatch async actions with axios.
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

// store contains the state
const store = createStoreWithMiddleware(reducers);

function logPageView() {
    window.scrollTo(0, 0);
}

ReactDOM.render(
        <Provider store={store}>
            <Router history={browserHistory} routes={routes} onUpdate={logPageView}/>
        </Provider>
        , document.querySelector('.app')
);

