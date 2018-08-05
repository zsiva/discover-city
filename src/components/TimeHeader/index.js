import React, { Fragment } from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { calculateDay } from '../../utils/calculateDay';
import './style.css';

const TimeHeader = props => {
  return (
    <Fragment>
      <h3 className="timeWrapper">
        <Icon name="clock" /> {calculateDay(props.dateTime).time}
      </h3>
      <br />
      <h1 className="text-center">
        <FormattedMessage
          id={props.messageId}
          values={{ city: <FormattedMessage id={`cities.${props.currentCity.name}.name`} /> }}
        />
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
