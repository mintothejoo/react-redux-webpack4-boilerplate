import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Home } from 'containers';
import store from './redux/store';

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
    );
  }
}

export default Root;
