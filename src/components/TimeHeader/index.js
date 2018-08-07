import React, { Fragment } from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { calculateDay } from '../../utils/calculateDay';
import './style.css';

const TimeHeader = props => {
  const time = calculateDay(props.dateTime);
  return (
    <Fragment>
      <div className="imageWrapper">
        <img src={`./images/${props.currentCity.flag}`} alt="country flag" />
        <FormattedMessage id={`cities.${props.currentCity.name}.name`} />
      </div>
      <div className="timeWrapper">
        <Icon name="clock" />
        <FormattedMessage id={`week_days.${time.weekDay}`} />, {time.hDisplay}
      </div>
      <br />
      <h1 className="text-center">
        <FormattedMessage id={props.messageId} values={props.messageValues} />
      </h1>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps = {}) => {
  return {
    dateTime: state.player.dateTime,
    currentCity: state.gameState.currentCity,
  };
};

export default connect(mapStateToProps)(TimeHeader);
