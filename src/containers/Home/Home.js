import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggle } from '../../redux/actions';

import { Button } from '../../components';

export class Home extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  _onClick = () => {
    const {
      action: { toggle },
      buttonToggle: { isToggle, status },
    } = this.props;

    toggle(isToggle, status);
  };

  render() {
    const { buttonToggle } = this.props;
    return (
      <div>
        HIHI
        {buttonToggle.isToggle ? 'TRUE' : 'FALSE'}
        <Button onClick={this._onClick} />
      </div>
    );
  }
}

// connect to store
const mapStateToProps = state => ({
  buttonToggle: state.toggle,
});

// Acces to dispatch to run
const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ toggle }, dispatch),
});

// connect hooks to higher order component
export default connect(mapStateToProps, mapDispatchToProps)(Home);
