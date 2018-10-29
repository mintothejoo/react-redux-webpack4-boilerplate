import React, { Component } from 'react';
import CatchError from './Error';
import Root from './router/Root';
import './styles/main/Main.scss';

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
