import React, { Component } from 'react';
import CatchError from './Error';
import Root from './router/Root';

class App extends Component {
  render() {
    return (
      <CatchError>
        <Root />
      </CatchError>
    );
  }
}

export default App;
