// @flow
import React, { Fragment } from 'react';
import { Button, List, Label, Segment, Grid } from 'semantic-ui-react';
import { connect, type Dispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Header from '../../Header';
import Clock from './Clock';
import ListItem from './ListItem';
import './style.css';

export type ActionButtonPropType = {
  to: string,
  messageID: string,
};

const ActionButton = (props: ActionButtonPropType) => (
  <Grid.Column mobile={8} tablet={4} computer={4}>
    <Link to={props.to}>
      <Button color="green" fluid>
        <FormattedMessage id={props.messageID} />
      </Button>
    </Link>
  </Grid.Column>
);

const weekHours = 168;

export type ProfilePropType = {
  dispatch: Dispatch,
  timeRemaining: number,
  moneyLeft: number,
  playerName: string,
  dateTime: number,
};

function Profile(props: ProfilePropType) {
  const { timeRemaining, moneyLeft, playerName, dateTime } = props;

  return (
    <Fragment>
      <Header />
      <section className="ui container">
        <h1>
          <FormattedMessage id="profile.header" values={{ name: playerName }} />
        </h1>
        <Clock />
        <Grid>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <Segment raised>
              <Label color="green" ribbon>
                <FormattedMessage id="profile.label" />
              </Label>
              <List>
                <ListItem iconName="star">
                  <FormattedMessage id="profile.points" /> {weekHours - dateTime}
                </ListItem>
                <ListItem iconName="clock">
                  <FormattedMessage
                    id="profile.time"
                    values={{ seconds: timeRemaining < 0 ? 0 : timeRemaining }}
                  />
                </ListItem>
                <ListItem iconName="money">
                  <FormattedMessage id="profile.money" values={{ money: moneyLeft }} />
                </ListItem>
              </List>
            </Segment>
          </Grid.Column>
        </Grid>
        <Grid className="actions">
          <ActionButton to="/get-money" messageID="profile.earn_money" />
          <ActionButton to="/rules" messageID="profile.rules" />
          <ActionButton to="/city" messageID="profile.find" />
        </Grid>
      </section>
    </Fragment>
  );
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    timeRemaining: state.timer.time,
    moneyLeft: state.player.money,
    playerName: state.player.name,
    dateTime: state.player.dateTime,
  };
};

export default connect(mapStateToProps)(Profile);
