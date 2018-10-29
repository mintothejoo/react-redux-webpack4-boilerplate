import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import store from './redux/store';

import { Home } from 'containers';


class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Fragment>
                        <Route exact path="/" component={Home} />
                    </Fragment>
                </Router>
            </Provider>
        )
    }
}

export default hot(module)(Root);