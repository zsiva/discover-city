//@flow
import React from 'react';
import { connect } from 'react-redux';
import './style.css';

export type ClockPropType = {
  timeRemaining: number,
  dateTime: number,
};

function Clock(props: ClockPropType) {
  return (
    <div className="roundClock">
      <div className="hourHand" style={{ transform: `rotate(${30 * props.dateTime}deg)` }} />
      <div className="minuteHand" />
      <div className="center" />
      <ul>
        <li>
          <span>1</span>
        </li>
        <li>
          <span>2</span>
        </li>
        <li>
          <span>3</span>
        </li>
        <li>
          <span>4</span>
        </li>
        <li>
          <span>5</span>
        </li>
        <li>
          <span>6</span>
        </li>
        <li>
          <span>7</span>
        </li>
        <li>
          <span>8</span>
        </li>
        <li>
          <span>9</span>
        </li>
        <li>
          <span>10</span>
        </li>
        <li>
          <span>11</span>
        </li>
        <li>
          <span>12</span>
        </li>
      </ul>
    </div>
  );
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    timeRemaining: state.timer.time,
    dateTime: state.player.dateTime,
  };
};

export default connect(mapStateToProps)(Clock);
