import React, { Component } from 'react';
import { Progress } from 'semantic-ui-react';
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
    let perc = timeRemaining * 100 / 15;
    return (
      <header className="header">
        <div className="container">
          <p className="hidden-xs pull-left">
            <strong>Time:</strong> {timeRemaining} sec
          </p>
          <Progress percent={perc} color="green" />
        </div>
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
