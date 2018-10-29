import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Image, Container, Segment, Header, Button } from 'semantic-ui-react';
import { toggle } from '../../redux/actions';
// import { Button } from '../../components';
import logo from '../../assets/images/logo.png';

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
        <Container className="main-content">
          <Segment>
            <Container textAlign="center">
              <Header className="page-title"> Welcome to ReactDuxPack! </Header>
              <Image centered src={logo} size="small" />
            </Container>
          </Segment>
          <Segment>
            {buttonToggle.isToggle ? 'TRUE' : 'FALSE'}
            <Button content="click me!" onClick={this._onClick} />
          </Segment>
        </Container>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
