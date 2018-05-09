import React, { Component } from 'react';

export default class CatchError extends Component {
  state = {
    hasError: false,
    error: null,
  };
  componentDidCatch(error, info) {
    this.setState({ hasError: true, error });
    console.log('hey', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
        </div>
      );
    }
    return this.props.children;
  }
}
