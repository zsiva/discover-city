//@flow
import React, { Fragment } from 'react';
import { Button, List, Label, Segment, Grid } from 'semantic-ui-react';
import { connect, type Dispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Header from '../../Header';
import './style.css';

export type ProfilePropType = {
  dispatch: Dispatch,
  timeRemaining: number,
  moneyLeft: number,
  playerName: string,
};

function Profile(props: ProfilePropType) {
  let { timeRemaining, moneyLeft, playerName, dateTime } = props;
  timeRemaining = timeRemaining < 0 ? 0 : timeRemaining;

  return (
    <Fragment>
      <Header />
      <section className="ui container">
        <h1>
          <FormattedMessage id="profile.header" values={{ name: playerName }} />
        </h1>
        <Grid>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <Segment raised>
              <Label color="green" ribbon>
                <FormattedMessage id="profile.label" />
              </Label>
              <List>
                <List.Item>
                  <List.Icon name="star" color="green" />
                  <List.Content>
                    <FormattedMessage id="profile.points" /> {168 - dateTime}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon color="green" name="clock" />
                  <List.Content>
                    <FormattedMessage id="profile.time" values={{ seconds: timeRemaining }} />
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon color="green" name="money" />
                  <List.Content>
                    <FormattedMessage id="profile.money" values={{ money: moneyLeft }} /> {}
                  </List.Content>
                </List.Item>
              </List>
            </Segment>
          </Grid.Column>

          <Grid.Column mobile={16} tablet={8} computer={8}>
            <Segment>
              <Label color="green" ribbon>
                <FormattedMessage id="profile.items" />
              </Label>
              <List>
                <List.Item>
                  <List.Content>
                    <FormattedMessage id="profile.no_items" />
                  </List.Content>
                </List.Item>
              </List>
            </Segment>
          </Grid.Column>
        </Grid>

        <Grid className="actions">
          <Grid.Column mobile={8} tablet={4} computer={4}>
            <Link to="/get-money">
              <Button color="green" fluid>
                <FormattedMessage id="profile.earn_money" />
              </Button>
            </Link>
          </Grid.Column>
          <Grid.Column mobile={8} tablet={4} computer={4}>
            <Link to="/rules">
              <Button color="green" fluid>
                <FormattedMessage id="profile.rules" />
              </Button>
            </Link>
          </Grid.Column>
          <Grid.Column mobile={8} tablet={4} computer={4}>
            <Link to="/city-canvas">
              <Button color="green" fluid>
                <FormattedMessage id="profile.find" />
              </Button>
            </Link>
          </Grid.Column>
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
