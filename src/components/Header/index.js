import React, { Component } from 'react';
import { Statistic, Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { stopTimer, startTimer } from '../../actions/timer';

import './style.css';

class Header extends Component {
  componentWillMount() {
    if (this.props.player) {
      this.props.dispatch(stopTimer());
    } else {
      this.props.dispatch(startTimer());
    }
  }

  render() {
    let { timeRemaining, player } = this.props;
    timeRemaining = timeRemaining < 0 ? 0 : timeRemaining;

    return (
      <header className="header">
        {!player ? (
          <div className="ui container">Hello detective</div>
        ) : (
          <Statistic.Group widths="three" color="green" inverted size="small">
            <Statistic>
              <Statistic.Value text>Where is he?</Statistic.Value>
              <Statistic.Label>Check the cards!</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{timeRemaining}</Statistic.Value>
              <Statistic.Label>sec</Statistic.Label>
            </Statistic>
            <Link to="/user">
              <Button icon color="green">
                <Icon name="user" />
                Profile
              </Button>
            </Link>
          </Statistic.Group>
        )}
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
