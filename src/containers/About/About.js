import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class About extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  render() {
    return <div>ABOUT!!!!!!!!!!!</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(About);
