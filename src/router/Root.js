import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';

import { Home, About } from '../containers';

export default class Root extends Component {
  render() {
    console.log(store);
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
          </div>
        </Router>
      </Provider>
    );
  }
}
