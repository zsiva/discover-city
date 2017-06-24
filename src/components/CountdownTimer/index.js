import React, { Component } from 'react';

import './style.css';

class CountdownTimer extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = {secondsRemaining : 0}
  }

  componentDidMount() {
    this.setState({ secondsRemaining: this.props.secondsRemaining });
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {
      clearInterval(this.interval);
    }
  }
  render() {
    return (
      <div className="timer">Timer: {this.state.secondsRemaining} seconds</div>
    );
  }
}

export default CountdownTimer;
