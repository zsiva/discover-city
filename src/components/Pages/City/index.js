import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import Header from '../../Header';

class City extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(event) {
    const { currentCity } = this.props;
  }

  render() {
    const { currentCity } = this.props;

    return (
      <Fragment>
        <Header />
        <section className="ui container" />
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    currentCity: state.gameState.currentCity,
  };
};

export default connect(mapStateToProps)(City);
