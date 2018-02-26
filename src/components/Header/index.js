import React, { Component } from 'react';
import { Statistic } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { startTimer } from '../../actions/timer';

import './style.css';

class Header extends Component {
  componentWillMount() {
    this.props.dispatch(startTimer());
  }
  render() {
    let { timeRemaining } = this.props;
    timeRemaining = timeRemaining < 0 ? 0 : timeRemaining;

    return (
      <header className="header">
        <Statistic.Group widths="two" color="green" inverted size="small">
          <Statistic>
            <Statistic.Value text>Where is he?</Statistic.Value>
            <Statistic.Label>Check the cards!</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{timeRemaining}</Statistic.Value>
            <Statistic.Label>sec</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </header>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    timeRemaining: state.timer.time,
  };
};

export default connect(mapStateToProps)(Header);
