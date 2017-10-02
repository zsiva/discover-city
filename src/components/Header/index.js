import React, { Component } from 'react';
import Button from '../Button';

import { connect } from 'react-redux'
import { startTimer } from '../../actions/timer';

import './style.css';

class Header extends Component {
  componentWillMount(){
    this.props.dispatch(startTimer());
  }
  render() {
    const {handleClick, timeRemaining} = this.props;
    return (
      <header className="header">
        <div className="container">
          <p>Time: {timeRemaining} seconds</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    timeRemaining: state.timer.time
  }
}

export default connect(
  mapStateToProps,
)(Header)
