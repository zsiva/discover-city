import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import { connect } from "react-redux";
import { startTimer } from "../../actions/timer";

import "./style.css";

class Header extends Component {
  componentWillMount() {
    this.props.dispatch(startTimer());
  }
  render() {
    const { timeRemaining } = this.props;
    let perc = timeRemaining * 100 / 15;
    return (
      <header className="header">
        <div className="container">
          <p className="hidden-xs pull-left">
            <strong>Time:</strong> {timeRemaining} sec
          </p>
          <ProgressBar striped bsStyle="success" now={perc} />
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    timeRemaining: state.timer.time
  };
};

export default connect(mapStateToProps)(Header);
